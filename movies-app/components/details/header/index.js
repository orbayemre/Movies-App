
export default function DetailsHeader({result,cast,review,similar}){

    var posterImg = "https://image.tmdb.org/t/p/original"+ result?.poster_path;
    console.log(cast);
    console.log(review);
    console.log(similar);
    console.log(result);
    return(
        <div className="w-screen h-screen">
            <img src={posterImg}  className="w-thirty h-rb z-0 absolute top-28 left-28 rounded-xl "/>
            <div className=" w-full h-1/2 inline-block z-20 absolute bottom-0 left-0 rounded-xl bg-gradient-to-t from-background to-transparent "/>
        </div>
    )
}
/*
genres
homepage : yayıncıdaki link
first air date /release date
overview
? spoken lang
? tagline
vote average
popularity

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