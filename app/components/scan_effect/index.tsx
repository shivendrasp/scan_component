"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import "./style.css";

const ScanEffect = () => {
  const [lineWidths, setLineWidths] = useState<number[]>([]);
  const [boxes, setBoxes] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);
  const [showDepth, setShowDepth] = useState(true);

  useEffect(() => {
    const widths = Array.from({ length: 20 }, () => 60 + Math.random() * 40);
    setLineWidths(widths);
    
    // Create random boxes for animation
    const boxCount = 200; // Number of boxes to create
    const newBoxes = Array.from({ length: boxCount }, (_, index) => ({
      id: index,
      x: Math.random() * 100, // Random x position (0-100%)
      y: Math.random() * 100, // Random y position (0-100%)
      opacity: Math.random() * 0.8 + 0.2 // Random opacity between 0.2-1
    }));
    setBoxes(newBoxes);
  }, []);

  console.log(lineWidths)

  return (
    <motion.div className="doc" onClick={() => setShowDepth(!showDepth)}
    initial={{
      transform: "rotate(0deg) skew(0deg, 0deg)"
    }}
    animate={{
      transform: showDepth ? "rotate(0deg) skew(0deg, 0deg)" : "rotate(-45deg) skew(15deg, 15deg)"
    }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          className="doc-line"
          key={index}
          style={{
            backgroundColor: index % 6 === 0 ? "#313131" : "#252525",
            width: lineWidths[index] ? `${lineWidths[index]}%` : "40%",
          }}
        ></motion.div>
      ))}
      <motion.div
        className="laser-container"
        initial={{
            top: '-80%',
        }}
        animate={{
            top: '180%',
        }}
        transition={{
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
        }}
      >
        <div className="layer" />
        <div className="bits">
          <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
            {boxes.map((box) => (
              <motion.circle
                key={box.id}
                cx={`${box.x}%`}
                cy={`${box.y}%`}
                r="1.4"
                fill={box.id % 2 === 0 ? "#37ff14" : "#97ff84"}
                initial={{ 
                  opacity: box.opacity,
                }}
                animate={{ 
                  opacity: [box.opacity, 0, box.opacity],
                  scale: [1, 0, 1],
                }}
                transition={{
                  duration: Math.random() * 0.4 + 0.6,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  repeatDelay: Math.random() * 0.5
                }}
              />
            ))}
          </svg>
        </div>
        <div className="laser" />
      </motion.div>
    </motion.div>
  );
};

export default ScanEffect;
