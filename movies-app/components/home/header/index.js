
import Carousel from "./carousel";
import NavBar from "./navBar";
export default function Header(){
    return(
        <div className="w-screen h-screen bg-red-500">

            <Carousel/>
            <NavBar/>
        </div>
    )
}