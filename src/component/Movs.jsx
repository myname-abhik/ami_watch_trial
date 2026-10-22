import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import moviesInfo from '../assets/Movies_info/Movies_info.json';
import moviePickups from '../assets/Movies_info/Movie_pickup.json';
import { isInWatchlist, toggleWatchlist } from '../utils/watchlist';

// Rich catalog database with accurate metadata
const MOVIE_DATABASE = {
  'suzume': {
    title: 'Suzume',
    year: '2022',
    age: 'PG-13',
    runtime: '2h 2m',
    rating: '7.7',
    match: '96%',
    genres: ['Anime', 'Fantasy', 'Adventure', 'Drama'],
    director: 'Makoto Shinkai',
    cast: [
      { name: 'Nanoka Hara', role: 'Suzume Iwato' },
      { name: 'Hokuto Matsumura', role: 'Souta Munakata' },
      { name: 'Eri Fukatsu', role: 'Tamaki Iwato' },
      { name: 'Shota Sometani', role: 'Minoru Okabe' },
    ],
    description: 'A modern action-adventure road story where 17-year-old Suzume helps a mysterious young man close disaster-releasing doors across Japan to prevent a catastrophic earthquake.',
    poster: '/Movie_content/1299334.jpg',
    backdrop: '/Movie_content/1299334.jpg',
    audio: 'Japanese (Dolby 5.1), English (Dubbed)',
    subtitles: 'English, Japanese, Spanish, French',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'peaky-blinders': {
    title: 'Peaky Blinders',
    year: '2013-2022',
    age: '18+',
    runtime: '6 Seasons',
    rating: '8.8',
    match: '98%',
    genres: ['Crime', 'Period Drama', 'Gangster'],
    director: 'Steven Knight',
    cast: [
      { name: 'Cillian Murphy', role: 'Thomas Shelby' },
      { name: 'Paul Anderson', role: 'Arthur Shelby' },
      { name: 'Helen McCrory', role: 'Polly Gray' },
      { name: 'Tom Hardy', role: 'Alfie Solomons' },
    ],
    description: 'A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.',
    poster: '/Movie_content/HD-wallpaper-peaky-blinders-thomas-shelby-tv-series.jpg',
    backdrop: '/Movie_content/HD-wallpaper-peaky-blinders-thomas-shelby-tv-series.jpg',
    audio: 'English (Original Dolby 5.1)',
    subtitles: 'English, Spanish, French, German',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'spirited away': {
    title: 'Spirited Away',
    year: '2001',
    age: 'PG',
    runtime: '2h 5m',
    rating: '8.6',
    match: '99%',
    genres: ['Animation', 'Fantasy', 'Adventure', 'Family'],
    director: 'Hayao Miyazaki',
    cast: [
      { name: 'Rumi Hiiragi', role: 'Chihiro / Sen' },
      { name: 'Miyu Irino', role: 'Haku' },
      { name: 'Mari Natsuki', role: 'Yubaba / Zeniba' },
      { name: 'Takashi Naito', role: 'Akio Ogino' },
    ],
    description: 'Ten-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. When her parents undergo a mysterious transformation, she must navigate a spirit world to free them.',
    poster: '/Movie_content/spirited-away-4k-upscaled-samples-v0-7uhyv9zj4dea1.webp',
    backdrop: '/Movie_content/spirited-away-4k-upscaled-samples-v0-7uhyv9zj4dea1.webp',
    audio: 'Japanese (Original), English (Dubbed)',
    subtitles: 'English, Japanese, Spanish',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'the-wind-rises': {
    title: 'The Wind Rises',
    year: '2013',
    age: 'PG-13',
    runtime: '2h 6m',
    rating: '7.8',
    match: '94%',
    genres: ['Animation', 'Biography', 'Drama', 'Romance'],
    director: 'Hayao Miyazaki',
    cast: [
      { name: 'Hideaki Anno', role: 'Jiro Horikoshi' },
      { name: 'Hidetoshi Nishijima', role: 'Kiro Honjo' },
      { name: 'Miori Takimoto', role: 'Naoko Satomi' },
      { name: 'Masahiko Nishimura', role: 'Kurokawa' },
    ],
    description: 'A chronicle of the life of Jiro Horikoshi, the passionate designer of Japanese fighter aircraft during World War II, portraying his dreams, love, and creations.',
    poster: '/Movie_content/the-wind-rises-wallpaper-17c1169820060d9969b728ab21c2d546.jpg',
    backdrop: '/Movie_content/the-wind-rises-wallpaper-17c1169820060d9969b728ab21c2d546.jpg',
    audio: 'Japanese (Original), English',
    subtitles: 'English, Spanish',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  '20th century girl': {
    title: '20th Century Girl',
    year: '2022',
    age: '13+',
    runtime: '2h 1m',
    rating: '7.3',
    match: '92%',
    genres: ['Romance', 'Drama', 'Coming-of-Age'],
    director: 'Bang Woo-ri',
    cast: [
      { name: 'Kim Yoo-jung', role: 'Na Bo-ra' },
      { name: 'Byeon Woo-seok', role: 'Poong Woon-ho' },
      { name: 'Park Jung-woo', role: 'Baek Hyun-jin' },
      { name: 'Roh Yoon-seo', role: 'Kim Yeon-doo' },
    ],
    description: 'In 1999, high schooler Bo-ra keeps tabs on a popular boy on behalf of her lovesick best friend. But unexpected romance blossoms, changing their lives forever.',
    poster: '/Movie_content/20th_Century_Girl.jpg',
    backdrop: '/Movie_content/20th_Century_Girl.jpg',
    audio: 'Korean (Original), English',
    subtitles: 'English, Korean, Spanish',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'hometown cha-cha-cha': {
    title: 'Hometown Cha-Cha-Cha',
    year: '2021',
    age: '13+',
    runtime: '16 Episodes',
    rating: '8.4',
    match: '95%',
    genres: ['Romance', 'Comedy', 'Drama'],
    director: 'Yu Je-won',
    cast: [
      { name: 'Shin Min-a', role: 'Yoon Hye-jin' },
      { name: 'Kim Seon-ho', role: 'Hong Du-sik' },
      { name: 'Lee Sang-yi', role: 'Ji Seong-hyun' },
    ],
    description: 'A pragmatic big-city dentist moves to a serene seaside village, where she crosses paths with an eccentric, resourceful handyman who helps everyone in town.',
    poster: '/Movie_content/MV5BNDFkYmM3MGMtYWIwNC00ZDkxLWFjZjItYmQ4NTdiZWNjMzczXkEyXkFqcGc@._V1_.jpg',
    backdrop: '/Movie_content/MV5BNDFkYmM3MGMtYWIwNC00ZDkxLWFjZjItYmQ4NTdiZWNjMzczXkEyXkFqcGc@._V1_.jpg',
    audio: 'Korean (Original)',
    subtitles: 'English, Korean',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'oppenheimer': {
    title: 'Oppenheimer',
    year: '2023',
    age: 'R',
    runtime: '3h 0m',
    rating: '8.9',
    match: '99%',
    genres: ['Biography', 'Drama', 'History'],
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { name: 'Matt Damon', role: 'Leslie Groves' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss' },
    ],
    description: 'The monumental biographical story of theoretical physicist J. Robert Oppenheimer, the visionary director of the Manhattan Project who led the dawn of the atomic age.',
    poster: '/Movie_content/MV5BM2MyYjg0NWMtMjUyMy00Mzg4LTk5NDYtYzcxNmJhOTVhMmU0XkEyXkFqcGc@._V1_.jpg',
    backdrop: '/Movie_content/MV5BM2MyYjg0NWMtMjUyMy00Mzg4LTk5NDYtYzcxNmJhOTVhMmU0XkEyXkFqcGc@._V1_.jpg',
    audio: 'English (Original Dolby Atmos)',
    subtitles: 'English, Spanish, French',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'impossible - dead reckoning': {
    title: 'Mission: Impossible - Dead Reckoning',
    year: '2023',
    age: 'PG-13',
    runtime: '2h 43m',
    rating: '7.7',
    match: '94%',
    genres: ['Action', 'Adventure', 'Thriller'],
    director: 'Christopher McQuarrie',
    cast: [
      { name: 'Tom Cruise', role: 'Ethan Hunt' },
      { name: 'Hayley Atwell', role: 'Grace' },
      { name: 'Ving Rhames', role: 'Luther Stickell' },
      { name: 'Simon Pegg', role: 'Benji Dunn' },
    ],
    description: 'Ethan Hunt and his IMF team must track down a terrifying rogue artificial intelligence before it falls into the hands of a dangerous new enemy from his past.',
    poster: '/Movie_content/Tom.jpg',
    backdrop: '/Movie_content/Tom.jpg',
    audio: 'English (Original Dolby Atmos)',
    subtitles: 'English, Spanish, French',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
  'interstellar': {
    title: 'Interstellar',
    year: '2014',
    age: 'PG-13',
    runtime: '2h 49m',
    rating: '8.7',
    match: '99%',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Joseph Cooper' },
      { name: 'Anne Hathaway', role: 'Dr. Amelia Brand' },
      { name: 'Jessica Chastain', role: 'Murphy Cooper' },
      { name: 'Michael Caine', role: 'Professor Brand' },
    ],
    description: 'In a desperate future where Earth is slowly dying, a courageous team of astronauts travels through a newly discovered wormhole near Saturn in search of a habitable new home for humanity.',
    poster: '/Movie_content/inter.jpg',
    backdrop: '/Movie_content/inter.jpg',
    audio: 'English (Original Dolby Atmos)',
    subtitles: 'English, Spanish, French, German',
    trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
  },
};

const Movs = () => {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const [inList, setInList] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Resolve movie details
  const movie = useMemo(() => {
    const rawId = decodeURIComponent(id || '').trim();
    const normalizedKey = rawId.toLowerCase().replace(/_/g, ' ');

    if (MOVIE_DATABASE[normalizedKey]) {
      return MOVIE_DATABASE[normalizedKey];
    }

    // Match by partial title
    for (const [key, value] of Object.entries(MOVIE_DATABASE)) {
      if (key.includes(normalizedKey) || normalizedKey.includes(key)) {
        return value;
      }
    }

    // Check raw json files
    const foundInfo = moviesInfo.find((m) => m.Movie.toLowerCase() === normalizedKey);
    const foundPickup = moviePickups.find((m) => m.Movie_title.toLowerCase() === normalizedKey);

    const prettyTitle = rawId
      .split(/[-_ ]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      title: prettyTitle,
      year: '2023',
      age: '13+',
      runtime: '2h 10m',
      rating: '8.4',
      match: '95%',
      genres: foundInfo?.Genres || ['Drama', 'Featured'],
      director: 'Featured Director',
      cast: [
        { name: 'Leading Cast Ensemble', role: 'Lead Character' },
        { name: 'Supporting Actor', role: 'Supporting' },
      ],
      description:
        foundInfo?.Description ||
        'An extraordinary cinematic experience streaming in high definition with pristine surround sound on Ami Watch.',
      poster: foundInfo?.Poster || foundPickup?.Movie_poster || '/Movie_content/1299334.jpg',
      backdrop: foundInfo?.Poster || foundPickup?.Movie_poster || '/Movie_content/1299334.jpg',
      audio: 'English (Original), Japanese',
      subtitles: 'English, Spanish, French',
      trailer: 'https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4',
    };
  }, [id]);

  // Sync Watchlist
  useEffect(() => {
    if (movie.title) {
      setInList(isInWatchlist(movie.title));
    }
    const handleUpdate = () => {
      if (movie.title) setInList(isInWatchlist(movie.title));
    };
    window.addEventListener('ami-watchlist-updated', handleUpdate);
    return () => window.removeEventListener('ami-watchlist-updated', handleUpdate);
  }, [movie.title]);

  const handleToggleWatchlist = () => {
    const added = toggleWatchlist({
      title: movie.title,
      poster: movie.poster,
      genres: movie.genres,
      rating: movie.rating,
      features: 'Sub • Dub',
    });
    setToastMessage(added ? `Added "${movie.title}" to Watchlist` : `Removed from Watchlist`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Recommendations: Other movies excluding current
  const recommendations = useMemo(() => {
    return Object.values(MOVIE_DATABASE)
      .filter((m) => m.title.toLowerCase() !== movie.title.toLowerCase())
      .slice(0, 4);
  }, [movie.title]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-orange-500 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <i className="material-icons text-orange-400 text-base">bookmark</i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <h3 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
                <i className="material-icons text-orange-500 text-lg">movie</i>
                {movie.title} — Official Trailer
              </h3>
              <button
                onClick={() => setShowTrailer(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close trailer"
              >
                <i className="material-icons text-lg">close</i>
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video controls autoPlay className="w-full h-full object-cover">
                <source src={movie.trailer} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Backdrop */}
      <div className="relative w-full min-h-[600px] md:min-h-[680px] flex items-end">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-top filter brightness-[0.38] saturate-[1.1] scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/Movie_content/1299334.jpg';
            }}
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <i className="material-icons text-xs">chevron_right</i>
            <Link to="/Movies" className="hover:text-white transition-colors">Movies</Link>
            <i className="material-icons text-xs">chevron_right</i>
            <span className="text-orange-400 font-semibold truncate max-w-[200px]">{movie.title}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Left: Movie Poster Card */}
            <div className="w-40 sm:w-48 md:w-60 flex-shrink-0 mx-auto md:mx-0">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-neutral-900">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/Movie_content/1299334.jpg';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-bold text-orange-400 border border-orange-500/30">
                  ★ {movie.rating}
                </div>
              </div>
            </div>

            {/* Right: Detailed Metadata */}
            <div className="flex-1 min-w-0 flex flex-col justify-end text-left w-full">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mb-2">
                <span className="text-emerald-400 font-bold">{movie.match} Match</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-300 font-medium">{movie.year}</span>
                <span className="text-neutral-500">•</span>
                <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-semibold border border-neutral-700">
                  {movie.age}
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-300 font-medium">{movie.runtime}</span>
                <span className="text-neutral-500">•</span>
                <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[11px] font-bold border border-orange-500/30">
                  Ultra HD 4K
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                {movie.title}
              </h1>

              {/* Genres Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
                {movie.description}
              </p>

              {/* Director & Starring info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 mb-6 pb-6 border-b border-neutral-800">
                <div>
                  <span className="text-neutral-500 font-medium">Director: </span>
                  <span className="text-neutral-200 font-semibold">{movie.director}</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-medium">Starring: </span>
                  <span className="text-neutral-200 font-semibold truncate">
                    {movie.cast.map((c) => c.name).slice(0, 3).join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/Video/${encodeURIComponent(movie.title)}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <i className="material-icons text-xl">play_arrow</i>
                  <span>Play Movie</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowTrailer(true)}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <i className="material-icons text-lg text-orange-400">play_circle_outline</i>
                  <span>Watch Trailer</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleWatchlist}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold border backdrop-blur-md flex items-center gap-2 transition-all ${
                    inList
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
                  }`}
                  title={inList ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <i className="material-icons text-lg">{inList ? 'bookmark' : 'bookmark_border'}</i>
                  <span>{inList ? 'In Watchlist' : 'Add to List'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details & Recommendations */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-neutral-800 pb-3 mb-8 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'overview' ? 'text-orange-500' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Overview & Audio
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('cast')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'cast' ? 'text-orange-500' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cast & Crew ({movie.cast.length})
            {activeTab === 'cast' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Audio & Sound
              </h4>
              <p className="text-sm font-semibold text-white">{movie.audio}</p>
              <p className="text-xs text-neutral-500 mt-1">Dolby Atmos & 5.1 Surround Available</p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Subtitles
              </h4>
              <p className="text-sm font-semibold text-white">{movie.subtitles}</p>
              <p className="text-xs text-neutral-500 mt-1">Closed captions (CC) supported</p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Resolution & Playback
              </h4>
              <p className="text-sm font-semibold text-white">4K Ultra HD & Full HD 1080p</p>
              <p className="text-xs text-neutral-500 mt-1">Adaptive bitrate streaming enabled</p>
            </div>
          </div>
        )}

        {/* Tab 2: Cast */}
        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {movie.cast.map((c) => (
              <div
                key={c.name}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{c.name}</div>
                  <div className="text-[11px] text-neutral-400 truncate">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <i className="material-icons text-orange-500 text-xl">recommend</i>
              More Like This
            </h3>
            <Link
              to="/Movies"
              className="text-xs md:text-sm font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              Browse All <i className="material-icons text-sm">arrow_forward</i>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.title}
                to={`/Movies/${encodeURIComponent(rec.title)}`}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-neutral-800">
                  <img
                    src={rec.poster}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Movie_content/1299334.jpg';
                    }}
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-orange-400 truncate">
                    {rec.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                    <span className="text-orange-400 font-semibold">★ {rec.rating}</span>
                    <span>{rec.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movs;
