import {useRef} from "react";
import $ from 'jquery';
import {useSwiper} from "swiper/react";
import {useState,useEffect} from "react";

export default function Trailer(props){
    const iframeRef = useRef(null);
    const swiper = useSwiper();

    const [token, setToken] = useState('');


    useEffect(() => {
        if (!token) {
            getToken();
        }
    }, []);


    const getToken = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;
            const response = props.movieMedia === "movie" ? await fetch("https://api.themoviedb.org/3/movie/"+props.movieId+"/videos?api_key="+key+"&language=en-US") :
                await fetch("https://api.themoviedb.org/3/tv/"+props.movieId+"/videos?api_key="+key+"&language=en-US");
            const data = await response.json();
            const result = data.results[data.results.length-1];
            setToken(result);
        }
        catch (err){
            console.log(err);
        }
    };

    const showIframe = ()=>{
        iframeRef.current.style.display= "inline-block";
        swiper.autoplay.stop()
    }
    const hideIframe = ()=>{
        iframeRef.current.style.display= "none";
        swiper.autoplay.start()
        $( document ).ready(function() {
            $('.yt_player_iframe').each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
            });
        });
    }

    const trailerKey = token.key;
    return(
        <>
            <div onClick={()=>showIframe()} className="cursor-pointer text-white mx-5 px-4 mt-10 py-1 flex items-center space-x-3 rounded-3xl bg-baseColor w-60 border border-baseColor duration-200 hover:text-baseColor hover:bg-baseColor/0" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">Watch Trailer</span>
            </div>
            <div ref={iframeRef} className="hidden duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadowType1 rounded-lg ">

                <iframe id="youtube_player" className="yt_player_iframe rounded-lg" width="737" height="415"
                        src={"https://www.youtube-nocookie.com/embed/"+trailerKey+"?enablejsapi=1&origin=http://localhost:3000"}
                        allowscriptaccess="always"
                        allowFullScreen>
                </iframe>

                <span onClick={()=>hideIframe()} className="absolute -right-0 -top-0 text-lg h-6 w-6 p-1 box-content bg-black/30 text-white rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>
        </>
    )
}