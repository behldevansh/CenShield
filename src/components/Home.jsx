import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import urlParser from "js-video-url-parser";
import "./Home.css";
import { placeholder } from "../assets";
// import ReactPlayer from "react-player";


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
    const provider = urlParser.parse(e.target.value).provider;
    const idVal = urlParser.parse(e.target.value).id;

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
        alert("Wrong Input");
        setUrl("");
      }
    }
  };

  return (
    <section id="try">
    <div>
      {/* <h2>Please Enter URL Here</h2> */}
      <div class="aligncenter">
        <input
          type="text"
          className="imgUrlText"
          placeholder="Enter Video URL of above format"
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
          // placeholder="https://www.youtube.com/watch?v=6n3pFFPSlW4"
        />
      </div>

      <div className="timestamps">
        <button className="btn-primary" onClick={handlePlay}>
          Start
        </button>
        <button className="btn-primary" onClick={handlePause}>
          End
        </button>
        <button className="btn-primary" onClick={dataInput}>
          Submit
        </button>
      </div>
    </div>
    </section>
  );
};
