import React from 'react'
import '../Pages_css/Home.css'
import { Link } from "react-router-dom";
const Crousal = ({ image, ele, Description , genre,name}) => {
    return (
      <>
        <div className="swiper-slide">
          <img src={image}/>
        <div className="crousal-content">
          <div className="Movies">
            <p>{ele}</p>
          </div>
          <div className="Features">
            <div className="Line"></div>
            <div className="Genre">{genre}</div>
              
          
          </div>
          <div className="Description">
            {Description}
          </div>
          <div className="Description">
            <div className="Play">
              <Link to={`/Video/${name}`} className='Link'>
              <div className="Child_play">
                <i className="material-icons Child_arrow">play_arrow</i> Play Now
              </div>
              </Link>
              
            </div>
            <div className="Add-to-list">Add to List</div>
          </div>
        </div>
        <div className="Down-shadow"></div>
        </div>
      </>
    );
  };
  
  export default Crousal;
  