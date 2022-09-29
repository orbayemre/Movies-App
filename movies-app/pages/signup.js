import SignUpComp from "../components/auth/signup";
import stores from "../stores";
import {Provider} from "react-redux";

export default function SignUp(){
    return(
        <Provider store={stores}>
        <SignUpComp/>
        </Provider>
    )
}