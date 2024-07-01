// import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";
// import axios from "axios";
// import './Output.css'
// import urlParser from "js-video-url-parser";

// export const Output = () => {
//   const [originalUrl, setUrl] = useState("");
//   const playerRef = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [videoId, setvideoId] = useState();
//   const [timeSlot, setTimeSlot] = useState({
//     startFrom: 0,
//     endsUpto: 0,
//     videoLength: 0,
//   });
//   const [shouldPlay, setShouldPlay] = useState(false); // New flag
//   var url_axios = "";

//   const handleLinkChange = (e) => {
//     //Set URL in text Field and get the youtube ID
//     setUrl(e.target.value);

//     const provider = urlParser.parse(e.target.value).provider;
//     const idVal = urlParser.parse(e.target.value).id;

//     if (provider === "youtube") {
//       url_axios = `https://record-timestamps.onrender.com/ytb/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "dailymotion") {
//       url_axios = `https://record-timestamps.onrender.com/dmr/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "vimeo") {
//       url_axios = `https://record-timestamps.onrender.com/vim/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "facebook") {
//       url_axios = `https://record-timestamps.onrender.com/fb/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "soundcloud") {
//       url_axios = `https://record-timestamps.onrender.com/sc/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "twitch") {
//       url_axios = `https://record-timestamps.onrender.com/twit/timeframes/${idVal}`;
//       setvideoId(idVal);
//     }
//     else {
//       setUrl("");
//       alert("Wrong Input");
//     }

//     var intervalId = null;
//     axios
//       .get(url_axios)
//       .then((res) => {
//         const times = res.data;
//         // console.log(times);
//         if (times.length === 0) {
//           alert("No data found");
//         } else {
//           var endTimes = []; // Declare endTimes here
//           var startTimes = [];
//           startTimes = times.map((entry) => entry.startFrom);
//           endTimes = times.map((entry) => entry.endsUpto); // Assign to endTimes here
//           startTimes = startTimes.sort((a, b) => a - b);
//           endTimes = endTimes.sort((a, b) => a - b);
//           console.log("Start Times:", startTimes);
//           console.log("End Times:", endTimes);
//           let index = 0;
//           intervalId = setInterval(() => {
//             const currentTime = playerRef.current.getCurrentTime();
//             if (currentTime >= endTimes[endTimes.length - 1]) {
//               clearInterval(intervalId);
//               return;
//             }

