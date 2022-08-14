import {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import ControllerBar from "./contollerBar";
import Results from "./contollerBar/results";

export default function Content(){

    const {query,genre} = useSelector(state => state.homeSearch);
    const [data, setData] = useState([]);
    const [search,setSearch] = useState();

    useEffect(()=>{
        setSearch(query);
    },[query])

    useEffect(()=>{
        if(search !== "")
            getSearchData();
        else{
            getData();
        }
    },[search])

    const getSearchData =async () => {
        try{
            const key = process.env.NEXT_PUBLIC_API_KEY;
            const query = search.toLowerCase();
            const url = "https://api.themoviedb.org/3/search/multi?api_key="+key+"&language=en-US&query="+query+"&page=1&include_adult=false";
            const response =  await fetch(url);
            const data = await response.json();
            setData(data.results);

        }
        catch (err){
            console.log(err);
        }
    };
    const getData = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;

            const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopMovie =  await fetch(responsePopMovieUrl);
            const dataPopMovie = await responsePopMovie.json();
            let popMovie = dataPopMovie.results.slice(0,5);

            const responsePopTvUrl = "https://api.themoviedb.org/3/tv/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopTv =  await fetch(responsePopTvUrl);
            const dataPopTv = await responsePopTv.json();
            let popTv = dataPopTv.results.slice(0,5);

            const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedMovie =  await fetch(responseRatedMovieUrl);
            const dataRatedMovie = await responseRatedMovie.json();
            let ratedMovie = dataRatedMovie.results.slice(0,5);

            const responseRatedTvUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedTv =  await fetch(responseRatedTvUrl);
            const dataRatedTv = await responseRatedTv.json();
            let ratedTv = dataRatedTv.results.slice(0,5);

            const data = [...popMovie,...popTv,...ratedMovie,...ratedTv];
            setData(data);

        }
        catch (err){
            console.log(err);
        }
    };


    const results = []
    for(var key in data){
        results.push(data[key]);
    }

    return(
        <div id="content" className="py-4">
            <ControllerBar/>
            <Results results ={results} />
        </div>
    )


}