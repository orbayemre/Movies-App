import Link from 'next/link';
import { useRouter } from "next/router";
import {useEffect, useRef} from "react";
import {setQuery} from "../../../stores/searchFilter";
import {useDispatch, useSelector} from "react-redux";



export default function NavBar(){
    const router = useRouter();
    const navbar = useRef();
    const searchIcon = useRef();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(typeof window !== "undefined"){
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    navbar.current.style.top = "0";
                } else {
                    navbar.current.style.top = "-50px";
                }
                prevScrollpos = currentScrollPos;
            }

        }

    },[])

    const searchChange = (e)=>{
        dispatch(setQuery(e.target.value));
    }
    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
        }
    }



    return(
        <div ref={navbar} className="fixed duration-700 w-full h-10 z-50 bg-black/40 top-0 flex justify-between items-center text-white ">
            <span className="text-4xl ml-10 text-baseColor font-Teko cursor-pointer">
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
                <div id="searchBox" className="bg-baseColor rounded flex items-center disableSelect justify-start text-background  shadowType1 w-40 duration-200">
                    <form action="/search" method="get">
                        <input id="searchInput" onChange={searchChange} onKeyDown={keyDown13} type="text" name="query" autoComplete="off"
                               className="w-5/6 bg-baseColor font-bold pl-1 border-0 outline-none  font-Signika text-sm"/>
                    </form>

                    <Link href="/search">
                        <a>
                            <svg ref={searchIcon} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </Link>
                </div>

                <div className='pl-10 space-x-3 text-sm'>
                    <span className='cursor-pointer hover:text-baseColor duration-100 '>Sign In </span>
                    <span className='bg-baseColor  hover:bg-background hover:text-baseColor duration-200 cursor-pointer rounded-xl text-background px-3 py-1'>Sign Up</span>
                </div>
            </div>
        </div>
    )
}