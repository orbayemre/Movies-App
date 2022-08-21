import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "../shared/results";
import {useDispatch,useSelector} from "react-redux";
import {setQuery} from "../../stores/searchFilter";
import toast, { Toaster } from 'react-hot-toast';
import {useRef} from "react";
import Link from "next/link";

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
        getData()
    },[query])

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    const getData = async () => {

        try{
            const key = process.env.NEXT_PUBLIC_API_KEY;


            const responseSearchUrl = "https://api.themoviedb.org/3/search/multi?api_key="+key+"&language=en-US&query="+query+"&page="+page;
            const responseSearch =  await fetch(responseSearchUrl);
            const dataSearch = await responseSearch.json();
            let search = dataSearch.results;


            setPage(page+1);
            if(search) setSearchResults((prev) => [...prev, ...search]);
            setLoading(false);
        }
        catch (e){
            console.log(e);
        }
    };

    const searchChange = (e)=>{
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

    const results = []
    for(var key in searchResults){
        results.push(searchResults[key]);
    }
    return (
        <div>
            <div id="search" className="disableSelect bg-baseColor text-background mx-8 rounded-lg w-80 flex items-center relative top-14 left-20 mb-20 ">
                <input type="text" onChange={searchChange} onKeyDown={keyDown13} value={query}
                       className="outline-0 bg-baseColor px-2 w-72 py-1 font-Signika" />
                <svg onClick={searchClick} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            {results.length !== 0  && !loading  &&
                <InfiniteScroll
                    dataLength={results.length}
                    next={getData}
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

export default Content;