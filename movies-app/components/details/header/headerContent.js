import {useEffect, useRef, useState} from "react";
import {addBookmark, deleteBookmark, getBookmarks} from "../../../firebase";

export default function HeaderContent({result,watchNowLink,trailerKey}){



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
        else await  addBookmark(result?.id);
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