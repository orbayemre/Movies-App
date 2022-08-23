import Text from "./text";
import {useEffect,useRef} from "react";

export default function Review({reviewData}){

    const notFoundIcon = useRef(null);
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    if(reviewData?.results?.length>0){
        var results=[];
        if(reviewData?.results.length>4){
            for(let i=0;i<4;i++){
                results.push(reviewData?.results[i]);
            }
        }
        else results = reviewData?.results;
        console.log(results);


        return(
            <div id="reviewScroll" className="w-1/4 h-review relative px-2 left-20 bottom-28 overflow-auto ">
                <h1 className="text-3xl text-baseColor font-bold font-Signika">Review</h1>
                {
                    results?.map((item,index)=>{
                        //"2021-06-23T15:58:26.376Z"
                        var date="";
                        var hours="";
                        if(item?.updated_at){date = item?.updated_at.slice(8,10)+"."+item?.updated_at.slice(5,7)+"."+ item?.updated_at.slice(0,4);}
                        else if(item?.created_at){date = item?.created_at.slice(8,10)+"."+item?.created_at.slice(5,7)+"."+ item?.created_at.slice(0,4);}

                        if(item?.updated_at){hours = item?.updated_at.slice(11,19)}
                        else if(item?.created_at){hours = item?.created_at.slice(11,19)}

                        return(
                            <div key={index} className="w-full pl-4 py-1 pr-2 my-2 bg-background/80 shadowType3 rounded-lg">
                                <div className="w-full flex justify-between pl-1 pr-5">
                                    <h2 className="text-baseColor text-lg font-bold font-Signika">{item?.author}</h2>
                                    <div className="text-baseColor/80 text-sm font-bold font-Signika flex flex-col">
                                        <span className="leading-3">{date}</span>
                                        <span className="text-small text-baseColor/60 leading-3">{hours}</span>
                                    </div>
                                </div>
                                <Text item={item}/>
                            </div>
                        )
                    })

                }
            </div>
    )}
    else{
        return (
            <div className="w-1/4 h-auto relative p-2  left-20 bottom-28  rounded shadowType3 ">
                <h1 className="text-3xl pl-4 text-baseColor font-bold font-Signika mb-2">Review</h1>
               <span className="font-bold font-Signika text-baseColor text-lg flex justify-center items-center flex-col ">
                   <lottie-player
                       id="firstLottie"
                       ref={notFoundIcon}
                       autoplay={true}
                       loop={true}
                       mode="normal"
                       src="https://assets8.lottiefiles.com/packages/lf20_grav99as.json"
                       style={{ width: "80px", height: "80px" }}
                   ></lottie-player>
                   <span>No review found.</span>
               </span>

            </div>
        )
    }
}