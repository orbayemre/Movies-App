import {Navigation} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function Cast({castData}){
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