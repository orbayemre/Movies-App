import Search from "./search";
import Genres from "./genres";
export default function ControllerBar (){
    return(

        <div className="w-full h-14 flex justify-start items-center ml-20 space-x-3 disableSelect">
            <Search/>
            <Genres/>
        </div>

    )
}