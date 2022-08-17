import Head from "next/head"
import Content from "./content";
import NavBar from "../shared/navBar";
import Link from "next/link";

export default function SeriesComp({data}){
    return(
        <div >
            <Head>
                <title>Movies App - Movies</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Rubik+Distressed&family=Signika:wght@400;500&family=Teko&display=swap" rel="stylesheet"/>
            </Head>
            <Link href={"/series"}>
                <a className="fixed flex justify-center items-center bottom-3 right-10 w-20 h-20 z-50 inline-block bg-background shadowType1 text-baseColor rounded-full scroll-smooth">
                    Go to Top
                </a>
            </Link>
            <Content data={data}/>
            <NavBar/>
        </div>
    )
}