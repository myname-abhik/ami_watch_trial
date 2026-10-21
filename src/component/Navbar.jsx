import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moviesInfo from '../assets/Movies_info/Movies_info.json';
import moviePickups from '../assets/Movies_info/Movie_pickup.json';
import { getCurrentUser, setCurrentUser, getWatchlist } from '../utils/watchlist';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [currentUser, setUser] = useState(null);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const searchRef = useRef(null);
  const browseRef = useRef(null);
  const navigate = useNavigate();

  // Combine and deduplicate movie catalogue for comprehensive search
  const movieCatalog = useMemo(() => {
    const list = [];
    const seenTitles = new Set();

    // Primary movies catalog
    moviesInfo.forEach((item) => {
      const title = item.Movie;
      if (!seenTitles.has(title.toLowerCase())) {
        seenTitles.add(title.toLowerCase());
        list.push({
          title: item.Movie,
          poster: item.Poster || '/Movie_content/1299334.jpg',
          genres: item.Genres || ['Drama'],
          features: Array.isArray(item.Features) ? item.Features.join(' • ') : 'Sub • Dub',
          description: item.Description || '',
          rating: '8.4',
        });
      }
    });

    // Supplementary pickups
    moviePickups.forEach((item) => {
      const title = item.Movie_title;
      if (!seenTitles.has(title.toLowerCase())) {
        seenTitles.add(title.toLowerCase());
        list.push({
          title: item.Movie_title,
          poster: item.Movie_poster || '/Movie_content/1299334.jpg',
          genres: ['Popular', 'Featured'],
          features: item.Movie_feature || 'Sub',
          description: 'A popular selection curated for you.',
          rating: '8.1',
        });
      }
    });

    return list;
  }, []);

  // Debounce search query (250ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter movies based on query
  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();
    return movieCatalog.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(q);
      const genreMatch = movie.genres.some((g) => g.toLowerCase().includes(q));
      const descMatch = movie.description.toLowerCase().includes(q);
      return titleMatch || genreMatch || descMatch;
    });
  }, [debouncedQuery, movieCatalog]);

  // Click outside and escape key handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (browseRef.current && !browseRef.current.contains(event.target)) {
        setBrowseOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setBrowseOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync user authentication and watchlist count
  useEffect(() => {
    const syncState = () => {
      setUser(getCurrentUser());
      setWatchlistCount(getWatchlist().length);
    };
    syncState();
    window.addEventListener('ami-user-updated', syncState);
    window.addEventListener('ami-watchlist-updated', syncState);
    return () => {
      window.removeEventListener('ami-user-updated', syncState);
      window.removeEventListener('ami-watchlist-updated', syncState);
    };
  }, []);

  const handleSignout = (e) => {
    e.preventDefault();
    setCurrentUser(null);
  };

  const handleSelectMovie = (title) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/Movies/${encodeURIComponent(title)}`);
  };

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  const browseCategories = [
    { label: 'All Movies', path: '/Movies' },
    { label: 'Anime & Fantasy', path: '/Movies/Suzume' },
    { label: 'Gangster & Crime', path: '/Movies/peaky-blinders' },
    { label: 'Sci-Fi & Thriller', path: '/Movies/Interstellar' },
    { label: 'Classic Animation', path: '/Movies/Spirited%20Away' },
    { label: 'Romance & Drama', path: '/Movies/20th%20Century%20Girl' },
  ];

  return (
    <nav>
      <div className="nav-content">
        <div className="logo"><Link to="/" className="Link">Logo</Link></div>

        {/* Navigation Links */}
        <div className="content_box">
          <Link to="/" className="Link hover:text-orange-400 transition-colors">Home</Link>
        </div>

        {/* Browse Dropdown */}
        <div
          ref={browseRef}
          className="content_box relative cursor-pointer select-none"
          id="Browse"
          onClick={() => setBrowseOpen(!browseOpen)}
        >
          <span className="flex items-center gap-1 hover:text-orange-400 transition-colors">
            Browse
            <i className={`material-icons text-lg transition-transform duration-200 ${browseOpen ? 'rotate-180' : ''}`}>
              arrow_drop_down
            </i>
          </span>

          {browseOpen && (
            <div className="absolute top-[120%] left-0 w-56 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/60 rounded-xl shadow-2xl py-2 z-50 overflow-hidden animate-fadeIn">
              <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                Categories
              </div>
              {browseCategories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  onClick={() => setBrowseOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-200 hover:text-white hover:bg-neutral-800/80 transition-colors"
                >
                  <span>{cat.label}</span>
                  <i className="material-icons text-xs text-neutral-500">chevron_right</i>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="content_box">
          <Link to="/Movies" className="Link hover:text-orange-400 transition-colors">Movies</Link>
        </div>

        <div className="content_box">
          <Link to="/Pricing" className="Link hover:text-orange-400 transition-colors">Pricing</Link>
        </div>

        <div className="content_box">
          <Link to="/Watchlist" className="Link hover:text-orange-400 transition-colors flex items-center gap-1.5">
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {watchlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Live Search Bar with Real-time Dropdown */}
        <div ref={searchRef} className="Search relative flex items-center">
          <div className="Finder text-white/70 flex items-center">
            <i className="material-icons">search</i>
          </div>

          <input
            type="text"
            placeholder="Search movies, genres..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length > 0) setIsOpen(true);
            }}
            aria-label="Search movies"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="text-white/60 hover:text-white mr-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
              title="Clear search"
            >
              <i className="material-icons text-sm">close</i>
            </button>
          )}

          {/* Real-time Search Results Overlay */}
          {isOpen && query.trim().length > 0 && (
            <div className="absolute top-[125%] right-0 w-[380px] max-h-[460px] bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/70 rounded-2xl shadow-2xl overflow-y-auto z-[100] p-2 text-white">
              <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 text-xs text-neutral-400 font-medium">
                <span>Search results ({searchResults.length})</span>
                <span className="text-[11px] text-neutral-500">Press ESC to close</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-neutral-800/60 mt-1">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.title}
                      onClick={() => handleSelectMovie(movie.title)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-800/90 cursor-pointer transition-all duration-150 group"
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/Movie_content/1299334.jpg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
                          {movie.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                          <span className="text-orange-400 font-medium">★ {movie.rating}</span>
                          <span>•</span>
                          <span className="truncate">{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {movie.features}
                        </div>
                      </div>
                      <i className="material-icons text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all text-sm">
                        arrow_forward_ios
                      </i>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 px-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-500 mb-2">
                    <i className="material-icons text-2xl">movie</i>
                  </div>
                  <p className="text-sm font-medium text-neutral-300">No movies found</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    No results for &ldquo;{query}&rdquo;. Try searching for anime, drama, or action titles.
                  </p>
                  <Link
                    to="/Movies"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-3 text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
                  >
                    Explore all movies
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account Details */}
        <div className="Account_Details">
          <div className="Account_Logo">
            <i className="material-icons">{currentUser ? 'account_circle' : 'person'}</i>
          </div>
          <div className="Account_details_box">
            {currentUser ? (
              <div className="flex flex-col text-left">
                <span className="text-xs text-neutral-200 font-semibold truncate max-w-[85px]">{currentUser.name}</span>
                <button
                  type="button"
                  onClick={handleSignout}
                  className="text-[11px] text-orange-400 hover:text-orange-300 text-left cursor-pointer font-bold bg-transparent border-none p-0"
                >
                  Signout
                </button>
              </div>
            ) : (
              <Link to="/Login" className="Link">
                <span>Account</span> <span id="Signin">Signin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;