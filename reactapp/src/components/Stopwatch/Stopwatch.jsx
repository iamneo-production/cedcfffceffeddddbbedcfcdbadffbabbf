import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [running]);

    const handleStart = () => {
        setRunning(true);
    };

    const handlePause = () => {
        setRunning(false);
    };

    const handleResume = () => {
        setRunning(true);
    };

    const handleReset = () => {
        setRunning(false);
        setTime(0);
    };

    return (
        <div>
            <p id="time" data-testid="time">
                {time} seconds
            </p>
            {running ? (
                <div>
                    <button id="pause" data-testid="pause" onClick={handlePause}>
                        Pause
                    </button>
                </div>
            ) : (
                <div>
                    <button id="start" data-testid="start" onClick={handleStart}>
                        Start
                    </button>
                    <button id="reset" data-testid="reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            )}
            {running ? (
                <div>
                    <button id="resume" data-testid="resume" onClick={handleResume}>
                        Resume
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Stopwatch;
