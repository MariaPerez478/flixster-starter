import React from 'react';
import './MovieCard.css'; // Import your CSS file for movie card styles

const MovieCard = ({ movie, onClick }) => {
  if (!movie) {
    return null; // Return early if movie object is not defined
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const handleClick = () => {
    onClick(movie); // Pass the entire movie object to parent component
  };

  return (
    <article className="movie-card" onClick={handleClick}>
      
      <img src={imageUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>
    </article>
  );
};

export default MovieCard;
