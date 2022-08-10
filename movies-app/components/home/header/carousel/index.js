import { Swiper, SwiperSlide } from "swiper/react";
import {useEffect,useState} from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import {Navigation } from "swiper";
import Link from "next/link";
export default function Carousel() {

    const [token, setToken] = useState('');

    useEffect(() => {
        if (!token) {
            getToken();
        }
    }, []);


    const getToken = async () => {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const response = await fetch("https://api.themoviedb.org/3/trending/all/week?api_key="+key)
        const data = await response.json();
        let headerMov = data.results.slice(0,5)
        setToken(headerMov);
    };
    const results = [];
    results.push(token[0]);
    results.push(token[1]);
    results.push(token[2]);
    results.push(token[3]);
    results.push(token[4]);

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                pagination={{
                    clickable: false
                }}
                navigation={false}
                modules={[Navigation]}
                className="mySwiper w-full h-full top-50"
            >
                {
                    results.map(item => {
                            const movie = item;
                            let backgroundImg ="https://image.tmdb.org/t/p/original"+ movie?.backdrop_path.toString();
                            let posterImg ="https://image.tmdb.org/t/p/original"+ movie?.poster_path.toString();
                            let link = movie?.media_type === "movie" ? "/movies/details/"+movie?.id :"/series/details/"+movie?.id;
                            return (
                                <SwiperSlide  >
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
                                            <Link href={link}>
                                                <a className="cursor-pointer text-white mx-5 px-4 mt-10 py-1 flex items-center space-x-3 rounded-3xl bg-red-600 w-60">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className=" text-white text-lg">Watch Trailer</span>
                                                </a>
                                            </Link>
                                    </div>
                                    <div className="z-20 absolute top-32 right-56 ">
                                        <img className="poster" src={posterImg}></img>
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
