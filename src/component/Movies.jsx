import React from 'react';
import { Link } from "react-router-dom";

const Movies = ({ image, title, features }) => {
  return (
    <div className="Movies_Second">
      <div className="Movie_image">
        <img
          src={image}
          alt={title || "Movie poster"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/Movie_content/1299334.jpg';
          }}
        />
      </div>
      <div className="Movie_info">
        <div className="Movie_name">
          <Link to={`/Movies/${encodeURIComponent(title || '')}`} className="Link">
            {title}
          </Link>
        </div>
        <div className="Features">{features}</div>
      </div>
    </div>
  );
};

export default Movies;