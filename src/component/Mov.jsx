// import { useEffect,useRef} from 'react'
// import Styles from '../Pages_css/Mov.module.css'
// const Mov = () => {
//   const videoRef = useRef(null);
//   useEffect(() => {
//     const start_time = 5000;
//     const end_time = 3000;
//     const video = videoRef.current
//     const play_time_out = setTimeout(() =>{
//       if(video)
//       {
//       video.play}
//       else
//       {
//         console.log('Video not found')
//       }
//     },start_time);
//     const stop_time_out = setTimeout(() =>{
//       if(video)
//       {
//       video.pause}
//     else
//     {
//       console.log("Video not found");
      
//     }
//     },start_time);
//     return () => {
//       clearTimeout(play_time_out);
//       clearTimeout(stop_time_out);
//     }
//   }, [])  
//   return (
//     <div className={Styles.Mov}>
// <video ref={videoRef} className={Styles.video} muted autoPlay>
// <source src='/public/5538137-hd_1920_1080_25fps.mp4' type="video/mp4">
// </source>
// </video>
// </div>
//   )
// }

// export default Mov

// import { useEffect, useRef , useState} from "react";
// import Styles from "../Pages_css/Mov.module.css";

// const Mov = () => {
//   const videoRef = useRef(null);
//   const [play, setPlay] = useState(false);

//   useEffect(() => {
//     const start_time = 10000;

//     const playTimeout = setTimeout(() => {
//       setPlay(true);
//     }, start_time);
//     return () => {
//       clearTimeout(playTimeout);
      
//     };
//   }, []);

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       setVideoDuration(videoRef.current.duration);
      
//       // Stop video after (duration + 5s)
//       setTimeout(() => {
//         setPlay(false);
//       }, videoRef.current.duration+ 5000);
//     }
//   };

//   return (
//     <>
//     { play? (<>
//     <div className={Styles.Mov}>
//       <video ref={videoRef} className={Styles.video} muted autoPlay>
//         <source src="/5538137-hd_1920_1080_25fps.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//     </>) :(<>
//       <>
//       <div className={Styles.Mov}>Mov</div>
//       </>
//     </>)
//     }
//     </>
//   );
// };

import { useEffect, useRef, useState } from "react";
import Styles from "../Pages_css/Mov.module.css";

const Mov = () => {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const start_time = 10000; // Start after 10 seconds

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
      setVideoDuration(videoRef.current.duration);
      
      // Stop video after (duration + 5s)
      setTimeout(() => {
        setPlay(false);
      }, videoRef.current.duration * 1000 + 5000);
    }
  };

  return (
    <>
      {play ? (
        <div className={Styles.Mov}>
          <video
            ref={videoRef}
            className={Styles.video}
            muted
            autoPlay
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src="videoplayback.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className={Styles.Mov}>Mov</div>
      )}
    </>
  );
};

export default Mov;
