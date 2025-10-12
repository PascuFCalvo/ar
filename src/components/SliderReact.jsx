import React, { useState } from "react";
import "../styles/palette.css";

export default function SliderReact({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);
  if (!images.length) return null;
  return (
    <div className="slider">
      <button className="slider-btn left" onClick={prev}>
        &lt;
      </button>
      <img src={images[current]} alt="slide" className="slider-img" />
      <button className="slider-btn right" onClick={next}>
        &gt;
      </button>
      <style>{`
        .slider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1em;
          background: var(--color-dark);
          padding: 1em;
          border-radius: 8px;
        }
        .slider-img {
          width: 320px;
          height: 180px;
          object-fit: cover;
          border-radius: 4px;
          border: 2px solid var(--color-info);
        }
        .slider-btn {
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 2.5em;
          height: 2.5em;
          font-size: 1.25em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .slider-btn:hover {
          background: var(--color-accent);
        }
      `}</style>
    </div>
  );
}
