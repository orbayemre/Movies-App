import SearchComp from "../components/search";
export default function Search({search}){
    return (
        <div className="bg-background">
            <SearchComp data = {search}/>
        </div>
    )
}
export async function getStaticProps(){
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch("https://api.themoviedb.org/3/trending/all/week?api_key="+key)
    const data = await response.json();
    let search = data.results.slice(0,20)
    console.log(search);
    return {
        props: {
            search
        }
    }
}