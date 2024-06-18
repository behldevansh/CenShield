import React from 'react'
import img from './OIP.jpg'
import './Thumbnail.css'

const Thumbnail = (props) => {
    const vidId= props.vidId;
    const thumbnailURL= `https://img.youtube.com/vi/${props.vidId}/default.jpg`
    // console.log('videoId= ', vidId);

  return (
    <div className='thumbnail'>
        <div className='video-thumbnail'>
            <img src={thumbnailURL} className='thumb-image'/>
        </div>
        {/* <div className='thumbnail-title'>
            {props.url}
        </div> */}
    </div>
  )
}

export default Thumbnail