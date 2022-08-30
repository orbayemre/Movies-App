
import {useState,useEffect} from "react";

export default function Trailer(props){
    const [trailer, setTrailer] = useState('');


    useEffect(() => {
        getTrailer();
    }, []);


    const getTrailer = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;
            const response = props.movieMedia === "movie" ? await fetch("https://api.themoviedb.org/3/movie/"+props.movieId+"/videos?api_key="+key+"&language=en-US") :
                await fetch("https://api.themoviedb.org/3/tv/"+props.movieId+"/videos?api_key="+key+"&language=en-US");
            const data = await response.json();
            data?.results?.forEach((item)=>{
                if(item?.type === "Trailer"){
                    if(item?.site === "YouTube") {
                        setTrailer("https://www.youtube.com/watch?v="+item?.key);
                    }
                }
            })
        }
        catch (err){
            console.log(err);
        }
    };

    return(
        <>
            <a href={trailer}  className="cursor-pointer text-black mx-5 px-4 mt-10 py-1 flex items-center space-x-3 rounded-3xl bg-baseColor w-60 border border-baseColor duration-200 hover:text-baseColor hover:bg-baseColor/0" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Watch Trailer</span>
            </a>
        </>
    )
}