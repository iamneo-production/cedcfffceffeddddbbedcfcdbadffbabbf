import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (running && !paused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, paused]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setPaused(true);
  };

  const resumeTimer = () => {
    setPaused(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setPaused(false);
    setTime(0);
  };

  return (
    <div className="app">
      <h3>React Stopwatch</h3>
      <div className='stopwatch-card'>
        <p data-testid="time">{formatTime(time)}</p>
        <div className='buttons'>
          {!running && !paused ? (
            <>
              <button data-testid="start" onClick={startTimer}>Start</button>
              <button data-testid="reset" onClick={resetTimer} disabled>Reset</button>
            </>
          ) : (
            <>
              {running && !paused && (
                <>
                  <button data-testid="pause" onClick={pauseTimer}>Pause</button>
                  <button data-testid="reset" onClick={resetTimer}>Reset</button>
                </>
              )}
              {paused && (
                <>
                  <button data-testid="resume" onClick={resumeTimer}>Resume</button>
                  <button data-testid="reset" onClick={resetTimer}>Reset</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;
