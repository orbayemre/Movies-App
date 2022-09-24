import {Provider, useDispatch, useSelector} from "react-redux";
import {useRef,useEffect, useState} from "react";
import store from "../stores";

import Results from "./shared/results";
import Head from "next/head"
import NavBar from "./shared/navBar";
import GoToTop from "./shared/goToTop";

import InfiniteScroll from "react-infinite-scroll-component";
import {setQuery,setGenre} from "../stores/searchFilter";
import toast, { Toaster } from 'react-hot-toast';

const Content = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const {query,genre} = useSelector(state => state.search);
    const loadingRef = useRef(null);

    useEffect(()=>{
        if(!query) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const queryURl = urlParams.get('query')

            if(queryURl) {
                dispatch(setQuery(queryURl));
            }
        }
    },[]);
    useEffect(()=>{
        setSearchResults([]);
        setLoading(true);
        setPage(1)
        getData()
    },[query,genre])

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    const getData = async () => {

        try{
            const key = process.env.NEXT_PUBLIC_API_KEY;
            var responseSearchUrl
            if(genre==="all"){responseSearchUrl = "https://api.themoviedb.org/3/search/multi?api_key="+key+"&language=en-US&query="+query+"&page=1";}
            else if(genre==="movies"){responseSearchUrl = "https://api.themoviedb.org/3/search/movie?api_key="+key+"&language=en-US&query="+query+"&page=1";}
            else if(genre==="series"){responseSearchUrl = "https://api.themoviedb.org/3/search/tv?api_key="+key+"&language=en-US&query="+query+"&page=1";}

            const responseSearch =  await fetch(responseSearchUrl);
            const dataSearch = await responseSearch.json();
            const search = dataSearch.results;

            if(dataSearch.total_pages <= page) {setHasMore(false);}
            else setHasMore(true);

            if(search) setSearchResults(search);
            setLoading(false);
        }
        catch (e){
            console.log(e);
        }
    };

    const searchChange = (e)=>{
        if(e.target.value==="") toast.error("Please type a search value", {
            style: {
                background: '#2C3639',
                color:'#FFC23C',
            },
        })
        dispatch(setQuery(e.target.value));
    }
    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
            searchClick();
        }
    }
    const searchClick = ()=>{
        setSearchResults([]);
        setLoading(true);
        getData();
        if(query==="") toast.error("Please type a search value", {
            style: {
                background: '#2C3639',
                color:'#FFC23C',
            },
        })
    }
    const getMoreData = async ()=>{
        try{
            setPage(page+1);
            const key = process.env.NEXT_PUBLIC_API_KEY;
            var responseSearchUrl
            if(genre==="all"){ responseSearchUrl = "https://api.themoviedb.org/3/search/multi?api_key="+key+"&language=en-US&query="+query+"&page="+page;}
            else if(genre==="movies"){ responseSearchUrl = "https://api.themoviedb.org/3/search/movie?api_key="+key+"&language=en-US&query="+query+"&page="+page;}
            else if(genre==="series"){ responseSearchUrl = "https://api.themoviedb.org/3/search/tv?api_key="+key+"&language=en-US&query="+query+"&page="+page;}

            const responseSearch =  await fetch(responseSearchUrl);
            const dataSearch = await responseSearch.json();
            let search = dataSearch.results;


            if(dataSearch.total_pages <= page) {setHasMore(false);}
            else setHasMore(true);
            if(search) setSearchResults((prev) => [...prev, ...search]);
            setLoading(false);
        }
        catch (e){
            console.log(e);
        }
    }
    const results = []
    for(var key in searchResults){
        results.push(searchResults[key]);
    }
    return (
        <div>
            <div className="flex md:flex-row flex-col items-center justify-start md:space-x-32">
                <div id="search" className="disableSelect bg-baseColor text-background mx-8 rounded-lg w-80 flex items-center relative top-14 md:left-20  mb-20 ">
                    <input type="text" onChange={searchChange} onKeyDown={keyDown13} value={query}
                           className="outline-0 bg-baseColor px-2 w-72 py-1 font-Signika" />
                    <svg onClick={searchClick} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex w-64 justify-around items-center disableSelect font-Signika font-bold text-baseColor relative md:top-4">
                    <div  onClick={()=>dispatch(setGenre("all"))} className={"border border-baseColor rounded-xl flex justify-around items-center px-4 py-1 " +
                        "hover:bg-baseColor hover:text-background duration-200 cursor-pointer "+
                        (genre==="all" ? "bg-baseColor text-background ":"")}>
                        {
                            genre === "all" &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l6.785 6.785A48.1 48.1 0 0121 4.143" />
                            </svg>
                        }
                        <input type="radio" name="genre" id="all" className="hidden"/>
                        <label htmlFor="all" className="cursor-pointer">All</label>
                    </div>
                    <div  onClick={()=>dispatch(setGenre("movies"))} className={"border border-baseColor rounded-xl flex justify-around items-center px-4 py-1 " +
                        "hover:bg-baseColor hover:text-background duration-200 cursor-pointer "+
                        (genre==="movies" ? "bg-baseColor text-background ":"")}>
                        {
                            genre === "movies" &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l6.785 6.785A48.1 48.1 0 0121 4.143" />
                            </svg>
                        }
                        <input type="radio" name="genre" id="movies" className="hidden"/>
                        <label htmlFor="movies">Movies</label>
                    </div>
                    <div  onClick={()=>dispatch(setGenre("series"))} className={"border border-baseColor rounded-xl flex justify-around items-center px-4 py-1 " +
                        "hover:bg-baseColor hover:text-background duration-200 cursor-pointer "+
                        (genre==="series" ? "bg-baseColor text-background ":"") }>
                        {
                            genre === "series" &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l6.785 6.785A48.1 48.1 0 0121 4.143" />
                            </svg>
                        }
                        <input type="radio" name="genre" id="series" className="hidden"/>
                        <label className="ml-2" htmlFor="series">Series</label>
                    </div>
                </div>

            </div>

            {results.length !== 0  && !loading  &&
                <InfiniteScroll
                    dataLength={results.length}
                    next={getMoreData}
                    hasMore={hasMore}
                >
                    <Results results={results}></Results>
                </InfiniteScroll>
            }
            {results.length === 0 && !loading &&
                <div className="text-baseColor absolute top-18 left-28 text-2xl font-bold font-Signika">
                    No results found.
                </div>
            }
            {loading && <div>
                <div className="text-baseColor flex flex-col  absolute top-18 left-28">
                    <lottie-player
                        id="firstLottie"
                        ref={loadingRef}
                        autoplay
                        loop
                        mode="normal"
                        src="https://assets1.lottiefiles.com/packages/lf20_j1adxtyb.json"
                        style={{ width: "200px", height: "200px" }}
                    ></lottie-player>
                    <span className="text-3xl font-bold font-Signika">Loading...</span>
                </div>
            </div>
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

        </div>
    );
};


export default function SearchComp(){
    return(
        <div>
            <Head>
                <title>Movies App - Search</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GoToTop/>
            <Provider store={store}>
                <Content/>
                <NavBar/>
            </Provider>
        </div>
    )
}