
import Carousel from "./carousel";
import NavBar from "./navBar";
export default function Header(){
    return(
        <div className="w-screen h-screen bg-black relative">

            <Carousel/>
            <NavBar/>
        </div>
    )
}