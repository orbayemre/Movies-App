import Head from "next/head"
import Content from "./content";
import NavBar from "../shared/navBar";

export default function MoviesComp(){
    return(
        <div >
            <Head>
                <title>Movies App - Movies</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Rubik+Distressed&family=Signika:wght@400;500&family=Teko&display=swap" rel="stylesheet"/>
            </Head>
            <Content/>
            <NavBar/>
        </div>
    )
}