import Head from "next/head";
import NavBar from "../shared/navBar";

import {Provider} from "react-redux";
import store from "../../stores";
import Content from "./content";
import Header from "./header";
import Footer from "../shared/footer";

export default function HomeComp({headerMov}){
    const Ids= [];
    headerMov.map((movie)=>{
        Ids.push(movie.id)
    })
    return(

        <div >
            <Head>
                <title>Movies App - Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header headerMov={headerMov} ids={Ids}/>

            <Provider store={store}>
                <Content/>
            </Provider>
            <Provider store={store}>
                <NavBar/>
            </Provider>
            <Footer/>
        </div>
    )
}