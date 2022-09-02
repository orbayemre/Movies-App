import Link from "next/link";
import {useSelector} from "react-redux";
export default function NavBarAuth(){

    const {user} = useSelector(state => state.auth) ;
    if(user){
        console.log(user);
    }
    if(user){
        return(
            <div className='pl-10 space-x-3 text-sm'>
                <Link href={"/signin"}>
                    asas
                </Link>
            </div>
        )
    }
    else{
        return(
            <div className='pl-10 space-x-3 text-sm'>
                <Link href={"/signin"}>
                    <a className='cursor-pointer hover:text-baseColor duration-100 '>Sign In </a>
                </Link>
                <Link href={"/signup"}>
                    <a className='bg-baseColor  hover:bg-background hover:text-baseColor duration-200 cursor-pointer rounded-xl text-background px-3 py-1'>Sign Up </a>
                </Link>
            </div>
        )

    }
}