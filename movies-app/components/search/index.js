import Head from "next/head"
import Content from "./content";
import NavBar from "../shared/navBar";
import GoToTop from "../shared/goToTop";

import {Provider} from "react-redux";
import store from "../../stores";


export default function SearchComp(){
    return(
        <div>
            <Head>
                <title>Movies App - Search</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GoToTop/>
            <Provider store={store}>
                <Content/>
                <NavBar/>
            </Provider>
        </div>
    )
}