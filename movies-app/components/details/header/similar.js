import ResultBox from "../../shared/results/resultBox";

export default function Similar({similarData,media}){


    var results=[];
    for(let i=0;i<8;i++){
        if(similarData?.results)
        results?.push(similarData?.results[i]);
    }

    console.log(results);
    return(
        <div className="w-3/4 h-56 flex flex-wrap absolute -right-24 similarBtm">
            <h1 className="text-3xl text-baseColor pl-6 font-bold font-Signika">Similar {media === "movie"? "Movies":"Series" }</h1>
            <div className="flex flex-wrap">
                {results?.map((item)=> <ResultBox result={item} media={media} />)}

            </div>

        </div>
    )
}