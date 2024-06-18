import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
// import getVideoId from "get-video-id";
import urlParser from "js-video-url-parser";
import "./Home.css";
import im1 from "./image-1.png";
import im2 from "./image-2.png";
import im3 from "./image-3.jpeg";
import im4 from "./app-support.png"
// Import the FontAwesomeIcon component
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export const Home = () => {
  const [originalUrl, setUrl] = useState("");
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoId, setvideoId] = useState();
  const [timeSlot, setTimeSlot] = useState({
    startFrom: 0,
    endsUpto: 0,
    videoLength: 0,
  });
  var url_axios = "";

  const handleLinkChange = (e) => {
    //Set URL in text Field and get the youtube ID
    setUrl(e.target.value);
    // console.log(e.target.value);
    // setYoutubeId(getVideoId(e.target.value).id);
    // const idVal = getVideoId(e.target.value).id;
    // const { service } = getVideoId(e.target.value);
    const provider = urlParser.parse(e.target.value).provider;
    const idVal = urlParser.parse(e.target.value).id;
    // console.log(idVal, service);
    // console.log(typeof(service));
    // console.log(service);
    // console.log("Provider: " + provider);
    // console.log("ID: " + provID);

    if (provider === "youtube") {
      url_axios = `https://record-timestamps.onrender.com/ytb/timeframes/${idVal}`;
      setvideoId(idVal);
    } else if (provider === "dailymotion") {
      url_axios = `https://record-timestamps.onrender.com/dmr/timeframes/${idVal}`;
      setvideoId(idVal);
    } else if (provider === "vimeo") {
      url_axios = `https://record-timestamps.onrender.com/vim/timeframes/${idVal}`;
      setvideoId(idVal);
    } else if (provider === "facebook") {
      url_axios = `https://record-timestamps.onrender.com/fb/timeframes/${idVal}`;
      setvideoId(idVal);
    } else if (provider === "soundcloud") {
      url_axios = `https://record-timestamps.onrender.com/sc/timeframes/${idVal}`;
      setvideoId(idVal);
    } else if (provider === "twitch") {
      url_axios = `https://record-timestamps.onrender.com/twit/timeframes/${idVal}`;
      setvideoId(idVal);
    }
    else {
      setUrl("");
      alert("Wrong Input");
    }

    var intervalId = null;
    axios
      .get(url_axios)
      .then((res) => {
        const times = res.data;
        // console.log(times);
        if (times.length === 0) {
          alert("No data found");
        } else {
          var endTimes = []; // Declare endTimes here
          var startTimes = [];
          startTimes = times.map((entry) => entry.startFrom);
          endTimes = times.map((entry) => entry.endsUpto); // Assign to endTimes here
          startTimes = startTimes.sort((a, b) => a - b);
          endTimes = endTimes.sort((a, b) => a - b);
          console.log("Start Times:", startTimes);
          console.log("End Times:", endTimes);
        }
        setTimeSlot({
          ...timeSlot,
          startTime: startTimes[0],
          endTime: endTimes[endTimes.length - 1],
          videoLength: Number(playerRef.current.getDuration().toFixed()),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handlePlay() {
    // setPlaying(true);
    console.log(currentTime);
    const videoLength = Number(playerRef.current.getDuration().toFixed());
    const startFrom = Number(playerRef.current.getCurrentTime().toFixed());
    setCurrentTime(startFrom);
    setTimeSlot({ ...timeSlot, startFrom, videoLength });
    // console.log("START TIME:  ", startFrom);
    alert("Start Time: " + startFrom);
  }

  function handlePause() {
    // setPlaying(false);
    // console.log(currentTime);
    var endsUpto = Number(playerRef.current.getCurrentTime().toFixed());
    setCurrentTime(endsUpto);
    setTimeSlot({ ...timeSlot, endsUpto });
    alert("End Time: " + endsUpto);
    // console.log("END TIME:  ", endsUpto);
    // console.log(currentTime);
  }

  const dataInput = () => {
    const provider = urlParser.parse(originalUrl).provider;
    if (
      timeSlot.startFrom > timeSlot.endsUpto ||
      timeSlot.endsUpto < timeSlot.startFrom
    ) {
      alert("Time is not correctly");
      setUrl("");
      document.getElementsByName("url-test").setAttribute("value", "");
    } else {
      if (provider === "youtube") {
        const data = { ...timeSlot, videoId, originalUrl };
        // console.log(data)

        if (data.videoId.length === 11) {
          axios
            .post(
              "https://record-timestamps.onrender.com/ytb/inserttimeframes",
              data
            )
            .then((res) => {
              alert(res.data.message);
            });
        } else {
          alert("Invalid Input");
        }
      } else if (provider === "dailymotion") {
        const data = { ...timeSlot, videoId, originalUrl };
        // console.log(data)

        if (data.videoId.length === 7) {
          axios
            .post(
              "https://record-timestamps.onrender.com/dmr/inserttimeframes",
              data
            )
            .then((res) => {
              alert(res.data.message);
            });
        } else {
          alert("Invalid Input");
        }
      } else if (provider === "vimeo") {
        const data = { ...timeSlot, videoId, originalUrl };
        // console.log(data)

        if (data.videoId.length === 9) {
          axios
            .post(
              "https://record-timestamps.onrender.com/vim/inserttimeframes",
              data
            )
            .then((res) => {
              alert(res.data.message);
            });
        } else {
          alert("Invalid Input");
        }
      // } else if (provider === "twitch") {
      //   const data = { ...timeSlot, videoId, originalUrl };
      //   // console.log(data)

      //   if (data.videoId.length === 11) {
      //     axios
      //       .post(
      //         "https://record-timestamps.onrender.com/dmr/inserttimeframes",
      //         data
      //       )
      //       .then((res) => {
      //         alert(res.data.message);
      //       });
      //   } else {
      //     alert("Invalid Input");
      //   }
      // } else if (provider === "facebook") {
      //   const data = { ...timeSlot, videoId, originalUrl };
      //   // console.log(data)

      //   if (data.videoId.length === 7) {
      //     axios
      //       .post(
      //         "https://record-timestamps.onrender.com/dmr/inserttimeframes",
      //         data
      //       )
      //       .then((res) => {
      //         alert(res.data.message);
      //       });
      //   } else {
      //     alert("Invalid Input");
      //   }
      // } else if (provider === "soundcloud") {
      //   const data = { ...timeSlot, videoId, originalUrl };
      //   // console.log(data)

      //   if (data.videoId.length === 7) {
      //     axios
      //       .post(
      //         "https://record-timestamps.onrender.com/dmr/inserttimeframes",
      //         data
      //       )
      //       .then((res) => {
      //         alert(res.data.message);
      //       });
      //   } else {
      //     alert("Invalid Input");
      //   }
      // } else {
        alert("Wrong Input");
        setUrl("");
      }
    }
  };

  return (
    
    <div>
      {/* <div className="descc">
      <h3 className='text-3xl font-bold text-blue-700 mb-6'>This is a web page where you can report sesitive content, here are some simple steps which you can follow to contribute:-</h3>
            <div className="description">
              <div className="description-card">1. Paste the url of the video you want to report sensitive</div>
              <div className="description-card">2. The video will start playing</div>
              <div className="description-card">3. You can see the two buttons "Start" & "Stop"</div>
              <div className="description-card">4. You can simply navigate the video player to the timestamp where the sensitive content starts and press the "Start" button</div>
              <div className="description-card">5. Now when the sensitive part of the video ends you will press the "Stop" button</div>
              <div className="description-card">6. At each time you press the buttons an alert will appear which will ask your confirmation, press ok</div>
              <div className="description-card">7. Like this you can report every sensitive part of the video by using the "Start" & "Stop" button</div>
              <div className="description-card">8. After you have compeleted the video, do not forget to press the "Submit" button</div>
              <div className="description-card">9. <br/>Please report only the sensitive content as we are mainting a database for every video you submit</div>
            </div>
            {/* <ul className='flex flex-col space-x-5 py-3'>
              <li className='bg-slate-500 text-white px-4 py-2 rounded-lg shadow-md m-2'>Paste the url of the video you want to report sensitive</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>The video will start playing</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>You can see the two buttons "Start" & "Stop"</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>You can simply navigate the video player to the timestamp where the sensitive content starts and press the "Start" button</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>Now when the sensitive part of the video ends you will press the "Stop" button</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2' >At each time you press the buttons an alert will appear which will ask your confirmation, press ok</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>Like this you can report every sensitive part of the video by using the "Start" & "Stop" button</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>After you have compeleted the video, do not forget to press the "Submit" button</li>
              <li className='bg-slate-300 text-black px-4 py-2 rounded-lg shadow-md m-2'>Please report only the sensitive content as we are mainting a database for every video you submit</li>
              </ul> 
      </div> */}
      
      <div className="main-display">
      <h1 className="design heading">Steps</h1>
      <div className="card-box">
        <div className="card design">
          <p>
            <h2 style={{color:"#24065C"}}>Step-1</h2>
            <b style={{color:""}}>Copy the URL of the video to be reported. <i style={{color:"#006769"}}>Feed the URL to the URL input box.</i> The video will automatically start to play in display.  
            </b>
            
          </p>
        </div>
        <div className="card design">
          <p>
          <h2 style={{color:"#24065C"}}>Step-2</h2>
            <b>Take video to time where the content to be reported starts, then click on Start button to record startig time and then click on End button to record ending time.</b>
          </p>
        </div>
        <div className="card design">
          <p>
          <h2 style={{color:"#24065C"}}>Step-3</h2>
          <b>Click on <i style={{color:"#006769"}}>"Report and Submit" </i>button to push the record to our data. </b>
           
          </p>
        </div>
      </div>
      </div>
      <div class="platform-info">
        <h1 class="p1">Currently Platform Support</h1>
        <p class="p1">
          <span class="s1">
            {/* Our app currently supports platforms like Facebook, Youtube, Vimeo,
            Dailymotion and many more platform support is in progress. */}
            <div class="images">
        <div class="photo">
          <img src={im4} alt="content-1" />
        </div>
      </div>
            
          </span>
        </p>
      </div>

      <h2>Please Enter URL Here</h2>
      <div class="aligncenter">
        <input
          type="text"
          className="imgUrlText"
          placeholder="Video Url"
          name="url-test"
          onChange={handleLinkChange}
        />
      </div>

      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url={originalUrl}
          controls={true}
          width="100%"
          height="100%"
          playing={true}
        />
      </div>

      <div className="timeStamps" >
        <button className="btn-primary" onClick={handlePlay}>
          Start
        </button>
        <button className="btn-primary" onClick={handlePause}>
          Stop
        </button>
        <br />
        <button className="btn-primary" onClick={dataInput}>
          Submit
        </button>
      </div>

      <div class="platform-info">
        <h2 class="p1">Please report this type of content</h2>
      </div>

      <div class="images">
        <div class="photo">
          <img src={im1} alt="content-1" />
          <h4>Sensitive Content</h4>
        </div>

        <div class="photo">
          <img src={im2} alt="content-2" />
          <h4>Sponsored Content</h4>
        </div>

        <div class="photo">
          <img src={im3} alt="content-3" />
          <h4>Explicit Content</h4>
        </div>
      </div>
    </div>
  );
};
