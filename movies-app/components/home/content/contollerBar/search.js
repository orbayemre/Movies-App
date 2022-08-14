import {useDispatch} from "react-redux";
import {setQuery} from "../../../../stores/homeSearchFilter";


export default function Search(){


    const dispatch = useDispatch();

    var searchValue;
    const searchChange = (e)=>{
        searchValue = e.target.value;
    }
    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
            dispatch(setQuery(searchValue));
        }
    }


    return(
        <div id="search" className="bg-baseColor text-background mx-8 rounded-lg w-64 flex items-center ">
            <input type="text" onChange={searchChange} onKeyDown={keyDown13}
                   className="outline-0 bg-baseColor px-2 w-56 py-1 font-Signika" />
            <svg onClick={()=> dispatch(setQuery(searchValue))} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    )
}