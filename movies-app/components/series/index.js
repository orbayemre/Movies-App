import Head from "next/head"
import Content from "./content";
import NavBar from "../shared/navBar";
import GoToTop from "../shared/goToTop";
import {Provider} from "react-redux";
import store from "../../stores";

export default function SeriesComp({data}){
    return(
        <div >
            <Head>
                <title>Movies App - Series</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GoToTop origin={"/series"}/>
            <Content data={data}/>
            <Provider store={store}>
                <NavBar/>
            </Provider>
        </div>
    )
}