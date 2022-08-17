import SeriesComp from "../../components/series";

export default function Series(props) {
    return (
        <div className="bg-background">
            <SeriesComp data={props.data}/>
        </div>
    )
}
export const getStaticProps = async () => {

    const key = process.env.NEXT_PUBLIC_API_KEY;


    const responsePopTvUrl = "https://api.themoviedb.org/3/tv/popular?api_key="+key+"&language=en-US&page=1";
    const responsePopTv =  await fetch(responsePopTvUrl);
    const dataPopTv = await responsePopTv.json();
    let popTv = dataPopTv.results;

    const responseRatedTvUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key="+key+"&language=en-US&page=1";
    const responseRatedTv =  await fetch(responseRatedTvUrl);
    const dataRatedTv = await responseRatedTv.json();
    let ratedTv = dataRatedTv.results;

    const data = [...popTv,...ratedTv];
    return {
        props: { data }
    };
};