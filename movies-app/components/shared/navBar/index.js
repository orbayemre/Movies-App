import {useEffect,useState,useRef} from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import $ from 'jquery';

import {setQuery} from "../../../stores/searchFilter";
import {logIn} from "../../../stores/auth";
import {useDispatch} from "react-redux";
import {currentUser} from "../../../firebase";
import useWindowSize from "../useWindowSize";
import LottieAnimation from "../lottieAnimation";
import NavBarAuth from "./auth";

export default function NavBar(){
    const router = useRouter();
    const navbar = useRef();
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);
    const size = useWindowSize();

    useEffect(()=>{
        if(typeof window !== "undefined"){
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                var goToTop = document.getElementById("gototop");
                if(navbar.current){
                    if (prevScrollpos > currentScrollPos) {
                        navbar.current.style.top = "0";
                        goToTop ? goToTop.style.bottom="10px" :"";
                    } else {
                        navbar.current.style.top = "-50px";
                        goToTop ? goToTop.style.bottom="-50px" :"";
                    }
                }
                prevScrollpos = currentScrollPos;
            }
        }
        dispatch(logIn(currentUser));
    },[])
    useEffect(()=>{
            if(!isOpen){
                $("#menuToggle").animate({top:"-300px"},{duration:100});
            }
            else{
                $("#menuToggle").animate({top:"0px"},{duration:100});
            }


    },[isOpen])
    useEffect(()=>{
        if(size.width>1024) setOpen(true);
    })
    const searchChange = (e)=>{
        dispatch(setQuery(e.target.value));
    }
    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
        }
    }

    return(
        <div ref={navbar} className={"fixed duration-700 w-full h-12 z-50 lg:bg-black/40 top-0 flex justify-between items-center text-white "+
            (isOpen ? " bg-black/80":"bg-black/40")}>
            <span className="disableSelect sm:text-4xl text-2xl ml-10 z-50 text-baseColor font-Teko cursor-pointer flex justify-start items-center space-x-1">
               <LottieAnimation link={"https://assets1.lottiefiles.com/packages/lf20_j1adxtyb.json"}
                                width={"60px"} height={"60px"}/>
                <Link href="/">
                    <a>Movies App</a>
                </Link>
            </span>
            <div className="flex justify-center items-center mr-10">
                <div  id="menuToggle" className="flex duration-1000 opacity-100 font-Signika flex-col lg:flex-row flex-col-reverse lg:relative absolute left-0 top-0 justify-center items-center lg:mr-10 lg:space-x-4
                lg:w-auto w-screen lg:p-0 pt-10 pb-5 lg:bg-transparent bg-black/80">
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-4">
                        <Link href="/">
                            <a className={"lg:text-xl text-2xl my-2 duration-100 "+(router.pathname === "/" ? " text-baseColor hover:text-baseColor/60"
                                : " hover:text-baseColor")}>Home</a>
                        </Link>
                        <Link href="/movies">
                            <a className={"lg:text-xl text-2xl my-2 duration-100 "+(router.pathname === "/movies" ? " text-baseColor hover:text-baseColor/60"
                                : " hover:text-baseColor")}>Movies</a>
                        </Link>
                        <Link href="/series">
                            <a className={"lg:text-xl text-2xl my-2 duration-100 "+(router.pathname === "/series" ? " text-baseColor hover:text-baseColor/60"
                                : " hover:text-baseColor")}>Series</a>
                        </Link>
                    </div>
                    <div id="searchBox" className="bg-background rounded my-2 flex items-center disableSelect justify-between text-baseColor  shadowType1 lg:w-40 w-1/3 duration-200">
                        <form action="/search" method="get" className="w-full">
                            <input id="searchInput" onChange={searchChange} onKeyDown={keyDown13} type="text" name="query" autoComplete="off"
                                   className="w-full bg-background font-bold pl-1 border-0 outline-none  font-Signika text-sm"/>
                        </form>

                        <Link href="/search">
                            <a>
                                <LottieAnimation link={"https://assets8.lottiefiles.com/private_files/lf30_zuwgbw1h.json"}
                                                 width={"30px"} height={"30px"}/>
                            </a>
                        </Link>
                    </div>
                    <NavBarAuth/>
                </div>
                <div className="lg:hidden inline-block dark:text-white">
                    <Hamburger size={30} distance="sm" color={"#FFC23C"}  toggled={isOpen} toggle={setOpen}   rounded/>
                </div>
            </div>
        </div>
    )
}