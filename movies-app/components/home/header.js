import {useEffect, useState} from "react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation,EffectCoverflow,Autoplay} from "swiper";

const Trailer = (props)=>{
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
            <a href={trailer}  className="cursor-pointer text-black mx-5 px-4 mt-10 py-1 flex items-center space-x-3 rounded-3xl bg-baseColor
             w-60 xl:w-60 md:w-52 border border-baseColor duration-200 hover:text-baseColor hover:bg-baseColor/0" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-Signika text-lg xl:text-lg md:text-sm">Watch Trailer</span>
            </a>
        </>
    )
}

const Carousel = ({headerMov,ids}) => {

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                effect='coverflow'
                speed={1000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter:false,
                }}
                loop={true}
                navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
                modules={[Navigation,EffectCoverflow,Autoplay]}
                className="mySwiper w-full h-full top-50"
            >
                {
                    headerMov?.map(movie => {
                            let backgroundImg ="https://image.tmdb.org/t/p/original"+ movie?.backdrop_path.toString();
                            let posterImg ="https://image.tmdb.org/t/p/original"+ movie?.poster_path.toString();
                            let link = movie?.media_type === "movie" ? "/movies/details?id="+movie?.id :"/series/details?id="+movie?.id;
                            return (
                                <SwiperSlide key={movie.id}  >
                                    <div className="absolute w-full h-full z-10 backdrop-brightness-75" key={movie?.id}></div>
                                    <img className="absolute w-full h-full object-cover " src={backgroundImg}></img>
                                    <div className="z-20 absolute top-40 ml-10 xl:left-56 lg:left-32 md:left-24 backdrop-brightness-75 rounded p-4 md:w-2/5 w-4/5 ">
                                        <h1 className="px-5 pt-5 pb-1 text-white text-xl xl:text-5xl md:text-4xl sm:text-2xl font-Righteous w-full">
                                            <Link href={link}>
                                                <a>{movie?.title} {movie?.name}</a>
                                            </Link>
                                        </h1>
                                        <span className="inline-block px-5 pt-2 text-white text-sm xl:text-lg sm:text-sm font-Signika w-full">
                                            {movie?.overview}
                                        </span>
                                        <Trailer movieId={movie?.id} movieMedia={movie?.media_type} ids={ids}/>
                                    </div>
                                    <div className="z-20 absolute top-32 lg:top-32 md:top-48 right-56 xl:right-56 lg:right-44 md:right-32 ">
                                        <Link href={link}>
                                            <a>
                                                <img className="poster hover:opacity-90 duration-200" src={posterImg}></img>
                                            </a>
                                        </Link>
                                    </div>
                                    <div id="swiper-forward" className="md:inline-block hidden cursor-pointer text-baseColor absolute right-10 top-1/2 z-20 w-20 h-20 inline-block duration-500 boxRight">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div id="swiper-back" className=" md:inline-block hidden rotate-180 cursor-pointer text-baseColor  absolute left-10 top-1/2 z-40 w-20 h-20 inline-block duration-500 boxLeft">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 relative top-10" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    )
                }


            </Swiper>
        </>
    );
}

export default function Header({headerMov,ids}){
    return(
        <div className="w-screen h-screen bg-background relative">
            <Carousel headerMov={headerMov} ids={ids}/>
        </div>
    )
}