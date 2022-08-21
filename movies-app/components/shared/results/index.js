import ResultBox from "./resultBox";

export default  function Results({results,media}){
    return(
        <div className="w-full flex items-center justify-start ml-20 mt-4 flex-wrap">
            {results.map((item)=>(
                <ResultBox result={item} media={media}/>
            ))}

        </div>
    )
}