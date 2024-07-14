import React from 'react'
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

    </div>
  )
}

export default Thumbnail