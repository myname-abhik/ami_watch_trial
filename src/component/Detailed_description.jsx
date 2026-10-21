import React from 'react'
import  Styles  from '../Pages_css/Movs.module.css'
import 'material-icons/iconfont/material-icons.css';
import { Link } from "react-router-dom";

const Detailed_description = ({val}) => {
console.log(val[0].Movie)
  
  return (
    <>
        <div className={Styles.Detailed_desc}>
                    <div className={Styles.Title}>{val[0].Movie}</div>
                    <div className={Styles.Genre}>{val[0].Year} | {val[0].Age} |Language : {val[0].Language}</div>
                    <div className={Styles.Desc}>
                        <img src={val[0].Image}className={Styles.image_2}/>
                        <div className={Styles.Dir_cast_desc_button}>
                           
                            <div className={Styles.Dir_name}>Dir. {val[0].Dir}</div>
                            <div className={Styles.Cast_name}>Cast : {val[0].Cast}</div>
                            <div className={Styles.Movie_desc}>Description : {val[0].Description}</div>
                            <div className={Styles.buttons}>



                                <div className={Styles.Play_now}><i className={`material-icons right_arrow ${Styles.meterial}`} >play_arrow</i><Link to={`/Video/${val[0].Movie}`} className='Link'>Play now</Link></div>
                               
                                <div className={Styles.Watch_later}>Watch Trailer</div>
                            </div>
                        </div>
                        <div className={Styles.Imdb_rating}>{val[0].Rating}</div>
                    </div>
                </div>
    </>
  )
}

export default Detailed_description