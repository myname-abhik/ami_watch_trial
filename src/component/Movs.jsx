import React, { useEffect, useState, useRef } from 'react'
import Detailed_description from './Detailed_description'
import Dropdown_shadow from './Dropdown_shadow'
import Styles from '../Pages_css/Movs.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import moviesInfo from '../assets/Movies_info/Movies_info.json'
import moviePickups from '../assets/Movies_info/Movie_pickup.json'

const Movs = () => {
    const [data, SetData] = useState(null);
    const [loading, SetLoading] = useState(true);
    const { id } = useParams();
    const videoRef = useRef(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://cv-backend-theta.vercel.app/use/insert/${id}`, { timeout: 3000 });
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            SetData(response.data);
            SetLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Backend unavailable, using fallback data:', e.message);
        }

        const movieTitle = decodeURIComponent(id || '');
        const foundInfo = moviesInfo.find(m => m.Movie.toLowerCase() === movieTitle.toLowerCase());
        const foundPickup = moviePickups.find(m => m.Movie_title.toLowerCase() === movieTitle.toLowerCase());

        const fallbackItem = {
          Movie: movieTitle,
          Year: "2023",
          Age: "13+",
          Language: "English / Japanese",
          Image: foundInfo?.Poster || foundPickup?.Movie_poster || "/Movie_content/1299334.jpg",
          Dir: "Featured Director",
          Cast: "Leading Cast Ensemble",
          Description: foundInfo?.Description || "An unforgettable cinematic journey filled with drama, emotion, and spectacular visuals.",
          Rating: "8.4/10",
          Poster: foundInfo?.Poster || foundPickup?.Movie_poster || "/Movie_content/1299334.jpg",
          Video: "https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4"
        };
        SetData([fallbackItem]);
        SetLoading(false);
      };

      if (id) {
        fetchData();
      }
    }, [id]);

    useEffect(() => {
      const start_time = 5000; 

      const playTimeout = setTimeout(() => {
        setPlay(true);
      }, start_time);

      return () => {
        clearTimeout(playTimeout);
      };
    }, []);

    // Get video duration when metadata is loaded
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setTimeout(() => {
          setPlay(false);
        }, (videoRef.current.duration || 5) * 1000 + 1000);
      }
    };

  return (
    <>
        <div className={Styles.Main_containerr}>
            <div className={Styles.Parent_content}>
{
  loading? (<>
    <div className={Styles.loader}><div></div></div>
    </>
    
  ) : (
    <>
     {play ? (
            <div className={Styles.image}>
              <video
                ref={videoRef}
                className={Styles.video}
                autoPlay
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src={data[0].Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img src={data[0].Poster} alt="image" className={Styles.image}/>
          )}
      
      <Detailed_description val={data}/>
      <Dropdown_shadow/>
    </>
  )
 
}
                
                <Dropdown_shadow/>

            </div>
        </div>
    </>
  )
}

export default Movs
