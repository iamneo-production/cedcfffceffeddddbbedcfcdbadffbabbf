import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const padTime = (time, digits) => {
      return '${new Array(digits - time.toString().length).fill(0).join("")}${time}';
    };
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return '${padTime(hours, 2)}:${padTime(minutes, 2)}:${padTime(seconds, 2)}';
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div>
      <p data-testid="time">{formatTime(time)}</p>
      {!isActive && !isPaused && (
        <button data-testid="start" onClick={handleStart}>
          Start
        </button>
      )}
      {(isActive || isPaused) && (
        <button data-testid="pause" onClick={handlePause}>
          Pause
        </button>
      )}
      {isPaused && (
        <button data-testid="resume" onClick={handleResume}>
          Resume
        </button>
      )}
      <button data-testid="reset" onClick={handleReset} disabled={!isActive && !isPaused}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;