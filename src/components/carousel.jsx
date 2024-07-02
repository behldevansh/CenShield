import React from "react";
import "./carousel.css";
import { fb } from "../assets";
import { dm } from "../assets";
import { vimeo } from "../assets";
import { yt } from "../assets";
import styles from "../style";
import Button from "./Button";

function Carousel() {
  return (
    <>
    <section className={`${styles.marginY}  sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow text-center`}>
    <div className="flex-1 flex flex-col">
      <p className={styles.heading2}>Current Supported Platform</p>
    </div>
  </section>
    <div>
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
            <img src={fb} height="110" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={dm} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={yt} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={vimeo} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={fb} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={dm} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={yt} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={vimeo} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={fb} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={dm} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={yt} height="100" width="250" alt="" />
          </div>
          <div class="slide">
            <img src={vimeo} height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Carousel;
