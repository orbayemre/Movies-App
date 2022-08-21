import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {Autoplay, Navigation} from "swiper";
import Link from "next/link";

export default  function Results({results,time,delay,media}){
    return(
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                speed={time}
                autoplay={{
                    delay: delay,
                    disableOnInteraction: true,
                    pauseOnMouseEnter:false,
                }}
                loop={true}
                modules={[Navigation,Autoplay]}
                className="mySwiper w-full h-full top-50"
            >
                {
                    results.map(result => {

                            const posterLink = "https://image.tmdb.org/t/p/original"+ result?.poster_path.toString();
                            let link = media === "movie" ? "/movies/details/"+result?.id :"/series/details/"+result?.id;
                            var date;
                            date = result?.first_air_date || result?.release_date;
                            return (
                                <SwiperSlide key={result?.id} className="h-80">
                                    <Link href={link}>
                                        <a>
                                            <div id="resultBox" className="w-56 h-80 rounded mx-5 my-3 rounded-lg shadowType2 relative cursor-pointer relative ">
                                                <div id="title" className=" opacity-0 duration-200 flex flex-col rounded-lg -space-y-1 text-baseColor  font-Signika z-10 w-full pb-0 pl-3 rounded-b-lg  bottom-0 absolute  text-white">
                                                    <span className="font-bold">{result?.title} {result?.name}</span>
                                                    <span className="text-sm text-baseColor/70" >{date?.substring(0,4)}</span>
                                                </div>
                                                <span className="absolute right-2 top-2 z-10 w-14 bg-black/40 pl-1 rounded-lg flex items-center justify-start text-baseColor font-Signika font-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="pl-1">
                                                        {result?.vote_average.toFixed(1)}
                                                    </span>
                                                </span>
                                                <img src={posterLink} id="resultImg" className="w-full h-full rounded-lg absolute z-0"/>
                                                <div id="middle" className="z-30 text-baseColor w-full h-rb px-2 -pt-5 pb-8 text-sm overflow-auto font-Signika absolute">
                                                    <span>
                                                        {result?.overview}
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            )
                        }
                    )
                }
            </Swiper>
    )
}