import Header from "./header";
import Head from "next/head";

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
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Rubik+Distressed&family=Signika:wght@400;500&family=Teko&display=swap" rel="stylesheet"/>
            </Head>
            <Header headerMov={headerMov} ids={Ids}/>
        </div>
    )
}