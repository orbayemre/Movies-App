import Head from "next/head"
import {Provider} from "react-redux";
import store from "../stores";
import { useState } from "react";

import NavBar from "./shared/navBar";
import GoToTop from "./shared/goToTop";

import InfiniteScroll from "react-infinite-scroll-component";
import Results from "./shared/results";

const Content = ({ data }) => {
    const [movies, setMovies] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage] = useState(2);

    const getData = async () => {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page="+page;
        const responsePopMovie =  await fetch(responsePopMovieUrl);
        const dataPopMovie = await responsePopMovie.json();
        let popMovie = dataPopMovie.results.slice(0,20);
        const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page="+page;
        const responseRatedMovie =  await fetch(responseRatedMovieUrl);
        const dataRatedMovie = await responseRatedMovie.json();
        let ratedMovie = dataRatedMovie.results.slice(0,20);

        setPage(page+1);
        setMovies((prev) => [...prev, ...popMovie,...ratedMovie]);
    };

    const results = []
    for(var key in movies){
        results.push(movies[key]);
    }

    return (
        <>
            <InfiniteScroll
                dataLength={results.length}
                next={getData}
                hasMore={hasMore}
            >
                <Results results={results} media={"movie"}></Results>
            </InfiniteScroll>
        </>
    );
};

export default function MoviesComp({data}){
    return(
        <div>
            <Head>
                <title>Movies App - Movies</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GoToTop/>
            <Provider store={store}>
                <Content data={data}/>
                <NavBar/>
            </Provider>
        </div>
    )
}