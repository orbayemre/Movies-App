import LottieAnimation from "../../shared/lottieAnimation";
import SignUpForm from "./signInForm";
import {Provider} from "react-redux";
import store from "../../../stores";
import NavBar from "../../shared/navBar";

export default function SignInComp(){
    return(
        <div className="flex absolute w-full h-full justify-start items-center flex-col">
            <LottieAnimation link={"https://assets5.lottiefiles.com/private_files/lf30_ul3enyal.json"}
                             width={"200px"} height={"200px"}/>
            <SignUpForm/>
            <div className="flex absolute w-full h-full items-center justify-start ml-40 ">
                <LottieAnimation link={"https://assets4.lottiefiles.com/private_files/lf30_bb9bkg1h.json"}
                                 width={"300px"} height={"300px"}/>
            </div>
            <div className="flex absolute w-full h-full items-center justify-end mr-40">
                <LottieAnimation link={"https://assets5.lottiefiles.com/packages/lf20_qm8eqzse.json"}
                                 width={"300px"} height={"300px"}/>
            </div>
            <Provider store={store}>
                <NavBar />
            </Provider>
        </div>
    )
}