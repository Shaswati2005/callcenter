"use client";

import React, { useEffect, useState } from "react";

interface Point {
  top: number;
  left: number;
}

const ConstellationLayer = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const generatePoints = () => {
      const count = 7;

      // Choose a cluster center
      const centerTop = Math.random() * window.innerHeight * 0.8;
      const centerLeft = Math.random() * window.innerWidth * 0.8;
      const spread = 700; // smaller = tighter cluster

      const newPoints: Point[] = [];
 
      for (let i = 0; i < count; i++) {
        const offsetTop = (Math.random() - 0.5) * spread;
        const offsetLeft = (Math.random() - 0.5) * spread;

        newPoints.push({
          top: centerTop + offsetTop,
          left: centerLeft + offsetLeft,
        });
      }

      setPoints(newPoints);
    };

    generatePoints();
    window.addEventListener("resize", generatePoints);
    return () => window.removeEventListener("resize", generatePoints);
  }, []);

  return (
    <div className="constellation-layer">
      {points.map((point, idx) => (
        <div
          key={idx}
          className="constellation-star"
          style={{
            top: point.top,
            left: point.left,
          }}
        />
      ))}

      {points.map((p1, i) => {
        if (i === points.length - 1) return null;
        const p2 = points[i + 1];

        const dx = p2.left - p1.left;
        const dy = p2.top - p1.top;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <div
            key={`line-${i}`}
            className="constellation-line"
            style={{
              top: `${p1.top}px`,
              left: `${p1.left}px`,
              width: `${length}px`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ConstellationLayer;
