import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "../shared/results";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setQuery} from "../../stores/searchFilter";
import toast, { Toaster } from 'react-hot-toast';

const Content = ({data}) => {

    const [searchResults, setSearchResults] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage] = useState(1);
    const dispatch = useDispatch();
    const {query,genre} = useSelector(state => state.search);
    const getData = async () => {

        try{
            const key = process.env.NEXT_PUBLIC_API_KEY;


            const responseSearchUrl = "https://api.themoviedb.org/3/search/multi?api_key="+key+"&language=en-US&query="+query+"&page="+page;
            const responseSearch =  await fetch(responseSearchUrl);
            const dataSearch = await responseSearch.json();
            let search = dataSearch.results;


            setPage(page+1);
            if(search) setSearchResults((prev) => [...prev, ...search]);
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
    console.log(results);
/*
*/
    return (
        <div>
            <div id="search" className="bg-baseColor text-background mx-8 rounded-lg w-80 flex items-center relative top-14 left-20 mb-20 ">
                <input type="text" onChange={searchChange} onKeyDown={keyDown13}
                       className="outline-0 bg-baseColor px-2 w-72 py-1 font-Signika" />
                <svg onClick={searchClick} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            {results.length !== 0 &&
                <InfiniteScroll
                    dataLength={results.length}
                    next={getData}
                    hasMore={hasMore}
                >
                    <Results results={results}></Results>
                </InfiniteScroll>
            }
            {results.length === 0 &&
                <div className="text-baseColor absolute top-18 left-28">
                    No results found.
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