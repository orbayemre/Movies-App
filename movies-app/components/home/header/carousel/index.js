import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import {Navigation,EffectCoverflow,Autoplay} from "swiper";
import Link from "next/link";
import Trailer from "./trailer";

export default function Carousel({headerMov,ids}) {

    const results = headerMov;
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
                    results.map(movie => {
                            let backgroundImg ="https://image.tmdb.org/t/p/original"+ movie?.backdrop_path.toString();
                            let posterImg ="https://image.tmdb.org/t/p/original"+ movie?.poster_path.toString();
                            let link = movie?.media_type === "movie" ? "/movies/details/"+movie?.id :"/series/details/"+movie?.id;
                            return (
                                <SwiperSlide key={movie.id}  >
                                    <div className="absolute w-full h-full z-10 backdrop-brightness-75" key={movie?.id}></div>
                                    <img className="absolute w-full h-full object-cover " src={backgroundImg}></img>
                                    <div className="z-20 absolute top-40 left-56 backdrop-brightness-75 rounded p-4 w-2/5">
                                        <h1 className="px-5 pt-5 pb-1 text-white text-6xl font-Righteous w-full">
                                           <Link href={link}>
                                            <a>{movie?.title} {movie?.name}</a>
                                           </Link>
                                        </h1>
                                        <span className="inline-block px-5 pt-2 text-white text-lg font-Signika w-full">
                                            {movie?.overview}
                                        </span>
                                        <Trailer movieId={movie?.id} movieMedia={movie?.media_type} ids={ids}/>
                                    </div>
                                    <div className="z-20 absolute top-32 right-56 ">

                                        <Link href={link}>
                                            <a>
                                            <img className="poster" src={posterImg}></img>
                                            </a>
                                        </Link>
                                    </div>
                                    <div id="swiper-forward" className="cursor-pointer text-baseColor absolute right-10 top-1/2 z-20 w-20 h-20 inline-block duration-500 boxRight">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div id="swiper-back" className="rotate-180 cursor-pointer text-baseColor  absolute left-10 top-1/2 z-40 w-20 h-20 inline-block duration-500 boxLeft">
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
