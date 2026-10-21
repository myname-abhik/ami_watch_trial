import React from 'react'
import { Link } from "react-router-dom";

const Movies = ({image,title,features}) => {
  return (
    <div className='second_swiper-slide'>
      <div className="Movies_Second">
        <div className="Movie_image"><img src={image} alt={title || "Movie poster"} /></div>
        <div className="Movie_info">
          <div className="Movie_name"><Link to={`/Movies/${title}`} className='Link'>{title}</Link></div>
          <div className="Features">{features}</div>
        </div>
      </div>
    </div>
  );
}

export default Movies