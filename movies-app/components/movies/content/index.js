import {useState,useEffect} from "react";
import Results from "../../shared/results";

export default function Content(){

    const [data, setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;

            const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopMovie =  await fetch(responsePopMovieUrl);
            const dataPopMovie = await responsePopMovie.json();
            let popMovie = dataPopMovie.results.slice(0,20);


            const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedMovie =  await fetch(responseRatedMovieUrl);
            const dataRatedMovie = await responseRatedMovie.json();
            let ratedMovie = dataRatedMovie.results.slice(0,20);

            const data = [...popMovie,...ratedMovie];
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
            <Results results ={results} />
        </div>
    )


}