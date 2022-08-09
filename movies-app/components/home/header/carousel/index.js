import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import {Navigation } from "swiper";

export default function Carousel(props) {
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

                <SwiperSlide>
                        <img className="w-full h-full object-cover" src={"https://image.tmdb.org/t/p/original"}></img>
                </SwiperSlide>

            </Swiper>
        </>
    );
}
