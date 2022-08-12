import HomeComp from "../components/home";

export default function Home({headerMov}) {

  return (
      <div>
        <HomeComp headerMov={headerMov}/>
      </div>
  )
}
export async function getStaticProps(){
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch("https://api.themoviedb.org/3/trending/all/week?api_key="+key)
    const data = await response.json();
    let headerMov = data.results.slice(0,5)
    return {
        props: {
            headerMov
        }
    }
}
