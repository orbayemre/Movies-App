import Poster from "./poster";
import HeaderContent from "./headerContent";
import Cast from "./cast";
import Review from "./review";
import Similar from "./similar";

export default function DetailsHeader({result,review,similar,trailer,cast,media}){

    var posterImg = "https://image.tmdb.org/t/p/original"+ result?.poster_path;
    var trailerUrl,trailerKey;
    trailer?.results?.forEach((item)=>{
        if(item?.type === "Trailer"){
            if(item?.site === "YouTube") {
                trailerUrl = "https://www.youtube.com/watch?v="+item?.key;
                trailerKey = item?.key;

            }
            else trailerUrl = "";
        }
        else trailerUrl = "";

    })
    return(
        <>
            <Poster
                posterUrl={posterImg}
                tagline={result?.tagline}
                watchNowLink={result?.homepage}
                watchTrailerLink = {trailerUrl}
            />
            <HeaderContent result={result}
                           watchNowLink={result?.homepage}
                           trailerKey = {trailerKey}
            />
            <Cast castData={cast}/>
            <Review reviewData={review}/>
            <Similar similarData={similar} media={media}/>
        </>
    )
}
/*
genres
first air date /release date
vote average
tagline

homepage : yayıncıdaki link
overview

//only movie
    time

//only tv
    last episode
    sesions num
    networks : yayıncı logo ve isim
    ?seison episode part


cast
review
similar

*/