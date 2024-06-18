import React, { useState, useEffect } from 'react';
import './MovieModal.css';

  const MovieModal = ({ movie, onClose }) => {
  const [runtime, setRuntime] = useState('');
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');

  const handleClose = () => {
    onClose(); // Callback to close the modal
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = '82f0e2251da76a3a343a143602215a18';
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`;
      const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;

      try {
        // Fetch movie details (runtime and genres)
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const detailsData = await detailsResponse.json();
        setRuntime(detailsData.runtime);
        setGenres(detailsData.genres);

        // Fetch movie videos (trailers)
        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
          throw new Error('Failed to fetch movie videos');
        }
        const videosData = await videosResponse.json();
        const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  if (!movie) {
    return null; // If no movie is selected, return null (modal won't be shown)
  }

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <div className="movie-details">
          <img src={imageUrl} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Runtime:</strong> {runtime} minutes</p>
          <p><strong>Genres:</strong> {genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          {trailerKey ? (
            <div className="trailer">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p><strong>Trailer:</strong> No trailer available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
