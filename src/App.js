import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Load initial movies on mount
  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  // Handle scroll behavior for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at the top
      if (currentScrollY < 50) {
        setScrolled(false);
        setHideNav(false);
      } else {
        setScrolled(true);
        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setHideNav(true);
        } else {
          setHideNav(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const searchMovies = async (title) => {
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hideNav ? 'hidden' : ''}`}>
        <h1 className="navbar-brand">CineGuide</h1>
        <div className="navbar-search-container">
          <div className={`navbar-search ${searchExpanded ? 'expanded' : ''}`}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search movies..."
              className="navbar-search-input"
            />
            <img
              className="navbar-search-icon"
              src={SearchIcon}
              alt="search"
              onClick={() => {
                if (!searchExpanded) {
                  setSearchExpanded(true);
                } else if (searchTerm.trim()) {
                  searchMovies(searchTerm);
                } else {
                  setSearchExpanded(false);
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src="/popcorn.png" alt="" className="hero-popcorn" />
        <img src="/clapperboard.png" alt="" className="hero-clapperboard" />
        <img src="/filmreel.png" alt="" className="hero-filmreel" />
        <img src="/tickets.png" alt="" className="hero-tickets" />
        <div className="hero-content">
          <h1>Your Ultimate Movie Information Hub</h1>
          <p className="hero-subtitle">Discover movies, find where to watch, and explore the world of cinema.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        {loading ? (
          <div className="loading-container">
            <p className="loading-text">Loading amazing content...</p>
          </div>
        ) : movies?.length > 0 ? (
          <>
            <h2 className="section-title">
              {searchTerm ? `Results for "${searchTerm}"` : "Popular Movies"}
            </h2>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty">
            <h2>No content found</h2>
            <p>Try searching for something else</p>
          </div>
        )}
      </section>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;