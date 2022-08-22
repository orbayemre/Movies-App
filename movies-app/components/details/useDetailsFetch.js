import {useState,useEffect} from "react";
export default function useDetailsFetch(id,media){


    const [data, setData] = useState({});
    const [cast,setCast] = useState();
    const [review,setReview] = useState();
    const [similar,setSimilar] = useState();
    const [trailer,setTrailer] = useState();

    useEffect(()=>{
        if(media === "movie") getMovieData();
        else getTvData()
    },[])

    const getMovieData = async () => {
        try {
            const key = process.env.NEXT_PUBLIC_API_KEY;
            if (id) {
                const detailMovieUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&language=en-US"
                const responseDetail = await fetch(detailMovieUrl);
                const dataDetail = await responseDetail.json();
                setData(dataDetail);

                const castUrl =  "https://api.themoviedb.org/3/movie/"+id+"/credits?api_key="+key+"&language=en-US"
                const responseCast=  await fetch(castUrl);
                const dataCast = await responseCast.json();
                setCast(dataCast);


                const reviewUrl =  "https://api.themoviedb.org/3/moive/"+id+"/reviews?api_key="+key+"&language=en-US"
                const responseReview=  await fetch(reviewUrl);
                const dataReview = await responseReview.json();
                setReview(dataReview);

                const similarUrl =  "https://api.themoviedb.org/3/movie/"+id+"/similar?api_key="+key+"&language=en-US"
                const responseSimilar=  await fetch(similarUrl);
                const dataSimilar = await responseSimilar.json();
                setSimilar(dataSimilar);

                const trailerUrl =  "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key="+key+"&language=en-US"
                const responseTrailer=  await fetch(trailerUrl);
                const dataTrailer = await responseTrailer.json();
                setTrailer(dataTrailer);
            }

        } catch (err) {
            console.log(err);
        }
    }
    const getTvData = async () => {
        try {
            const key = process.env.NEXT_PUBLIC_API_KEY;
            if (id) {
                const detailTvUrl = "https://api.themoviedb.org/3/tv/" + id + "?api_key=" + key + "&language=en-US"
                const responseDetail = await fetch(detailTvUrl);
                const dataDetail = await responseDetail.json();
                setData(dataDetail);


                const castUrl =  "https://api.themoviedb.org/3/tv/"+id+"/credits?api_key="+key+"&language=en-US"
                const responseCast=  await fetch(castUrl);
                const dataCast = await responseCast.json();
                setCast(dataCast);


                const reviewUrl =  "https://api.themoviedb.org/3/tv/"+id+"/reviews?api_key="+key+"&language=en-US"
                const responseReview=  await fetch(reviewUrl);
                const dataReview = await responseReview.json()
                setReview(dataReview);

                const similarUrl =  "https://api.themoviedb.org/3/tv/"+id+"/similar?api_key="+key+"&language=en-US"
                const responseSimilar=  await fetch(similarUrl);
                const dataSimilar = await responseSimilar.json();
                setSimilar(dataSimilar);

                const trailerUrl =  "https://api.themoviedb.org/3/tv/"+id+"/videos?api_key="+key+"&language=en-US"
                const responseTrailer=  await fetch(trailerUrl);
                const dataTrailer = await responseTrailer.json();
                setTrailer(dataTrailer);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return {
        data,
        cast,
        review,
        similar,
        trailer
    };
}