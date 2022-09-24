import {signIn, signInWithGoogle, signOut} from "../../../firebase";
import {useRouter} from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import {useState} from "react";

export default function SignInForm(){
    const router = useRouter();

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [rememberMe,setRememberMe] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmit = async ()=>{
        if(!email){toast.error("Please type your e-mail address!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        if(!password){toast.error("Please type your password!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else if(!validateEmail(email)){toast.error("You typed a invalid e-mail address. Please type a valid e-mail!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else {
            await signIn(email,password,rememberMe).then(errorMessage =>{
                if(errorMessage) toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
                else router.push("/");
            })
        }
    }
    const handleSignInGoogle = async ()=>{
        await signInWithGoogle().then(errorMessage =>{
            if(errorMessage) toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
            else router.push("/");
        })

    }

    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
            handleSubmit();
        }
    }
    return(
        <div className="xl:w-1/3 lg:w-2/5 sm:w-auto w-full sm:ml-0 ml-6 h-auto rounded-lg sm:shadow sm:shadow-black z-10" >
            <div className="disableSelect flex flex-col space-y-3 my-5 items-center justify-center">

                <div onClick={handleSignInGoogle} className="xl:w-1/2 w-3/4 flex space-x-4 items-center justify-center duration-200 cursor-pointer text-background bg-baseColor border border-baseColor rounded p-2
                hover:bg-transparent hover:text-baseColor">
                    <img className="w-6 h-6" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"}/>
                    <span className="sm:text-lg text-sm font-bold font-Signika">Sign In with Google</span>
                </div>

                <div className="w-full flex space-x-4 items-center justify-start ml-32">
                    <hr className="lg:w-1/3 sm:w-1/4 w-1/5  bg-baseColor border-none h-0.5"/>
                    <span className="text-baseColor font-Signika text-sm font-bold">OR</span>
                    <hr className="sm:w-1/3 w-1/4  bg-baseColor border-none h-0.5"/>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="flex w-full justify-start ml-32 space-x-16 items-center text-sm text-background  font-bold">
                        <input type="text" onKeyDown={keyDown13} value={email} onChange={(e)=>setEmail(e.target.value)} className="outline-none bg-gray-300 rounded w-1/2 py-1 pl-2 font-Signika duration-200 shadowType1
                    focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                               placeholder="E-mail"/>
                    </div>
                    <span></span>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col w-full ml-32 space-y-3 text-sm text-background  font-bold">
                        <input type="password" onKeyDown={keyDown13} value={password} onChange={(e)=>setPassword(e.target.value)} className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                    focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                               placeholder="Password"/>
                    </div>
                    <span></span>
                </div>
                <div className="w-full flex space-x-1 items-center justify-start  ml-32">
                    <input type="checkbox" name="rememberMe" onChange={(e)=> {e.target.value === "on" ? setRememberMe(true) :setRememberMe(false)}} id="rememberMe" className="accent-baseColor"/>
                    <label htmlFor="rememberMe"  className="text-sm text-baseColor font-Signika font-bold">Remember me</label>
                </div>
                <div onClick={handleSubmit}  className="flex w-1/3 py-1 rounded justify-center items-center border border-baseColor bg-baseColor text-background font-Signika font-bold text-lg duration-200
                hover:bg-transparent hover:text-baseColor cursor-pointer">
                    <span>Sign In</span>
                </div>
                <div className="text-sm font-Signika text-white">
                    If you don't have an account yet.
                    <Link href={"/signup"}>
                        <a className="font-bold text-baseColor pl-1 underline underline-offset-2">
                            Sign Up
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}