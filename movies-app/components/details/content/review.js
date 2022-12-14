import LottieAnimation from "../../shared/lottieAnimation";
import {useState} from "react";
import useWindowSize from "../../shared/useWindowSize";

const Text = ({item})=>{

    const [isReadMore,setIsReadMore] = useState(true);
    const size = useWindowSize();

    var totalSimilar=160;
    if (size.width <=900)  totalSimilar = 300;
    else if(size.width >900 && size.width <=1280) totalSimilar = 500;
    return(
        <p>
            <span className="text-white font-Signika xl:text-sm 900:text-lg text-sm">
                {isReadMore ? item?.content.slice(0, totalSimilar): item?.content}
            </span>
            <span onClick={()=>setIsReadMore(!isReadMore)} className="text-baseColor xl:text-sm 900:text-lg text-sm cursor-pointer font-Signika font-bold">
            {   item?.content.length > totalSimilar ? (isReadMore ? "... Read more" : " Show less") : ""}
            </span>
        </p>
    )
}



export default function Review({reviewData}){

    if(reviewData?.results?.length>0){
        var results=[];
        if(reviewData?.results.length>8){
            for(let i=0;i<8;i++){
                results.push(reviewData?.results[i]);
            }
        }
        else results = reviewData?.results;


        return(
            <div  className="xl:w-thirty w-sb h-review xl:ml-12 ml-6  my-14 ">
                <h1 className="text-3xl text-baseColor pl-2 font-bold font-Signika">Reviews</h1>
                <div className="scroll w-full px-2 h-full overflow-auto">
                    {
                        results?.map((item,index)=>{
                            var date="";
                            var hours="";
                            if(item?.updated_at){date = item?.updated_at.slice(8,10)+"."+item?.updated_at.slice(5,7)+"."+ item?.updated_at.slice(0,4);}
                            else if(item?.created_at){date = item?.created_at.slice(8,10)+"."+item?.created_at.slice(5,7)+"."+ item?.created_at.slice(0,4);}

                            if(item?.updated_at){hours = item?.updated_at.slice(11,19)}
                            else if(item?.created_at){hours = item?.created_at.slice(11,19)}

                            return(
                                <div key={index} className="w-full pl-4 py-1 pr-2 xl:my-2 my-5 bg-background/80 shadowType3 rounded-lg">
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
            </div>
        )}
    else{
        return (
            <div className="xl:w-thirty w-full h-auto ml-12 my-14 rounded shadowType3 ">
                <h1 className="text-3xl pl-4 text-baseColor font-bold font-Signika mb-2">Review</h1>
                <span className="font-bold font-Signika text-baseColor text-lg flex justify-center items-center flex-col ">
                    <LottieAnimation link={"https://assets8.lottiefiles.com/packages/lf20_grav99as.json"}
                                     width={"80px"} height={"80px"}/>
                   <span>No review found.</span>
               </span>

            </div>
        )
    }
}