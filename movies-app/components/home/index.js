import Header from "./header";
import Head from "next/head";
import Content from "./content";
import NavBar from "../shared/navBar";

import {Provider} from "react-redux";
import store from "../../stores";

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
                <NavBar/>
            </Provider>
        </div>
    )
}