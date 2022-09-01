import {useState,useEffect} from "react";

import Results from "./results";

export default function Content(){

    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [popularMoviesData, setPopularMoviesData] = useState([]);
    const [popularTvData, setPopularTvData] = useState([]);
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [topRatedTvData, setTopRatedTvData] = useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;

            const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopMovie =  await fetch(responsePopMovieUrl);
            const dataPopMovie = await responsePopMovie.json();
            let popMovie = dataPopMovie.results.slice(0,15);

            const responsePopTvUrl = "https://api.themoviedb.org/3/tv/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopTv =  await fetch(responsePopTvUrl);
            const dataPopTv = await responsePopTv.json();
            let popTv = dataPopTv.results.slice(0,15);

            const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedMovie =  await fetch(responseRatedMovieUrl);
            const dataRatedMovie = await responseRatedMovie.json();
            let ratedMovie = dataRatedMovie.results.slice(0,15);

            const responseRatedTvUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedTv =  await fetch(responseRatedTvUrl);
            const dataRatedTv = await responseRatedTv.json();
            let ratedTv = dataRatedTv.results.slice(0,15);

            const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key="+key+"&language=en-US&page=1";
            const responseUpcomingMovies =  await fetch(upcomingMoviesUrl);
            const dataUpcomingMovies = await responseUpcomingMovies.json();
            let upcomingMovies = dataUpcomingMovies.results.slice(0,15);

            setPopularMoviesData(popMovie);
            setPopularTvData(popTv);
            setTopRatedMoviesData(ratedMovie);
            setTopRatedTvData(ratedTv);
            setUpcomingMoviesData(upcomingMovies);
        }
        catch (err){
            console.log(err);
        }
    };


    const popularMoviesResults = [];
    const popularTvResults = [];
    const topRatedMoviesResults = [];
    const topRatedTvResults = [];
    const upcomingMoviesResults = [];
    for(var i=0;i<15;i++){
        popularMoviesResults.push(popularMoviesData[i]);
        popularTvResults.push(popularTvData[i]);
        topRatedMoviesResults.push(topRatedMoviesData[i]);
        topRatedTvResults.push(topRatedTvData[i]);
        upcomingMoviesResults.push(upcomingMoviesData[i]);

    }

    return(
        <div id="content" className="py-4 flex flex-col space-y-10 mt-10 pb-10">
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Upcoming Movies</h1>
                <Results results ={upcomingMoviesResults} time={1700} delay={1000} media={"movie"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Popular Movies</h1>
                <Results results ={popularMoviesResults} time={2000} delay={1500} media={"movie"}/>
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Popular Series</h1>
                <Results results ={popularTvResults} time={2000} delay={2000} media={"tv"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Top Rated Movies</h1>
                <Results results ={topRatedMoviesResults} time={3000}  delay={3000} media={"movie"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Top Rated Series</h1>
                <Results results ={topRatedTvResults} time={4000}  delay={4000} media={"tv"} />
            </div>

        </div>
    )


}