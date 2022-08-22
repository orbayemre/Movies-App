
export default function Poster({posterUrl,tagline,watchNowLink,watchTrailerLink}){
    console.log(watchNowLink);
    return(
        <>
            <div id="detailPoster" className="w-twentyfive h-rb z-0 absolute top-28 left-20 rounded-xl shadowType2 ">
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
        </>
    )
}