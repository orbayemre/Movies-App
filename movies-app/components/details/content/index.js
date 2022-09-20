import Review from "./review";
import ResultBox from "../../shared/results/resultBox";
import {useEffect, useRef, useState} from "react";
import {addBookmark, deleteBookmark, getBookmarks} from "../../../firebase";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const HeaderContent = ({result,watchNowLink,trailerKey})=>{

    const [bookmark,setBookmark] = useState(false);
    const bookmarkRef = useRef();
    getBookmarks().then(({bookmarks})=>{
        bookmarks?.map(bookmark =>{
            if(result?.id === bookmark){
                console.log("exist");
                setBookmark(true);
            }
        })
    });

    var date = result?.first_air_date || result?.release_date;
    var time="";var streamerLogo;
    if(result?.networks)  streamerLogo="https://image.tmdb.org/t/p/original"+result?.networks[0]?.logo_path;
    if(result?.runtime){time = Math.floor(result?.runtime/60)+" hours "+result?.runtime%60+" minutes"}
    else if(result?.number_of_seasons){ time = result?.number_of_seasons+" seasons"}
    const handleToggleBookmark = async ()=>{
        if(bookmark) await  deleteBookmark(result?.id);
        else await  addBookmark({
            id:result?.id,
            poster:result?.poster_path,
            media: result?.runtime ? "movie" : "tv"
        });
        await  setBookmark(!bookmark);
    }

    useEffect(()=>{
    },[])
    useEffect(()=>{
        bookmark ? bookmarkRef.current.setAttribute("class", "w-14 h-14 fill") : bookmarkRef.current.setAttribute("class", "w-14 h-14")
    })

    return(
        <div className="w-3/5 h-rb flex flex-col absolute top-28 right-24">
            <div className="w-full flex justify-start items-center relative">
                <div className="flex flex-col left-6 w-full">
                    <div className="flex justify-between items-center w-1/2 ,">

                        <h1 className="font-Signika font-bold text-4xl text-baseColor">
                            <a href={watchNowLink}>
                                {result?.name || result?.title}
                            </a>
                        </h1>
                        <a href={watchNowLink}>
                            <img className="h-8 w-auto" src={streamerLogo}/>
                        </a>
                    </div>
                    <div className="font-Signika font-bold  text-sm text-white">
                        <span>{date?.substring(0,4)}</span>
                        <span className="w-1 h-1 rounded-full bg-white inline-block mx-3 bottom-0.5 relative"></span>
                        <div className="inline-block">
                            {result?.genres?.map( (genre,index) => {
                                    if(result?.genres?.length !== index+1) return(<span className="mr-1" key={index}> {genre?.name},</span>)
                                    else return(<span className="mr-1" key={index}> {genre?.name}</span>)
                                }
                            )}
                        </div>
                        <div className="text-sm font-Signika text-white font-bold">
                            {time}
                        </div>
                    </div>

                </div>
                <div className="flex  items-center absolute right-64">
                    { result?.vote_average ?
                        <div className="w-20 h-20 disableSelect relative">
                            <span className="h-20 w-20 z-10 text-background absolute text-sm font-bold font-Signika top-4 left-5">
                                {result?.vote_average.toFixed(1)}
                            </span>
                            <svg className="h-14 w-14 relative left-0.5 -top-0.5  z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFC23C">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div> : ""
                    }
                    <div className="w-20 h-20 disableSelect relative cursor-pointer">
                        <svg ref={bookmarkRef} onClick={handleToggleBookmark} className="w-14 h-14 " xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="#FFC23C">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full h-3/5 relative top-10 text-lg flex justify-between font-Signika font-bold text-baseColor ">
                <span id="detailOverview" className="w-1/2 h-full overflow-auto pr-3">{result?.overview}</span>
                <div className="disableSelect rounded-lg">
                    <iframe id="youtube_player" className="yt_player_iframe rounded-lg relative left-10" width="500" height="300"
                            src={"https://www.youtube-nocookie.com/embed/"+trailerKey+"?enablejsapi=1&origin=*&showinfo=0"}
                            allowscriptaccess="always"
                            allowFullScreen>
                    </iframe>

                </div>
            </div>
        </div>
    )
}

const  Cast =({castData}) =>{
    return(

        <div className="w-3/4 h-65 relative left-1/3 mb-10">

            <h1 className="text-3xl ml-5 text-baseColor font-bold font-Signika">Cast</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={2}
                loop={false}
                modules={[Navigation]}
                className="mySwiper w-full h-full pl"
            >
                {
                    castData?.map((item,index)=>{
                        const imgUrl  = item?.profile_path ? "https://image.tmdb.org/t/p/original"+ item?.profile_path : null;
                        if(imgUrl){
                            return(
                                <SwiperSlide className="w-56 h-60 disableSelect ">
                                    <div key={index} className="w-64  h-70 mx-1 opacity-100 my-3 cursor-context-menu rounded-lg relative shadowType2 cursor-pointer">
                                        <img src={imgUrl} className="w-full h-full rounded-lg"/>
                                        <div className="w-full space-y-0 rounded-b-lg absolute flex flex-col bottom-0 z-10 bg-black/60 pb-1 pl-2 font-Signika ">
                                            <span className="text-sm font-bold text-baseColor leading-3 my-1">{item?.name}</span>
                                            <span className="text-sm font-light text-baseColor/80 leading-3 pl-1">{item?.character}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    })
                }

            </Swiper>

        </div>
    )
}

const Poster = ({posterUrl,tagline,watchNowLink,watchTrailerLink})=>{
    return(
        <div className="relative w-twentyfive h-rb">
            <div id="detailPoster" className="w-full h-full relative z-0 top-28 left-20 rounded-xl shadowType2 ">
                <img src={posterUrl} id="posterImg" className="w-full h-full z-0 rounded-xl"/>
                <div id="middlePoster" className="z-30 text-baseColor opacity-0 w-full h-rb pl-5 text-xl overflow-auto font-Signika">
                    <span>{tagline}</span>
                    <a href={watchNowLink}>
                        <div className="w-56 h-10 font-Signika flex mx-auto relative top-32 cursor-pointer items-center justify-center font-bold text-lg text-baseColor duration-200 rounded-xl bg-transparent border border-baseColor
                        hover:bg-baseColor hover:text-background">
                            Watch Now
                        </div>
                    </a>
                    <a href={watchTrailerLink}>
                        <div className="w-56 h-10 font-Signika flex mx-auto relative top-40 cursor-pointer items-center justify-center font-bold text-lg text-baseColor duration-200 rounded-xl bg-transparent border border-baseColor
                            hover:bg-baseColor hover:text-background">
                            Watch Trailer
                        </div>
                    </a>
                </div>
                <div className=" w-full h-1/3 inline-block z-20 absolute bottom-0 left-0 rounded-xl bg-gradient-to-t from-background/60 to-transparent "/>

            </div>
        </div>
    )
}

const Similar = ({similarData,media})=>{

    var results=[];
    for(let i=0;i<8;i++){
        if(similarData?.results)
            results?.push(similarData?.results[i]);
    }
    return(
        <div className="w-3/4 h-56 flex flex-wrap absolute -right-24 similarBtm">
            <h1 className="text-3xl text-baseColor pl-6 font-bold font-Signika">Similar {media === "movie"? "Movies":"Series" }</h1>
            <div className="flex flex-wrap">
                {results?.map((item)=> <ResultBox result={item} media={media} />)}

            </div>

        </div>
    )
}

export default function DetailsContent({result,review,similar,trailer,cast,media}){

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