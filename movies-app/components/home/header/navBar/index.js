import Link from 'next/link';
import { useRouter } from "next/router";

export default function NavBar(){
    const router = useRouter();

    return(
        <div className="fixed w-full h-12 z-50 bg-black/60 top-0 flex justify-between items-center text-white ">
            <span className="text-4xl ml-10 text-red-500 font-Teko cursor-pointer">
                <Link href="/">
                    <a>Movies App</a>
                </Link>
            </span>
            <div className='flex justify-center items-center mr-10 space-x-4 font-Signika'>
                <Link href="/">
                    <a className={router.pathname === "/" ? "text-xl text-red-500 hover:text-red-300 duration-100"
                        : "text-xl hover:text-red-500 duration-100"}>Home</a>
                </Link>
                <Link href="/movies/">
                    <a className={router.pathname === "/movies" ? "text-xl text-red-500 hover:text-white duration-100"
                        : "text-xl hover:text-red-500 duration-100"}>Movies</a>
                </Link>
                <Link href="/series">
                    <a className={router.pathname === "/series" ? "text-xl text-red-500 hover:text-white duration-100"
                        : "text-xl hover:text-red-500 duration-100"}>Series</a>
                </Link>
                <div className='pl-10 space-x-3 text-sm'>
                    <span className='cursor-pointer hover:text-red-500 duration-100 '>Sign In </span>
                    <span className='bg-red-600 hover:bg-red-500 duration-100 cursor-pointer rounded-xl text-white px-3 py-1'>Sign Up</span>
                </div>
            </div>
        </div>
    )
}