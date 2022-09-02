import Link from 'next/link';
import { useRouter } from "next/router";
import {useEffect, useRef} from "react";
import {setQuery} from "../../../stores/searchFilter";
import {logIn} from "../../../stores/auth";
import {useDispatch} from "react-redux";
import NavBarAuth from "./auth";
import LottieAnimation from "../lottieAnimation";
import store from "../../../stores";
import {Provider} from "react-redux";
import {currentUser} from "../../../firebase";

export default function NavBar(){
    const router = useRouter();
    const navbar = useRef();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(typeof window !== "undefined"){
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                if(navbar.current){
                    if (prevScrollpos > currentScrollPos) {
                        navbar.current.style.top = "0";
                    } else {
                        navbar.current.style.top = "-50px";
                    }

                }
                prevScrollpos = currentScrollPos;
            }
        }
        dispatch(logIn(currentUser))
    },[])
    const searchChange = (e)=>{
        dispatch(setQuery(e.target.value));
    }
    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
        }
    }

    return(
        <div ref={navbar} className="fixed duration-700 w-full h-12 z-50 bg-black/40 top-0 flex justify-between items-center text-white ">
            <span className="disableSelect text-4xl ml-10 text-baseColor font-Teko cursor-pointer flex justify-start items-center space-x-1">
               <LottieAnimation link={"https://assets1.lottiefiles.com/packages/lf20_j1adxtyb.json"}
                                width={"60px"} height={"60px"}/>
                <Link href="/">
                    <a>Movies App</a>
                </Link>
            </span>
            <div className='flex justify-center items-center mr-10 space-x-4 font-Signika'>
                <Link href="/">
                    <a className={router.pathname === "/" ? "text-xl text-baseColor hover:text-baseColor/60 duration-100"
                        : "text-xl hover:text-baseColor duration-100"}>Home</a>
                </Link>
                <Link href="/movies/">
                    <a className={router.pathname === "/movies" ? "text-xl text-baseColor hover:text-baseColor/60  duration-100"
                        : "text-xl hover:text-baseColor duration-100"}>Movies</a>
                </Link>
                <Link href="/series">
                    <a className={router.pathname === "/series" ? "text-xl text-baseColor hover:text-baseColor/60  duration-100"
                        : "text-xl hover:text-baseColor duration-100"}>Series</a>
                </Link>
                <div id="searchBox" className="bg-background rounded flex items-center disableSelect justify-start text-baseColor  shadowType1 w-40 duration-200">
                    <form action="/search" method="get">
                        <input id="searchInput" onChange={searchChange} onKeyDown={keyDown13} type="text" name="query" autoComplete="off"
                               className="w-5/6 bg-background font-bold pl-1 border-0 outline-none  font-Signika text-sm"/>
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
        </div>
    )
}