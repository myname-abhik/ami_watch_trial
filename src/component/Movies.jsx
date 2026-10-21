import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

const Movies = ({image,title,features}) => {
  return <>
  
  <div className='second_swiper-slide'>
    <div class="Movies_Second">
  <div class="Movie_image"><img src={image}/></div>
  <div class="Movie_info">
  <div className="Movie_name" c ><Link to={`/Movies/${title}`} className='Link'>{title}</Link></div>
    <div class="Features">{features}</div>
  </div>
</div>
</div>
  </>
}

export default Movies