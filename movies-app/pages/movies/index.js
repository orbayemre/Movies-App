import MoviesComp from "../../components/movies";
export default function Movies(props) {
    return (
        <div className="bg-background">
            <MoviesComp data={props.data}/>
        </div>
    )
}
export const getStaticProps = async () => {

    const key = process.env.NEXT_PUBLIC_API_KEY;


    const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1";
    const responsePopMovie =  await fetch(responsePopMovieUrl);
    const dataPopMovie = await responsePopMovie.json();
    let popMovie = dataPopMovie.results;

    const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page=1";
    const responseRatedMovie =  await fetch(responseRatedMovieUrl);
    const dataRatedMovie = await responseRatedMovie.json();
    let ratedMovie = dataRatedMovie.results;

    const data = [...popMovie,...ratedMovie];
    return {
        props: { data }
    };
};
