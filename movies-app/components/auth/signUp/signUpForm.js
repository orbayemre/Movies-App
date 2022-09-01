import {useRef, useState} from "react";
import {signInWithGoogle, signUp, updProfile} from "../../../firebase";
import toast from 'react-hot-toast';
import {useRouter} from "next/router";
import Link from "next/link";

export default function SignUpForm(){

    const router = useRouter();
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [rememberMe,setRememberMe] = useState("");

    const emailErrRef = useRef();
    const passwordErrRef = useRef();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmit = async ()=>{
        if(!email){toast.error("E-mail is required. Please type a valid e-mail address!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else if(!(password === confirmPassword)){toast.error("Password do not match. Please type again!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else if(!validateEmail(email)){toast.error("You typed a invalid e-mail address. Please type a valid e-mail!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else signUp(email,password,rememberMe);

        if(firstName && lastName) updProfile(firstName+" "+lastName);

        router.push("/");
    }
    const handleSignInGoogle = async ()=>{
        await signInWithGoogle();
        router.push("/");

    }

    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
            handleSubmit();
        }
    }
    return(
        <div className="w-1/3 h-auto rounded-lg shadowType4 z-10" >
            <div className="disableSelect flex flex-col space-y-3 my-5 items-center justify-center">

                <div  onClick={handleSignInGoogle} className="w-1/2 flex space-x-4 items-center justify-center duration-200 cursor-pointer text-background bg-baseColor border border-baseColor rounded p-2
                hover:bg-transparent hover:text-baseColor">
                    <img className="w-6 h-6" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"}/>
                    <span className="text-lg font-bold font-Signika">Sign Up with Google</span>
                </div>

                <div className="w-full flex space-x-4 items-center justify-start ml-32">
                    <hr className="w-1/3 bg-baseColor border-none h-0.5"/>
                    <span className="text-baseColor font-Signika text-sm font-bold">OR</span>
                    <hr className="w-1/3 bg-baseColor border-none h-0.5"/>
                </div>

                <div className="flex flex-col space-y-6  items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex w-full justify-start ml-20 space-x-16 items-center text-sm text-background  font-bold">
                            <input onKeyDown={keyDown13} value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="First Name"/>
                            <input onKeyDown={keyDown13} value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Last Name"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center relative">
                        <div className="flex w-full justify-start ml-10 space-x-16 items-center text-sm text-background  font-bold">
                            <input type="text" onKeyDown={keyDown13} value={email} onChange={(e)=>setEmail(e.target.value)} className="outline-none bg-gray-300 rounded w-1/2 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="E-mail"/>
                        </div>
                        <span ref={emailErrRef} className="text-sm font-Signika font-bold ml-12 text-red-700">
                            {email==="" && "E-mail is required."}
                        </span>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center">
                        <div className="flex flex-col w-full ml-10 space-y-3 text-sm text-background  font-bold">
                            <input  type="password" onKeyDown={keyDown13} value={password} onChange={(e)=>setPassword(e.target.value)} className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Password"/>
                            <input type="password" onKeyDown={keyDown13} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Confirm Password"/>
                        </div>
                        <span ref={passwordErrRef} className="text-sm font-Signika font-bold ml-10 text-red-700">
                            {(password !=="" || confirmPassword !=="") ? (password?.length < 6 ? "Password cannot be less than 6 characters." :
                                (password !== confirmPassword ? "Password do not match" :"" )):""
                            }
                        </span>
                    </div>
                    <div className="w-full flex space-x-1 items-center justify-start  ml-20">
                        <input type="checkbox" name="rememberMe" onChange={(e)=> {e.target.value === "on" ? setRememberMe(true) :setRememberMe(false)}} id="rememberMe" className="accent-baseColor"/>
                        <label htmlFor="rememberMe" className="text-sm text-baseColor font-Signika font-bold">Remember me</label>
                    </div>
                </div>
                <div onClick={handleSubmit}  className="flex w-1/3 py-1 rounded justify-center items-center border border-baseColor bg-baseColor text-background font-Signika font-bold text-lg duration-200
                hover:bg-transparent hover:text-baseColor cursor-pointer">
                    <span>Sign Up</span>
                </div>
                <div className="text-sm font-Signika text-white">
                    Do you already have an account?
                    <Link href={"/signin"}>
                        <a className="font-bold text-baseColor pl-1 underline underline-offset-2">
                              Sign In
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}