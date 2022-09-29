import SignInComp from "../components/auth/signin";
import {Provider} from "react-redux";
import stores from "../stores";

export default function SignIn(){
    return(
        <Provider store={stores}>
            <SignInComp/>
        </Provider>
    )
}