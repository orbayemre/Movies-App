import Review from "./review";
import {ResultBox} from "../../shared/results";
import {useEffect, useRef, useState} from "react";
import {addBookmark, deleteBookmark, getBookmarks} from "../../../firebase";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import useWindowSize from "../../shared/useWindowSize";


const HeaderContent = ({result,watchNowLink,trailerKey})=>{

    const [bookmark,setBookmark] = useState(false);
    const bookmarkRef = useRef();
    const size = useWindowSize();

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
        bookmark ? bookmarkRef.current.setAttribute("class", "lg:h-14 lg:w-14 sm:w-8 sm:h-8 h-6 w-6 fill") : bookmarkRef.current.setAttribute("class", "lg:h-14 lg:w-14 sm:w-8 sm:h-8 h-6 w-6")
    })

    return(
        <div className="md:w-3/5 w-4/5 h-rb flex flex-col md:mt-0 mt-5">
            <div className="w-full flex justify-start items-center">
                <div className="flex flex-col w-full">
                    <div className="flex 460:space-x-10 space-x-4 items-center w-full">

                        <h1 className="font-Signika font-bold xl:text-4xl lg:text-2xl md:text-xl 460:text-xl text-sm text-baseColor">
                            <a href={watchNowLink}>
                                {result?.name || result?.title}
                            </a>
                        </h1>
                        <a href={watchNowLink}>
                            <img className="lg:h-8 md:h-6 460:h-10 h-7 w-auto" src={streamerLogo}/>
                        </a>

                        <div className="flex  items-center h-20">
                            <div className="disableSelect cursor-pointer">
                                <svg ref={bookmarkRef} onClick={handleToggleBookmark} className="lg:h-14 lg:w-14 sm:w-8 sm:h-8 460:h-16 460:w-16 w-7 h-7" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="#FFC23C">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="font-Signika font-bold  460:text-sm text-xsm text-white">
                        <span>{date?.substring(0,4)}</span>
                        <span className="w-1 h-1 rounded-full bg-white inline-block mx-3 bottom-0.5 relative"></span>
                        <div className="inline-block">
                            {result?.genres?.map( (genre,index) => {
                                    if(result?.genres?.length !== index+1) return(<span className="mr-1" key={index}> {genre?.name},</span>)
                                    else return(<span className="mr-1" key={index}> {genre?.name}</span>)
                                }
                            )}
                        </div>
                        <div className="flex space-x-5 md:text-sm text-xsm font-Signika text-white font-bold mb-2">
                            { result?.vote_average ?
                                <div className="disableSelect flex items-center">
                                    <svg className="lg:h-6 lg:w-6 md:h-4 md:w-4 460:w-6 460:h-6 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFC23C">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-background lg:text-sm 460:text-sm md:text-xsm text-xsm font-bold text-baseColor font-Signika">
                                        {result?.vote_average.toFixed(1)}
                                    </span>
                                </div> : ""
                            }
                            <span className="lg:text-sm 460:text-sm md:text-xsm text-xsm ">{time}</span>
                        </div>
                    </div>

                </div>
            </div>

                <div className="w-full h-3/5  xl:text-lg text-sm flex justify-between font-Signika font-bold text-baseColor ">
                    <span id="detailOverview" className="xl:w-1/2 w-full h-full overflow-auto pr-3">{result?.overview}</span>
                    {
                        size.width > 1280 &&
                        <div className="disableSelect rounded-lg">
                            <iframe id="youtube_player" className="yt_player_iframe rounded-lg"
                                    src={"https://www.youtube-nocookie.com/embed/"+trailerKey+"?enablejsapi=1&origin=*&showinfo=0"}
                                    allowscriptaccess="always"
                                    allowFullScreen>
                            </iframe>

                        </div>
                    }
                </div>


        </div>
    )
}

