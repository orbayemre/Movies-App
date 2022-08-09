import {useEffect,useState} from "react";
import Carousel from "./carousel";
import NavBar from "./navBar";
export default function Header(){
    const [token, setToken] = useState('');

    useEffect(() => {
        if (!token) {
            getToken();
        }
    }, []);

    const getToken = async () => {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const response = await fetch("https://api.themoviedb.org/3/trending/all/week?api_key="+key)
        const data = await response.json();
        let headerMov = data.results.slice(0,5)

        setToken(headerMov);
    };
    return(
        <div className="w-screen h-screen bg-red-400">

            <Carousel movies={token}/>
            <NavBar/>
        </div>
    )
}