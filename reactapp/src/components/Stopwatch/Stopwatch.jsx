import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
  };

  const handlePause = () => {
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="app">
      <h1>React Stopwatch</h1>
      <div className='stopwatch-card'>
        <p data-testid="time">{formatTime(time)}</p>
        <div className='buttons'>
          {!isActive && (
            <>
              <button data-testid="start" onClick={handleStart}>Start</button>
              <button data-testid="reset" onClick={handleReset} disabled>Reset</button>
            </>
          )}
          {isActive && isPaused && (
            <>
              <button data-testid="resume" onClick={handleResume}>Resume</button>
              <button data-testid="reset" onClick={handleReset}>Reset</button>
            </>
          )}
          {isActive && !isPaused && (
            <>
              <button data-testid="pause" onClick={handlePause}>Pause</button>
              <button data-testid="reset" onClick={handleReset}>Reset</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;
