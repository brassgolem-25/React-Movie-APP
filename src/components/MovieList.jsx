import React from "react";

function MovieList(props){
  const FavComponent = props.favComponent;
    return <>
    {props.movies.map((movie,index) =>
    <div className="image-container d-flex justify-content-start m-3">
    <img src={movie.Poster} alt=""></img>
    <div onClick ={() => props.handleFavClick(movie)} className=" overlay d-flex align-items-center justify-content-start">
       <FavComponent />
      </div>
    </div>)
    }
    </>

}

export default MovieList;
