
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
  const outputRef = useRef(null); // Reference to the Output section

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
      document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error("Player reference or required methods are null or not functions.");
    }
  };

  const scrollToOutput = () => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
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
        scrollToOutput(); // Scroll to Output section when a video is clicked
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
    <section id="result" ref={outputRef}>
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

      <div className="flex justify-center items-center gap-6 mb-6">
        <button
          className="relative w-16 h-16 text-2xl font-semibold rounded-full border border-gray-300 bg-transparent text-white shadow-lg hover:shadow-2xl hover:border-gray-400 transform hover:scale-110 transition-transform duration-300 ease-in-out group"
          onClick={() => setPgNo(pgNo === 1 ? 1 : pgNo - 1)}
        >
          <span className="relative z-10">-</span>
          <span
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 opacity-20 rounded-full transform scale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <span
            className="absolute inset-0 border border-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"
          />
        </button>
        <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
          {pgNo}
        </span>
        <button
          className="relative w-16 h-16 text-2xl font-semibold rounded-full border border-gray-300 bg-transparent text-white shadow-lg hover:shadow-2xl hover:border-gray-400 transform hover:scale-110 transition-transform duration-300 ease-in-out group"
          onClick={() => setPgNo(pgNo + 1)}
        >
          <span className="relative z-10">+</span>
          <span
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 opacity-20 rounded-full transform scale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <span
            className="absolute inset-0 border border-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>
    </section>
  );
};

export default Output;
