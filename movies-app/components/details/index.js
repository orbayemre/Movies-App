import Head from "next/head"
import NavBar from "../shared/navBar";
import {Provider} from "react-redux";
import store from "../../stores";
import DetailsHeader from "./header";
import useDetailsFetch from "./useDetailsFetch";

export default function DetailsComp({detailId,media}){

    const {data,cast,review,similar} = useDetailsFetch(detailId,media);


    return(
        <div>
            <Head>
                <title>Movies App - Details</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Rubik+Distressed&family=Signika:wght@400;500&family=Teko&display=swap" rel="stylesheet"/>
            </Head>
            <DetailsHeader
                result={data}
                cast={cast}
                review={review}
                similar={similar}
            />
            <Provider store={store}>
                <NavBar/>
            </Provider>
        </div>
    )
}