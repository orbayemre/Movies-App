import {useState} from "react";

export default function Text({item}){

    const [isReadMore,setIsReadMore] = useState(true);
    return(
        <p className="">
            <span className="text-white font-Signika text-sm">
                {isReadMore ? item?.content.slice(0, 150) : item?.content}
            </span>
            <span onClick={()=>setIsReadMore(!isReadMore)} className="text-baseColor cursor-pointer font-Signika font-bold">
            {   item?.content.length > 150 ? (isReadMore ? "...read more" : " show less") : ""}
            </span>
        </p>
    )
}