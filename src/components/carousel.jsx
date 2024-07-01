import React from "react";
import "./carousel.css";
import img1 from "./yt.png";
import img2 from "./dm.png";
import img3 from "./fb.png";
import img4 from "./dm.png";
import img5 from "./vimeo.png"
function Carousel() {
  return (
    <div>
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
            <img src={img1} height="110" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img2} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img3} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img4} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img5} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img1} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img2} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img3} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img4} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img5} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img1} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img2} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={img3} height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
