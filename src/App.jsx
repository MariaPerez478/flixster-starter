import React, { useEffect, useState } from 'react';
import MovieList from './Components/MovieList/MovieList';
import MovieModal from './Components/MovieModal/MovieModal';
import './App.css'; // Import your CSS file

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('nowPlaying');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, viewType, selectedGenre]);

  const fetchMovies = async () => {
    const apiKey = '82f0e2251da76a3a343a143602215a18';
    let url = '';

    if (viewType === 'nowPlaying') {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
    } else if (viewType === 'search') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
    } else if (viewType === 'genre' && selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&page=${currentPage}`;
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if (currentPage === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset currentPage when search query changes
    setViewType('search'); // Switch view to search results
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset currentPage when performing a new search
    setViewType('search'); // Switch view to search results
  };

  const handleSwitchToNowPlaying = () => {
    setViewType('nowPlaying');
    setCurrentPage(1); // Reset currentPage when switching to Now Playing
    setSearchQuery(''); // Clear search query when switching to Now Playing
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    setViewType('genre');
    setCurrentPage(1); // Reset currentPage when genre filter changes
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set selected movie when clicked
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // Close the modal by resetting selected movie to null
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Flixter</h1>
        <div className="view-switch">
          <button onClick={handleSwitchToNowPlaying} className={viewType === 'nowPlaying' ? 'active' : ''}>
            Now Playing
          </button>
          <button onClick={() => setViewType('search')} className={viewType === 'search' ? 'active' : ''}>
            Search
          </button>
          <select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
        </div>
      </header>
      <main>
        {viewType === 'search' && (
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
            />
            <button type="submit">Search</button>
          </form>
        )}
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
        {loading && <p>Loading...</p>}
        {!loading && currentPage < totalPages && (
          <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
          /*<button onClick={handleLoadMore}>Load More</button>*/
        )}
        {!loading && currentPage >= totalPages && (
          <p>No more movies to load</p>
        )}
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; About: 2024 Movie Database. All rights reserved. Contact: MariaPerez478.</p>
        </div>
      </footer>
      {/* Render MovieModal conditionally based on selectedMovie state */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;

















/*import React, { useEffect, useState } from 'react';
import MovieList from './Components/MovieList/MovieList';
import MovieModal from './Components/MovieModal/MovieModal';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('nowPlaying');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, viewType, selectedGenre]);

  const fetchMovies = async () => {
    const apiKey = '82f0e2251da76a3a343a143602215a18';
    let url = '';

    if (viewType === 'nowPlaying') {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
    } else if (viewType === 'search') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
    } else if (viewType === 'genre' && selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&page=${currentPage}`;
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if (currentPage === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset currentPage when search query changes
    setViewType('search'); // Switch view to search results
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset currentPage when performing a new search
    setViewType('search'); // Switch view to search results
  };

  const handleSwitchToNowPlaying = () => {
    setViewType('nowPlaying');
    setCurrentPage(1); // Reset currentPage when switching to Now Playing
    setSearchQuery(''); // Clear search query when switching to Now Playing
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    setViewType('genre');
    setCurrentPage(1); // Reset currentPage when genre filter changes
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set selected movie when clicked
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // Close the modal by resetting selected movie to null
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <h1 className="header-title">Movie Database</h1>
        </div>
        <div className="view-switch">
          <button onClick={handleSwitchToNowPlaying} className={viewType === 'nowPlaying' ? 'active' : ''}>
            Now Playing
          </button>
          <button onClick={() => setViewType('search')} className={viewType === 'search' ? 'active' : ''}>
            Search
          </button>
          <select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
        </div>
      </header>
      <main>
        {viewType === 'search' && (
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies..."
            />
            <button type="submit">Search</button>
          </form>
        )}
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
        {loading && <p>Loading...</p>}
        {!loading && currentPage < totalPages && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
        {!loading && currentPage >= totalPages && (
          <p>No more movies to load</p>
        )}
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; About: 2024 Movie Database. All rights reserved. Contact: MariaPerez478.</p>
        </div>
      </footer>
      {}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;*/














