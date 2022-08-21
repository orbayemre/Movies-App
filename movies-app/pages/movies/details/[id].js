import { useRouter } from 'next/router';
import DetailsComp from "../../../components/details";
import {useState} from "react";

export default function MoviesDetails() {
    const router = useRouter();
    const [id,setId] = useState(router.query.id);
    if (typeof window !== 'undefined'){
        id ? localStorage.setItem("detailId",id) : setId(localStorage.getItem("detailId"));
    }
    return (
        <>
            <DetailsComp detailId ={id} media={"movie"}/>
        </>
    )
}

