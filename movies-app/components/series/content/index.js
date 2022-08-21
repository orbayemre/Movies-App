import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "../../shared/results";

const Content = ({ data }) => {
    const [series, setSeries] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const [page,setPage] = useState(2);

    const getData = async () => {
        const key = process.env.NEXT_PUBLIC_API_KEY;

        const responsePopTvUrl = "https://api.themoviedb.org/3/tv/popular?api_key="+key+"&language=en-US&page="+page;
        const responsePopTv =  await fetch(responsePopTvUrl);
        const dataPopTv = await responsePopTv.json();
        let popTv = dataPopTv.results;

        const responseRatedTvUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key="+key+"&language=en-US&page="+page;
        const responseRatedTv =  await fetch(responseRatedTvUrl);
        const dataRatedTv = await responseRatedTv.json();
        let ratedTv = dataRatedTv.results;

        setPage(page+1);
        setSeries((prev) => [...prev, ...popTv,...ratedTv]);
    };

    const results = []
    for(var key in series){
        results.push(series[key]);
    }

    return (
        <>
            <InfiniteScroll
                dataLength={results.length}
                next={getData}
                hasMore={hasMore}
            >
                <Results results={results} media={"tv"}></Results>
            </InfiniteScroll>
        </>
    );
};

export default Content;
