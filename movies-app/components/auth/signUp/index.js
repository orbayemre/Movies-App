import SignUpForm from "./signUpForm";
import LottieAnimation from "../../shared/lottieAnimation";
import NavBar from "../../shared/navBar";
import {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Head from "next/head";
import useWindowSize from "../../shared/useWindowSize";

export default function SignUpComp(){

    const router = useRouter();
    const size = useWindowSize();
    const {user} = useSelector(state => state.auth);
    if(user){
        router.push("/",);
    }else{
        return(
            <>

                <Head>
                    <title>Movies App - Sign Up</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="flex absolute w-full h-full justify-start items-center flex-col">
                    <LottieAnimation link={"https://assets5.lottiefiles.com/private_files/lf30_ul3enyal.json"}
                                         width={"200px"} height={"200px"}/>
                    <SignUpForm/>
                    { size.width>1000 &&
                        <div className="flex absolute w-full h-full items-center justify-start ml-40 ">
                            <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_bb9bkg1h.json"}
                                         width={"300px"} height={"300px"}/>
                        </div>

                    }
                    { size.width>1000 &&
                        <div className="flex absolute w-full h-full items-center justify-end mr-40 ">
                            <LottieAnimation link={"https://assets5.lottiefiles.com/packages/lf20_qm8eqzse.json"}
                                             width={"300px"} height={"300px"}/>
                        </div>

                    }
                    <NavBar />
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{duration: 5000,}}
                    />
                </div>
            </>
        )
    }
}