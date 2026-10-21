import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
         <nav>
    <div className="nav-content">
            <div className="logo">Logo</div>
         <div className="content_box"><Link to="/" className='Link'>Home</Link></div>
            <div className="content_box" id="Browse">Browse<i className="material-icons">arrow_drop_down</i></div>
            <div className="content_box"><Link to="/Movies" className='Link'>Movies</Link></div>
            <div className="content_box"><Link to="/Pricing" className='Link'>Pricing</Link></div>
            <div className="Search">
                <div className="Finder"><i className="material-icons">search</i></div>
                <input type="text" placeholder="Search" ></input>
            </div>
            <div className="Account_Details"><div className="Account_Logo"><i className="material-icons">person</i></div>
             <div className="Account_details_box"><Link to="/Login" className='Link'><span>Account</span> <span id="Signin">Signin</span></Link></div>
            </div>
        </div>

    </nav>
    </>
    
  )
}

export default Navbar