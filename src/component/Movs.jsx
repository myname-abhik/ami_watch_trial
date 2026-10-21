import React from 'react'
import { useEffect ,useState, useRef} from 'react'
import Detailed_description from './Detailed_description'
import Dropdown_shadow from './Dropdown_shadow'
import  Styles  from '../Pages_css/Movs.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Movs = () => {
    const [data, SetData] = useState(null);
    const [loading, SetLoading] = useState(true);
    const id =  useParams();
    useEffect(() => {
      const fetchData = async() =>{
        try{
         
          const response = await axios.get(`https://cv-backend-theta.vercel.app/use/insert/${id.id}`)
          SetData(response.data)
          // console.log(response.data);
          // console.log(response.data);
          
          
        }catch(e){
          console.log(e);
          
        }
        finally{
          SetLoading(false)
        }
      }
      if(id){
      fetchData()
      }
      
    },[])
 const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

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
      setVideoDuration(videoRef.current.duration);
      
      // Stop video after (duration + 5s)
      setTimeout(() => {
        setPlay(false);
      }, videoRef.current.duration *1000+1000);
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
