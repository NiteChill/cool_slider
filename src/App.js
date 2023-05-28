import "./styles.scss";

import { useRef, useState } from "react";

import { imagesArray } from "./datas/imagesArray.js";

export default function App() {
  const sliderRef = useRef(null),
    gapRef = useRef(null),
    [scrollPercent, setScrollPercent] = useState(0),
    handleScroll = (e) => {
      const maxScroll = e.target.scrollHeight - e.target.clientHeight,
        scrollPosition = e.target.scrollTop,
        scrollPercentage = (scrollPosition / maxScroll) * 100,
        sliderScroll =
          gapRef.current.getBoundingClientRect().top - e.target.clientHeight;
      setScrollPercent(scrollPercentage);
      if (sliderScroll <= 0) {
        sliderRef.current.animate(
          {
            transform: `translateX(${sliderScroll}px)`
          },
          { duration: 1000, fill: "forwards" }
        );
      } else {
        sliderRef.current.animate(
          {
            transform: "translateX(0px)"
          },
          { duration: 1000, fill: "forwards" }
        );
      }
    };
  return (
    <div className="App" onScroll={handleScroll}>
      <div
        className="progression_bar"
        data-percent={`${Math.floor(scrollPercent)}%`}
      >
        <div className="bar" style={{ width: `${scrollPercent}%` }}></div>
      </div>
      <h1 className="title">
        Check this
        <br />
        beautiful
        <br />
        slider
      </h1>
      <h1 className="title secondary">
        Check this
        <br />
        beautiful
        <br />
        slider
      </h1>
      <div className="slider" ref={sliderRef}>
        {imagesArray.map((item) => (
          <div className="image_container" key={item.id}>
            <div className="wrapper">
              <img className="image" src={item.src} alt={item.text} />
              <p className="description">The Birth of Venus</p>
            </div>
          </div>
        ))}
        ;
      </div>
      <div
        style={{
          minHeight:
            sliderRef.current &&
            `${sliderRef.current.scrollWidth - window.innerWidth}px`
        }}
        ref={gapRef}
      ></div>
    </div>
  );
}
