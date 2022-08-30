export default function SignUpForm(){

    return(
        <div className="w-1/3 h-auto rounded-lg shadowType4 z-10" >
            <form action={"/"} className="disableSelect flex flex-col space-y-3 my-5 items-center justify-center">

                <div className="w-1/2 flex space-x-4 items-center justify-center duration-200 cursor-pointer text-background bg-baseColor border border-baseColor rounded p-2
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
                            <input type="text" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="First Name"/>
                            <input type="text" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Last Name"/>
                        </div>
                        <span></span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex w-full justify-start ml-20 space-x-16 items-center text-sm text-background  font-bold">
                            <input type="text" className="outline-none bg-gray-300 rounded w-1/2 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="E-mail"/>
                        </div>
                        <span></span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col w-full ml-20 space-y-3 text-sm text-background  font-bold">
                            <input type="password" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Password"/>
                            <input type="password" className="outline-none bg-gray-300 rounded w-40 py-1 pl-2 font-Signika duration-200 shadowType1
                        focus:outline-offset-1 focus:outline-baseColor placeholder:text-background/70 text-sm "
                                   placeholder="Confirm Password"/>
                        </div>
                        <span></span>
                    </div>
                    <div className="w-full flex space-x-1 items-center justify-start  ml-20">
                        <input type="checkbox" name="rememberMe" id="rememberMe" className="accent-baseColor"/>
                        <label htmlFor="rememberMe" className="text-sm text-baseColor font-Signika font-bold">Remember me</label>
                    </div>
                </div>
                <div className="flex w-1/3 py-1 rounded justify-center items-center border border-baseColor bg-baseColor text-background font-Signika font-bold text-lg duration-200
                hover:bg-transparent hover:text-baseColor cursor-pointer">
                    <input type="submit" value={"Sign Up"}/>
                </div>
            </form>
        </div>
    )
}