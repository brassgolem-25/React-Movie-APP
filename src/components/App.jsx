import React,{useEffect, useState} from "react";
import MovieList from "./MovieList";
import Heading  from "./Heading";
import Search from "./Search";
import AddFavourites from "./AddFavourites";
import RemoveFav from "./RemoveFav";

function App(){
    //use State
    const [movies,searchMovies] = useState([]);
    const [searchVal, setSearch] = useState('');
    const [fav,setFav] = useState([]);

    const  movieRequest= async (searchVal) => {
           const url = `https://www.omdbapi.com/?s=${searchVal}&apikey=f12fe040`;

           const response = await fetch(url);
           const responseJSON = await response.json();
           console.log(responseJSON);
           if(responseJSON.Search){
            searchMovies(responseJSON.Search);
           }
    }

    useEffect (() => {
        movieRequest(searchVal);
    },[searchVal]);

    useEffect(() => {
      const movieFav = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
      )
      if(movieFav){
      setFav(movieFav)
    }
    },[]);

    function saveToLocal(items){
      localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
    }

    function addFavMovie(movie){
      const newFav = [...fav,movie];
      setFav(newFav);
      saveToLocal(newFav)
    }

    function removeFavMovie(movie){
      const newFav = fav.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
      )
      setFav(newFav)
       saveToLocal(newFav)
     }


   return <div className="container-fluid movie-app" >
   <div className="row d-flex align-items-center mt-4 mb-4">
       <Heading heading="Movies"/>
       <Search value={searchVal} setValue={setSearch} />
   </div>
     <div className="row">
     <MovieList movies={movies} handleFavClick={addFavMovie} favComponent = {AddFavourites} />
     </div>
     <div className="row d-flex align-items-center mt-4 mb-4">
         <Heading heading="Favourites"/>
     </div>
     <div className="row">
     <MovieList movies={fav} handleFavClick={removeFavMovie} favComponent = {RemoveFav} />
     </div>
    </div>
}

export default App;
