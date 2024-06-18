import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} /> // Ensure onClick prop is passed
      ))}
    </section>
  );
};

export default MovieList;
