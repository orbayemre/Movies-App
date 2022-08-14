import Link from 'next/link';
import { useRouter } from "next/router";
import {useEffect} from "react";


export default function NavBar(){
    const router = useRouter();
    useEffect(()=>{
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-50px";
            }
            prevScrollpos = currentScrollPos;
        }

    },[])

    return(
        <div id="navbar" className="fixed duration-700 w-full h-12 z-50 bg-black/40 top-0 flex justify-between items-center text-white ">
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
                    <a className={router.pathname === "/movies" ? "text-xl text-baseColor hover:text-white duration-100"
                        : "text-xl hover:text-baseColor duration-100"}>Movies</a>
                </Link>
                <Link href="/series">
                    <a className={router.pathname === "/series" ? "text-xl text-baseColor hover:text-white duration-100"
                        : "text-xl hover:text-baseColor duration-100"}>Series</a>
                </Link>
                <div className='pl-10 space-x-3 text-sm'>
                    <span className='cursor-pointer hover:text-baseColor duration-100 '>Sign In </span>
                    <span className='bg-baseColor  hover:bg-baseColor duration-100 cursor-pointer rounded-xl text-white px-3 py-1'>Sign Up</span>
                </div>
            </div>
        </div>
    )
}