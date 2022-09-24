import ResultBox from "./resultBox";

export default  function Results({results,media}){
    return(
        <div className="w-full flex items-center justify-start 1460:ml-20 md:ml-10 ml-2  mt-4 flex-wrap">
            {results.map((item)=>(
                <ResultBox result={item} media={media}/>
            ))}

        </div>
    )
}