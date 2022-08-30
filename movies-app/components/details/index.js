import Head from "next/head"
import NavBar from "../shared/navBar";
import {Provider} from "react-redux";
import store from "../../stores";
import DetailsHeader from "./header";
import useDetailsFetch from "./useDetailsFetch";

export default function DetailsComp({detailId,media}){

    const {data,similar,review,cast,trailer} = useDetailsFetch(detailId,media);
    return(
        <div>
            <Head>
                <title>Movies App - Details</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DetailsHeader
                result={data}
                cast={cast}
                review={review}
                similar={similar}
                trailer={trailer}
                media={media}
            />
            <Provider store={store}>
                <NavBar/>
            </Provider>
        </div>
    )
}