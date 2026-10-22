import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Pages_css/Home.css';
import 'material-icons/iconfont/material-icons.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Crousal from '../component/Crousal';
import movies from '../assets/Movies_info/Movies_info.json';
import defaultPickups from '../assets/Movies_info/Movie_pickup.json';
import Movies from '../component/Movies';
import axios from 'axios';

const Home = () => {
  const [movie_pickups, SetMovie_pickups] = useState(defaultPickups);
  const [heroMovies, setHeroMovies] = useState(movies);

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      // 1. Fetch pickups API
      try {
        const pResponse = await axios.get(`https://cv-backend-theta.vercel.app/use/movie_pickup/insert`, { timeout: 4000 });
        if (pResponse.data && Array.isArray(pResponse.data) && pResponse.data.length > 0 && isMounted) {
          SetMovie_pickups(pResponse.data);
        }
      } catch (e) {
        console.warn('Backend pickups notice, using static fallback:', e.message);
      }

      // 2. Fetch main movie insert API
      try {
        const mResponse = await axios.get(`https://cv-backend-theta.vercel.app/use/insert`, { timeout: 4000 });
        if (mResponse.data && Array.isArray(mResponse.data) && mResponse.data.length > 0 && isMounted) {
          const formatted = mResponse.data.map((item) => ({
            Movie: item.Movie || item.title,
            Poster: item.Poster || item.Image || '/Movie_content/1299334.jpg',
            Description: item.Description || 'Stream now in 4K Ultra HD on Ami Watch.',
            Genres: Array.isArray(item.Genres) ? item.Genres : typeof item.Genres === 'string' ? item.Genres.split(',').map(s=>s.trim()) : ['Featured'],
          }));
          setHeroMovies(formatted);
        }
      } catch (e) {
        console.warn('Backend main catalog notice, using static fallback:', e.message);
      }
    };

    fetchAllData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="home_page_frame" id="main_page">
        <div className="Upper_frame">
          <div className="Crousal_section">
            <div className="swiper-container first_swiper-container">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: true }}
              >
                <div className="swiper-wrapper Copy_Swiper">
                  {heroMovies.map((movie, index) => (
                    <SwiperSlide key={`${movie.Movie || index}-${index}`}>
                      <Crousal
                        image={movie.Poster}
                        ele={movie.Movie}
                        Description={movie.Description}
                        genre={movie.Genres}
                        name={movie.Movie}
                      />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>

        {/* Top Picks Row */}
        <div className="Lower_frame_Top_Pickups">
          <div className="flex items-center justify-between mb-2">
            <div className="Title_pickup">
              Top picks for you <i className="material-icons right_arrow">arrow_right_alt</i>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="pickup-prev p-2 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-neutral-300 transition-all cursor-pointer flex items-center justify-center border border-white/10 shadow-lg"
                title="Previous movies"
                aria-label="Previous movies"
              >
                <i className="material-icons text-xl leading-none">chevron_left</i>
              </button>
              <button
                type="button"
                className="pickup-next p-2 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-neutral-300 transition-all cursor-pointer flex items-center justify-center border border-white/10 shadow-lg"
                title="Next movies"
                aria-label="Next movies"
              >
                <i className="material-icons text-xl leading-none">chevron_right</i>
              </button>
            </div>
          </div>

          <div className="Movie_list">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: '.pickup-prev',
                nextEl: '.pickup-next',
              }}
              grabCursor={true}
              simulateTouch={true}
              touchRatio={1.3}
              resistance={true}
              resistanceRatio={0.85}
              loop={true}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                320: { slidesPerView: 1.8, spaceBetween: 14 },
                480: { slidesPerView: 2.3, spaceBetween: 16 },
                640: { slidesPerView: 3.2, spaceBetween: 18 },
                768: { slidesPerView: 4.2, spaceBetween: 20 },
                1024: { slidesPerView: 5.2, spaceBetween: 22 },
                1280: { slidesPerView: 6, spaceBetween: 24 },
              }}
              className="second_swiper"
            >
              {(movie_pickups.length > 0 && movie_pickups.length <= 8
                ? [...movie_pickups, ...movie_pickups]
                : movie_pickups
              ).map((movie, index) => (
                <SwiperSlide key={`${movie.Movie_title || index}-${index}`} className="second_swiper-slide">
                  <Movies
                    className="second-swiper-movies"
                    image={movie.Movie_poster}
                    features={movie.Movie_feature}
                    title={movie.Movie_title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Curated Categories Section */}
        <div className="Categories px-4 md:px-12 py-16 max-w-7xl mx-auto w-full">
          {/* Shelf 1: Anime & Fantasy Masterpieces */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Anime & Fantasy <span className="text-orange-500">Masterpieces</span>
                </h2>
                <p className="text-neutral-400 text-xs md:text-sm mt-1">
                  Acclaimed storytelling, breathtaking animation, and emotional journeys.
                </p>
              </div>
              <Link
                to="/Movies"
                className="text-orange-400 hover:text-orange-300 text-xs md:text-sm font-semibold flex items-center gap-1"
              >
                View All <i className="material-icons text-sm">arrow_forward</i>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {heroMovies.map((m) => (
                <Link
                  key={m.Movie}
                  to={`/Movies/${encodeURIComponent(m.Movie)}`}
                  className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-800">
                    <img
                      src={m.Poster}
                      alt={m.Movie}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/Movie_content/1299334.jpg';
                      }}
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors truncate">
                      {m.Movie}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                      {Array.isArray(m.Genres) ? m.Genres.join(' • ') : m.Genres}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Streaming CTA Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-r from-orange-600/30 via-neutral-900 to-black border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
                Unlimited Entertainment
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
                Ready to stream in 4K Ultra HD?
              </h3>
              <p className="text-neutral-300 text-sm mt-2">
                Join thousands of members enjoying unlimited HD streaming across all devices. Cancel anytime.
              </p>
            </div>
            <Link
              to="/Pricing"
              className="px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 transition-all hover:scale-105 flex-shrink-0"
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;