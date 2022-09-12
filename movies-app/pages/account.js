import AccountComp from "../components/auth/account";
import stores from "../stores";
import {Provider} from "react-redux";
export default function Account(){
    return(

        <Provider store={stores}>
            <AccountComp/>
        </Provider>
    )
}