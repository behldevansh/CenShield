import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import urlParser from "js-video-url-parser";
import "./Home.css";
import placeholder from "../assets/nsfw.png"; // Adjust the path as necessary

export const Home = () => {
  const [originalUrl, setUrl] = useState("");
  const [error, setError] = useState(false); // State variable for error status
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoId, setvideoId] = useState();
  const [timeSlot, setTimeSlot] = useState({
    startFrom: 0,
    endsUpto: 0,
    videoLength: 0,
  });
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  var url_axios = "";

  const handleLinkChange = (e) => {
    // Set URL in text field and get the YouTube ID
    const url = e.target.value;
    setUrl(url);
    setError(false); // Clear error status when URL changes
    setShowPlaceholder(!url); // Hide placeholder when URL is entered

    const provider = urlParser.parse(url)?.provider;
    const idVal = urlParser.parse(url)?.id;

    if (!provider || !idVal) {
      alert("Wrong Input");
      setUrl("");
      setShowPlaceholder(true);
      return;
    }

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

    axios
      .get(url_axios)
      .then((res) => {
        const times = res.data;
        if (times.length === 0) {
          alert("No data found");
        } else {
          var endTimes = [];
          var startTimes = [];
          startTimes = times.map((entry) => entry.startFrom);
          endTimes = times.map((entry) => entry.endsUpto);
          startTimes = startTimes.sort((a, b) => a - b);
          endTimes = endTimes.sort((a, b) => a - b);
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

  const handlePlay = () => {
    if (!originalUrl) {
      setError(true);
      return;
    }

    const videoLength = Number(playerRef.current.getDuration().toFixed());
    const startFrom = Number(playerRef.current.getCurrentTime().toFixed());
    setCurrentTime(startFrom);
    setTimeSlot({ ...timeSlot, startFrom, videoLength });
    alert("Start Time: " + startFrom);
  };

  const handlePause = () => {
    if (!originalUrl) {
      setError(true);
      return;
    }

    var endsUpto = Number(playerRef.current.getCurrentTime().toFixed());
    setCurrentTime(endsUpto);
    setTimeSlot({ ...timeSlot, endsUpto });
    alert("End Time: " + endsUpto);
  };

  const dataInput = () => {
    if (!originalUrl) {
      setError(true);
      return;
    }

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
        <div className="aligncenter">
          <input
            type="text"
            className={`imgUrlText ${error ? "error" : ""}`}
            placeholder={error ? "Error: Enter Video URL of above format" : "Enter Video URL of above format"}
            name="url-test"
            onChange={handleLinkChange}
            style={{ backgroundColor: error ? "red" : "" }} // Inline style for background color
          />
        </div>
        <div className="player-wrapper">
          {showPlaceholder ? (
            <img src={placeholder} alt="Placeholder" className="placeholder-img" />
          ) : (
            <ReactPlayer
              ref={playerRef}
              url={originalUrl}
              controls={true}
              width="100%"
              height="100%"
              playing={true}
            />
          )}
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