const Poster = ({posterUrl,tagline,watchNowLink,watchTrailerLink})=>{
    return(
        <div className="md:w-1/4 w-1/2 md:h-rb">
            <div id="detailPoster" className="scroll w-full h-full relative z-0 rounded-xl shadowType2 ">
                <img src={posterUrl} id="posterImg" className="w-full h-full z-0 rounded-xl"/>
                <div id="middlePoster" className="z-30 text-baseColor opacity-0 w-full h-rb pl-5 overflow-auto font-Signika">
                    <span className="lg:text-xl md:text-sm text-xsm 460:text-xl">{tagline}</span>
                    <a href={watchNowLink}>
                        <div className="xl:w-56 lg:h-10 lg:w-48 lg:h-10 md:h-8 md:w-32 460:w-56 460:h-10 w-24 h-6 font-Signika flex mx-auto relative lg:top-32 md:top-20 460:top-32 top-10 cursor-pointer items-center
                        justify-center font-bold lg:text-lg md:text-sm 460:text-xl text-xsm text-baseColor duration-200 rounded-xl bg-transparent border border-baseColor
                        hover:bg-baseColor hover:text-background">
                            Watch Now
                        </div>
                    </a>
                    <a href={watchTrailerLink}>
                        <div className="xl:w-56 lg:h-10 lg:w-48 lg:h-10 md:h-8 md:w-32 460:w-56 460:h-10 w-24 h-6 font-Signika flex mx-auto relative lg:top-40 md:top-24 460:top-40 top-12 cursor-pointer items-center justify-center
                        font-bold lg:text-lg md:text-sm 460:text-xl text-xsm  text-baseColor duration-200 rounded-xl bg-transparent border border-baseColor
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

const  Cast =({castData}) =>{


    return(

        <div className="w-sb h-auto xl:my-14 my-6  ml-10 flex flex-col items-start justify-center">

            <h1 className="text-3xl ml-5 text-baseColor font-bold font-Signika">Cast</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={2}
                loop={false}
                navigation={{ nextEl: ".next", prevEl: ".prev" }}
                modules={[Navigation]}
                className="mySwiper xl:w-sb w-full h-full pl"
            >
                <div className="prev absolute top-0 left-0 h-full w-8 bg-background/50 hover:bg-background/80 duration-200 cursor-pointer text-baseColor flex items-center justify-center z-50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </div>
                {
                    castData?.map((item,index)=>{
                        const imgUrl  = item?.profile_path ? "https://image.tmdb.org/t/p/original"+ item?.profile_path : null;
                        if(imgUrl){
                            return(
                                <SwiperSlide key={index} className="w-auto h-auto disableSelect ">
                                    <div  className="2xl:w-56 xl:w-48 lg:w-60 h-auto mx-1 opacity-100 my-3 cursor-context-menu rounded-lg relative shadowType2 cursor-pointer">
                                        <img src={imgUrl} className="w-full h-full rounded-lg"/>
                                        <div className="w-full space-y-0 rounded-b-lg absolute flex flex-col bottom-0 z-10 bg-black/60 md:pb-1 pb-0.5 pl-2 font-Signika ">
                                            <span className="md:text-sm text-2xsm font-bold text-baseColor leading-3 md:my-1">{item?.name}</span>
                                            <span className="md:text-sm text-2xsm font-light text-baseColor/80 leading-3 md:pl-1">{item?.character}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    })
                }

                <div className="next absolute top-0 right-0 h-full bg-background/50 hover:bg-background/80 duration-200 cursor-pointer text-baseColor flex items-center justify-center z-50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>

            </Swiper>

        </div>
    )
}

const Similar = ({similarData,media})=>{


    const size = useWindowSize();
    var totalSimilar=8;
    if (size.width >863)  totalSimilar = 8
    else if (size.width <=863 && size.width >767)  totalSimilar = 9
    else if (size.width <=767 && size.width >639)  totalSimilar = 8
    else if (size.width <=639 && size.width >383)  totalSimilar = 9
    else if (size.width <=383 )  totalSimilar = 8
    var results=[];
    for(let i=0;i<totalSimilar;i++){
        if(similarData?.results)
            results?.push(similarData?.results[i]);
    }
    return(
        <div className="2xl:w-3/4  w-full xl:ml-20 ml-8 flex flex-col flex items-start justify-center similarBtm">
            <h1 className="disableSelect text-3xl text-baseColor pl-6 font-bold font-Signika">Similar {media === "movie"? "Movies":"Series" }</h1>
            <div className="900:grid  900:grid-cols-4 900:grid-rows-2 flex flex-wrap">
                {results.map((item,index)=>(
                    <div key={index}>
                        <ResultBox result={item} media={media}/>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default function DetailsContent({result,review,similar,trailer,cast,media}){

    const size = useWindowSize();
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
            <div className="flex xl:flex-row flex-col">
                <div className="flex md:flex-row flex-col items-center justify-center md:space-x-16 mt-20">
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
                </div>
                {
                    size.width < 1280 &&
                    <div className="disableSelect rounded-lg mt-5">
                        <iframe id="youtube_player" className="yt_player_iframe rounded-lg"
                                src={"https://www.youtube-nocookie.com/embed/"+trailerKey+"?enablejsapi=1&origin=*&showinfo=0"}
                                allowscriptaccess="always"
                                allowFullScreen>
                        </iframe>

                    </div>
                }

            </div>
            <div className="w-full relative flex xl:flex-row flex-col  xl:flex-row-reverse  justify-around items-start">
                <div className="xl:w-seventy w-full flex flex-col items-start justify-center">
                    <Cast castData={cast}/>
                    <Similar similarData={similar} media={media}/>
                </div>
                <Review reviewData={review}/>
            </div>
        </>
    )
}