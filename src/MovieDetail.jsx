import React, { useState, useEffect } from 'react';

const API_URL = "https://www.omdbapi.com?apikey=9405a0c2";

const MovieDetail = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${movie.imdbID}&plot=full`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movie.imdbID) {
      fetchDetails();
    }
  }, [movie.imdbID]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to determine release status
  const getReleaseStatus = (released, type) => {
    if (!released || released === "N/A") return null;
    
    const releaseDate = new Date(released);
    const now = new Date();
    const monthsAgo = (now - releaseDate) / (1000 * 60 * 60 * 24 * 30);
    
    // If movie type
    if (type === "movie") {
      if (releaseDate > now) {
        return { status: 'upcoming', label: 'Coming Soon', class: 'status-upcoming' };
      } else if (monthsAgo < 2) {
        return { status: 'theater', label: 'In Theaters', class: 'status-theater' };
      } else if (monthsAgo < 4) {
        return { status: 'recent', label: 'Recently Released', class: 'status-recent' };
      } else {
        return { status: 'released', label: 'Released', class: 'status-released' };
      }
    }
    return null;
  };

  // Helper function to get streaming platforms (simulated - would need real API)
  const getStreamingPlatforms = (title, year) => {
    // This is simulated data. In a real app, you'd use JustWatch API or similar
    const platforms = [];
    
    // Simulate some logic based on year
    const releaseYear = parseInt(year);
    if (releaseYear >= 2020) {
      platforms.push({ name: 'Netflix', available: true });
      platforms.push({ name: 'Prime Video', available: false });
      platforms.push({ name: 'Disney+', available: false });
    } else if (releaseYear >= 2015) {
      platforms.push({ name: 'Netflix', available: false });
      platforms.push({ name: 'Prime Video', available: true });
      platforms.push({ name: 'Hulu', available: false });
    } else {
      platforms.push({ name: 'Prime Video', available: true });
      platforms.push({ name: 'HBO Max', available: false });
    }
    
    return platforms;
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="loading-container">
            <p className="loading-text">Loading movie info...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!details || details.Response === "False") {
    return null;
  }

  const releaseStatus = getReleaseStatus(details.Released, details.Type);
  const streamingPlatforms = getStreamingPlatforms(details.Title, details.Year);

  const openIMDb = () => {
    window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank');
  };

  const openJustWatch = () => {
    // JustWatch search for streaming availability
    window.open(`https://www.justwatch.com/us/search?q=${encodeURIComponent(details.Title)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="close-text">Back</span>
        </button>
        
        <div className="modal-backdrop">
          <img 
            src={details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/1920x1080/141414/666666?text=No+Image"} 
            alt={details.Title}
          />
          
          {/* Release Status Badge */}
          {releaseStatus && (
            <div className={`release-status-badge ${releaseStatus.class}`}>
              {releaseStatus.label}
            </div>
          )}
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{details.Title}</h2>
          
          <div className="modal-meta">
            {details.imdbRating !== "N/A" && (
              <div className="modal-rating">
                <span>⭐</span>
                <span>{details.imdbRating}/10</span>
              </div>
            )}
            {details.Year !== "N/A" && <span>{details.Year}</span>}
            {details.Runtime !== "N/A" && <span>{details.Runtime}</span>}
            {details.Rated !== "N/A" && <span className="modal-rated">{details.Rated}</span>}
          </div>

          {/* Release Date Info */}
          {details.Released !== "N/A" && (
            <div className="release-info">
              <span className="info-label">
                {releaseStatus?.status === 'upcoming' ? '📅 Releases:' : 
                 releaseStatus?.status === 'theater' ? '🎬 In Theaters Since:' : 
                 '📅 Released:'}
              </span>
              <span className="info-value">{details.Released}</span>
            </div>
          )}

          {details.Plot !== "N/A" && (
            <p className="modal-plot">{details.Plot}</p>
          )}

          {/* Streaming Platforms Section */}
          <div className="streaming-section">
            <h3 className="streaming-title">Where to Watch</h3>
            <div className="streaming-platforms">
              {streamingPlatforms.map((platform, index) => (
                <div 
                  key={index} 
                  className={`platform-badge ${platform.available ? 'available' : 'unavailable'}`}
                >
                  <span className="platform-name">{platform.name}</span>
                  {platform.available ? (
                    <span className="platform-status">✓ Available</span>
                  ) : (
                    <span className="platform-status">Not Available</span>
                  )}
                </div>
              ))}
            </div>
            <p className="streaming-note">
              * Availability shown is estimated. Click below for accurate streaming info.
            </p>
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={openIMDb}>
              <span>▶</span> View on IMDb
            </button>
            <button className="btn btn-secondary" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(details.Title + ' official trailer')}`, '_blank')}>
              🎬 Watch Trailer
            </button>
            <button className="btn btn-secondary" onClick={openJustWatch}>
              📺 Find Streaming
            </button>
          </div>

          {/* Box Office Info */}
          {details.BoxOffice && details.BoxOffice !== "N/A" && (
            <div className="box-office-info">
              <span className="info-label">💰 Box Office:</span>
              <span className="info-value">{details.BoxOffice}</span>
            </div>
          )}

          {/* DVD Release */}
          {details.DVD && details.DVD !== "N/A" && (
            <div className="dvd-info">
              <span className="info-label">📀 DVD Release:</span>
              <span className="info-value">{details.DVD}</span>
            </div>
          )}

          <div className="modal-details">
            {details.Genre !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Genre:</span>
                <span className="detail-value">{details.Genre}</span>
              </div>
            )}
            {details.Director !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Director:</span>
                <span className="detail-value">{details.Director}</span>
              </div>
            )}
            {details.Actors !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Cast:</span>
                <span className="detail-value">{details.Actors}</span>
              </div>
            )}
            {details.Writer !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Writer:</span>
                <span className="detail-value">{details.Writer}</span>
              </div>
            )}
            {details.Language !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Language:</span>
                <span className="detail-value">{details.Language}</span>
              </div>
            )}
            {details.Country !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Country:</span>
                <span className="detail-value">{details.Country}</span>
              </div>
            )}
            {details.Awards !== "N/A" && details.Awards !== "N/A" && (
              <div className="detail-row">
                <span className="detail-label">Awards:</span>
                <span className="detail-value">{details.Awards}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
