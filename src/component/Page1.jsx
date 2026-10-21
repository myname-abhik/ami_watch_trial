import React from "react";
import Styles from "../Pages_css/Page.module.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useParams, Link } from 'react-router-dom';
import moviesInfo from '../assets/Movies_info/Movies_info.json';
import moviePickups from '../assets/Movies_info/Movie_pickup.json';

const Page1 = () => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { id } = useParams();
  const movieTitle = decodeURIComponent(id || 'Featured Stream');

  // Related recommendations
  const relatedMovies = React.useMemo(() => {
    const list = [...moviesInfo.map((m) => ({ title: m.Movie, poster: m.Poster })),
                  ...moviePickups.map((m) => ({ title: m.Movie_title, poster: m.Movie_poster }))];
    return list.filter((m) => m.title.toLowerCase() !== movieTitle.toLowerCase()).slice(0, 4);
  }, [movieTitle]);

  React.useEffect(() => {
    if (!videoRef.current) return;

    const videoLink = `https://final-ffmpeg.vercel.app/hls/${id}/index.m3u8`;
    const fallbackLink = "https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4";

    const options = {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: true,
      sources: [
        {
          src: videoLink,
          type: "application/x-mpegURL",
        },
        {
          src: fallbackLink,
          type: "video/mp4",
        },
      ],
    };

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered");
    videoRef.current.appendChild(videoElement);

    const player = (playerRef.current = videojs(videoElement, options, () => {
      videojs.log("player is ready");
      player.autoplay(true);
    }));

    player.on("error", () => {
      const currentSrc = player.src();
      if (currentSrc !== fallbackLink) {
        player.src({ src: fallbackLink, type: "video/mp4" });
        player.play().catch(() => {});
      }
    });

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [id]);

  return (
    <div className={Styles.Video}>
      {/* Top Header Bar */}
      <div className="w-[90%] max-w-[1100px] mb-4 flex items-center justify-between text-white">
        <Link
          to={`/Movies/${encodeURIComponent(movieTitle)}`}
          className="flex items-center gap-1.5 text-xs md:text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <i className="material-icons text-base">arrow_back</i>
          <span>Back to details</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded font-bold">
            1080p Full HD
          </span>
          <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
            Dolby 5.1
          </span>
        </div>
      </div>

      {/* Main Video Frame */}
      <div className={Styles.Player}>
        <div data-vjs-player>
          <div ref={videoRef} className={Styles.Child_Player} />
        </div>
      </div>

      {/* Video Info Card */}
      <div className="w-[90%] max-w-[1100px] mt-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 text-white backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black">{movieTitle}</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Now streaming on Ami Watch &bull; Subtitled & Dubbed &bull; Ultra Low Latency
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/Movies"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Browse Library
            </Link>
            <Link
              to="/Pricing"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-xs font-semibold rounded-xl transition-colors text-white shadow-lg shadow-orange-500/20"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Up Next Row */}
      <div className="w-[90%] max-w-[1100px] mt-8 text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="material-icons text-orange-500">playlist_play</i> Up Next
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedMovies.map((m) => (
            <Link
              key={m.title}
              to={`/Video/${encodeURIComponent(m.title)}`}
              className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all p-2 flex flex-col gap-2"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-800">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-semibold text-neutral-200 group-hover:text-orange-400 truncate">
                {m.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page1;
