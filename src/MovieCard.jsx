import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img 
        className="movie-poster"
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600/141414/666666?text=No+Poster"} 
        alt={movie.Title}
      />
      
      {movie.Year && movie.Year !== "N/A" && (
        <div className="movie-year">{movie.Year}</div>
      )}
      
      <div className="movie-info">
        {movie.Type && movie.Type !== "N/A" && (
          <div className="movie-type">{movie.Type}</div>
        )}
        <h3 className="movie-title">{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;