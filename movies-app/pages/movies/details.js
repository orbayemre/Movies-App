import DetailsComp from "../../components/details";
export default function MoviesDetails() {
    var id ;
    if (typeof window !== 'undefined'){
        window.addEventListener('hashchange', function () {
            console.log('location changed!');
        });
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        id = urlParams.get('id');
    }
    return (
        <>
            <DetailsComp detailId ={id} media={"movie"}/>
        </>
    )
}
