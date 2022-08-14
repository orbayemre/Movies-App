
export default function ResultBox({result}){
    console.log(result);
    const posterLink = "https://image.tmdb.org/t/p/original"+ result?.poster_path.toString();
    let link = result?.media_type === "movie" ? "/movies/details/"+result?.id :"/series/details/"+result?.id;
    return(
        <div className="w-56 h-80 rounded mx-5 my-3 rounded-lg shadowType2 relative">
                    <span className="inline-block text-white font-Signika z-10 w-full pb-1 pl-3 rounded-b-lg bg-black/40 bottom-0 absolute  text-white">
                        {result.title} {result.name}
                    </span>
                    <img src={posterLink} className="w-full h-full rounded-lg absolute z-0"/>
        </div>
    )
}