//             if (currentTime >= startTimes[index]) {
//               playerRef.current.seekTo(endTimes[index]);
//               if (typeof playerRef.current.playVideo === "function") {
//                 playerRef.current.playVideo();
//               }
//               index++;
//             }
//           }, 1000);
//         }
//         setTimeSlot({
//           ...timeSlot,
//           startTime: startTimes[0],
//           endTime: endTimes[endTimes.length - 1],
//           videoLength: Number(playerRef.current.getDuration().toFixed()),
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   function handlePlay() {
//     // setPlaying(true);
//     console.log(currentTime);
//     const videoLength = Number(playerRef.current.getDuration().toFixed());
//     const startFrom = Number(playerRef.current.getCurrentTime().toFixed());
//     setCurrentTime(startFrom);
//     setTimeSlot({ ...timeSlot, startFrom, videoLength });
//     // console.log("START TIME:  ", startFrom);
//     alert("Start Time: " + startFrom);
//   }

//   return (
//     <div>
//       <div class="aligncenter">
//         <input
//           type="text"
//           className="imgUrlText"
//           placeholder="Video Url"
//           name="url-test"
//           onChange={handleLinkChange}
//         />
//       </div>

//       <div className="player-wrapper">
//         <ReactPlayer
//           ref={playerRef}
//           url={originalUrl}
//           controls={true}
//           width="100%"
//           height="100%"
//           playing={true}
//         />
//       </div>

//       <div className="timeStamps" >
//         <button className="btn-primary" onClick={handlePlay}>
//           Search
//         </button>
//       </div>

//       </div>
//   );
// };
// export default Output


//

// import React, { useState, useRef, useEffect } from "react";
// import ReactPlayer from "react-player";
// import axios from "axios";
// import './Output.css'
// import urlParser from "js-video-url-parser";
// import Thumbnail from "./Thumbnail";

// export const Output = () => {
//   const [originalUrl, setUrl] = useState("");
//   const playerRef = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [videoId, setvideoId] = useState();
//   const [timeSlot, setTimeSlot] = useState({
//     startFrom: 0,
//     endsUpto: 0,
//     videoLength: 0,
//   });
//   const [shouldPlay, setShouldPlay] = useState(false); // New flag
//   var url_axios = "";
//   const [db, setDB]= useState([]);
//   const [pgNo, setPgNo]= useState(1);
//   // const [dbURLString, setDbURLString]= useState("");
//   // const pageLoad=
//   useEffect(()=>{
//     const dbURL='https://record-timestamps.onrender.com/ytb/timeframes';
//     axios.get(dbURL).then((res)=>{
//       console.log("-------------->",res.data.response,"-------------------");
//       let dbarr = res.data.response;
//        let dataDB= dbarr.map((obj)=>{
//         return obj.videoId;
//       });
//       dataDB= Array.from(new Set(dataDB));
//       setDB(dataDB);
//       // console.log("--------------------------->",dataDB);
//     })
//   },[]);

//   const handleLinkChange = (e) => {
//     setShouldPlay(false);
//     // Set URL in text Field and get the youtube ID
//     setUrl(e.target.value);
    
//     const provider = urlParser.parse(e.target.value).provider;
//     const idVal = urlParser.parse(e.target.value).id;
  
//     if (provider === "youtube") {
//       url_axios = `https://record-timestamps.onrender.com/ytb/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "dailymotion") {
//       url_axios = `https://record-timestamps.onrender.com/dmr/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "vimeo") {
//       url_axios = `https://record-timestamps.onrender.com/vim/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "facebook") {
//       url_axios = `https://record-timestamps.onrender.com/fb/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "soundcloud") {
//       url_axios = `https://record-timestamps.onrender.com/sc/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else if (provider === "twitch") {
//       url_axios = `https://record-timestamps.onrender.com/twit/timeframes/${idVal}`;
//       setvideoId(idVal);
//     } else {
//       setUrl("");
//       alert("Wrong Input");
//     }
  
//     var intervalId = null;
//     axios
//       .get(url_axios)
//       .then((res) => {
//         const times = res.data;
//         if (times.length === 0) {

//           // location.reload(); // Refresh the page  
//           setShouldPlay(false);
//           shouldPlay=false;
//           setUrl(null); // or setvideoId(null);
//           alert("No data found. The video is not playable.");
//           setShouldPlay(false);
//           setUrl(null); // or setUrl('') depending on your preference
//           // setvideoId(null); // Reset the video ID
//           // location.reload(); // Refresh the page   
//           return;
//         }
  
//         var endTimes = [];
//         var startTimes = [];
//         startTimes = times.map((entry) => entry.startFrom);
//         endTimes = times.map((entry) => entry.endsUpto);
//         startTimes = startTimes.sort((a, b) => a - b);
//         endTimes = endTimes.sort((a, b) => a - b);
//         console.log("Start Times:", startTimes);
//         console.log("End Times:", endTimes);
  
//         let index = 0;
//         intervalId = setInterval(() => {
//           const currentTime = playerRef.current.getCurrentTime();
//           if (currentTime >= endTimes[endTimes.length - 1]) {
//             clearInterval(intervalId);
//             return;
//           }
  
//           if (currentTime >= startTimes[index]) {
//             playerRef.current.seekTo(endTimes[index]);
//             setShouldPlay(true);
//             console.log("AAA",playerRef.current.play);
//             if (typeof playerRef.current.playVideo === "function") {
//               playerRef.current.playVideo();
//             }
//             index++;
//           }
//         }, 1000);
//       })
//       .catch((err) => {
//         setShouldPlay(false);
//         console.error(err);
//         alert("This is not reported and this might unsafe to watch it. We request you to report it if found any unsafe content.");
//       });
//   };
  

//   const handlePlay = () => {
//     const currentRef = playerRef.current;
  
//     if (currentRef && typeof currentRef.getDuration === 'function' && typeof currentRef.getCurrentTime === 'function') {
//       const videoLength = Number(currentRef.getDuration().toFixed());
//       const startFrom = Number(currentRef.getCurrentTime().toFixed());
//       setCurrentTime(startFrom);
//       setTimeSlot({ ...timeSlot, startFrom, videoLength });
//       setShouldPlay(true); // Set shouldPlay to true to trigger video playback
//       setUrl(originalUrl); // Set the originalUrl state with the video URl
//     } else {
//       console.error("Player reference or required methods are null or not functions.");
//     }
//   };

//   const handleHomeClick=(id)=>{

//     setShouldPlay(false);
//     // Set URL in text Field and get the youtube ID
//     setUrl(`https://www.youtube.com/watch?v=${id}`);
    
//       url_axios = `https://record-timestamps.onrender.com/ytb/timeframes/${id}`;
  
//     var intervalId = null;
//     axios
//       .get(url_axios)
//       .then((res) => {
//         const times = res.data;
//         if (times.length === 0) {
//           setShouldPlay(false);
//           shouldPlay=false;
//           setUrl(null); // or setvideoId(null);
//           alert("No data found. The video is not playable.");
//           setShouldPlay(false);
//           setUrl(null);  
//           return;
//         }
  
//         var endTimes = [];
//         var startTimes = [];
//         startTimes = times.map((entry) => entry.startFrom);
//         endTimes = times.map((entry) => entry.endsUpto);
//         startTimes = startTimes.sort((a, b) => a - b);
//         endTimes = endTimes.sort((a, b) => a - b);
//         console.log("Start Times:", startTimes);
//         console.log("End Times:", endTimes);
  
//         let index = 0;
//         intervalId = setInterval(() => {
//           const currentTime = playerRef.current.getCurrentTime();
//           if (currentTime >= endTimes[endTimes.length - 1]) {
//             clearInterval(intervalId);
//             return;
//           }
  
//           if (currentTime >= startTimes[index]) {
//             playerRef.current.seekTo(endTimes[index]);
//   //           setShouldPlay(true);

//   //           var promise = document.querySelector('video').play();
//   // if (promise !== undefined) {
//   //   promise.then(_ => {
//   //     // Autoplay started!
//   //   }).catch(error => {
//   //     console.log(error, '--------just now');
//   //     // Autoplay was prevented.
//   //     // Show a "Play" button so that user can start playback.
//   //   });
//   // }


//             console.log("AAA",playerRef);
//             if (typeof playerRef.current.playVideo === "function") {
//               playerRef.current.playVideo();
//             }
//             index++;
//           }
//         }, 1000);
//       })
//       .catch((err) => {
//         setShouldPlay(false);
//         console.error(err); 
//         alert("This is not reported and this might unsafe to watch it. We request you to report it if found any unsafe content.");
//       });


//   }

//   const dbs = db.slice((pgNo-1)*12,(pgNo*12));
  
  
//   return (
//     <div>
//       <h5>Explore our filtered and safe database</h5>
//       <div className="aligncenter d-flex">
//         <input
//           type="text"
//           className="imgUrlText border-round"
//           placeholder="Enter URL of youtube video you want to search"
//           name="url-test"
//           onChange={handleLinkChange}
//         />
//               <div className="timeStamps" >
//         <button className="btn-primary" onClick={handlePlay}>
//           PLAY
//         </button>
//       </div>
//       </div>

//       {originalUrl===""?<div className="d-none"></div>:<div className="player-wrapper">
//       <ReactPlayer
//           className = 'video'
//           onPause={()=>{
//             setShouldPlay(true);
//           }}
//           ref={playerRef}
//           url={originalUrl}
//           controls={true}
//           width="100%"
//           height="100%"
//           playing={shouldPlay}
//         />
//       </div>}


//       <div className="data-list">
//         {/* {console.log(db,"----------------------------")} */}
//         {dbs.map((id)=>{
//           // console.log(id);
//           return <div className="DB-item" onClick={()=>{handleHomeClick(id);window.scrollTo(0,0)}}>
//             <Thumbnail vidId={id}/>
//           </div>
//         })}
//       </div>
//       <div className="pg-buttons">
//         <button className="pg-btn" onClick={()=>{
//           pgNo===1?setPgNo(1):setPgNo(pgNo-1);
//           }}>
//           -
//         </button>
//         <span>{pgNo}</span>
//         <button className="pg-btn" onClick={()=>{
//           setPgNo(pgNo+1);
//         }}>
//           +
//         </button>

//       </div>

//       </div>
//   );
// };
// export default Output






// update of 7th May 2024 
//updates include:

// 1. When a specific timestamp is marked as unsafe, attempting to navigate to that timestamp using the cursor will now automatically redirect the user to the next safe section. This enhancement ensures that unsafe content remains inaccessible, which was not addressed in the previous version.

// 2. The updated functionality prevents users from rewinding or forwarding into an unsafe section. Any attempt to do so will now lead the user directly to the subsequent safe section, reinforcing content safety.

// 3. The previous version had a bug where restarting the video without refreshing the browser would result in the disappearance of the marked unsafe sections. This issue has now been resolved, ensuring consistent enforcement of unsafe content restrictions upon video restart.


import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import './Output.css'
import urlParser from "js-video-url-parser";
import Thumbnail from "./Thumbnail";

export const Output = () => {
  const [originalUrl, setUrl] = useState("");
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [db, setDB] = useState([]);
  const [pgNo, setPgNo] = useState(1);

  // useEffect(() => {
  //   const dbURL = 'https://record-timestamps.onrender.com/ytb/timeframes';
  //   axios.get(dbURL).then((res) => {
  //     const dbArr = res.data.response;
  //     const dataDB = Array.from(new Set(dbArr.map(obj => obj.videoId)));
  //     setDB(dataDB);
  //   });
  // }, []);
  useEffect(() => {
    const dbURL = 'https://record-timestamps.onrender.com/ytb/timeframes';
    axios.get(dbURL)
      .then((res) => {
        const dbArr = res.data.response;
        const reversedDB = dbArr.reverse(); // Reverse the array
        const dataDB = Array.from(new Set(reversedDB.map(obj => obj.videoId)));
        setDB(dataDB);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching database.");
      });
  }, []); 

  const handleLinkChange = (e) => {
    setShouldPlay(false);
    setUrl(e.target.value);
    const parsedUrl = urlParser.parse(e.target.value);
    if (!parsedUrl) {
      setUrl("");
      alert("Invalid URL");
      return;
    }
    
    const { provider, id } = parsedUrl;
    if (!id) {
      setUrl("");
      alert("Invalid URL");
      return;
    }
    
    const endpoints = {
      youtube: 'ytb',
      dailymotion: 'dmr',
      vimeo: 'vim',
      facebook: 'fb',
      soundcloud: 'sc',
      twitch: 'twit'
    };

    if (!endpoints[provider]) {
      setUrl("");
      alert("Unsupported provider");
      return;
    }

    const url_axios = `https://record-timestamps.onrender.com/${endpoints[provider]}/timeframes/${id}`;
    setVideoId(id);

    axios.get(url_axios)
      .then((res) => {
        const times = res.data;
        if (times.length === 0) {
          setShouldPlay(false);
          setUrl("");
          alert("No data found. The video is not playable.");
          return;
        }

        const sortedTimes = times.sort((a, b) => a.startFrom - b.startFrom);
        setTimeSlots(sortedTimes);
        setShouldPlay(true);
      })
      .catch((err) => {
        setShouldPlay(false);
        console.error(err);
        alert("Error fetching data. The video might be unsafe to watch.");
      });
  };

  const handlePlay = () => {
    const currentRef = playerRef.current;
    if (currentRef && typeof currentRef.getDuration === 'function' && typeof currentRef.getCurrentTime === 'function') {
      setShouldPlay(true);
    } else {
      console.error("Player reference or required methods are null or not functions.");
    }
  };

  const handleHomeClick = (id) => {
    setUrl(`https://www.youtube.com/watch?v=${id}`);
    const url_axios = `https://record-timestamps.onrender.com/ytb/timeframes/${id}`;
    setVideoId(id);

    axios.get(url_axios)
      .then((res) => {
        const times = res.data;
        if (times.length === 0) {
          setShouldPlay(false);
          setUrl("");
          alert("No data found. The video is not playable.");
          return;
        }

        const sortedTimes = times.sort((a, b) => a.startFrom - b.startFrom);
        setTimeSlots(sortedTimes);
        setShouldPlay(true);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setShouldPlay(false);
        console.error(err);
        alert("Error fetching data. The video might be unsafe to watch.");
      });
  };

  const dbs = db.slice((pgNo - 1) * 12, pgNo * 12);

  useEffect(() => {
    let intervalId;
    if (shouldPlay && playerRef.current) {
      intervalId = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        const currentSlot = timeSlots.find(slot => currentTime >= slot.startFrom && currentTime < slot.endsUpto);
        if (currentSlot) {
          playerRef.current.seekTo(currentSlot.endsUpto);
        }
      }, 500); // Check every 500ms
    }

    return () => clearInterval(intervalId);
  }, [shouldPlay, timeSlots]);

  return (
    
    <section id="result">
      <h5>Explore our filtered and safe database</h5>
      <div className="aligncenter d-flex">
        <input
          type="text"
          className="imgUrlText border-round"
          placeholder="Enter URL of YouTube video you want to search"
          onChange={handleLinkChange}
        />
        <div className="timeStamps">
          <button className="btn-primary" onClick={handlePlay}>
            PLAY
          </button>
        </div>
      </div>

      {originalUrl && (
        <div className="player-wrapper">
          <ReactPlayer
            className='video'
            ref={playerRef}
            url={originalUrl}
            controls={true}
            width="100%"
            height="100%"
            playing={shouldPlay}
          />
        </div>
      )}

      <div className="data-list">
        {dbs.map((id) => (
          <div className="DB-item" key={id} onClick={() => handleHomeClick(id)}>
            <Thumbnail vidId={id} />
          </div>
        ))}
      </div>
      <div className="pg-buttons">
        <button className="pg-btn" onClick={() => setPgNo(pgNo === 1 ? 1 : pgNo - 1)}>
          -
        </button>
        <span>{pgNo}</span>
        <button className="pg-btn" onClick={() => setPgNo(pgNo + 1)}>
          +
        </button>
      </div>
    </section>
  );
};

export default Output;
