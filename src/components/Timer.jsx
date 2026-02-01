import React, { useState, useEffect } from 'react';
import { Play, Pause, XCircle, RotateCcw, Clock } from 'lucide-react';

const Timer = ({ onComplete, onGiveUp, onTick, initialTime = 25 }) => {
    const [totalTime, setTotalTime] = useState(initialTime * 60);
    const [timeLeft, setTimeLeft] = useState(initialTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [customMinutes, setCustomMinutes] = useState(initialTime);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => {
                    const newTime = time - 1;
                    onTick(newTime, totalTime);
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            onComplete(totalTime); // Pass back the total time focused
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete, onTick, totalTime]);

    const toggleTimer = () => {
        if (!isActive && timeLeft === totalTime) {
            // Starting fresh
            setTotalTime(customMinutes * 60);
            setTimeLeft(customMinutes * 60);
        }
        setIsActive(!isActive);
    };

    const handleTimeChange = (e) => {
        const val = parseInt(e.target.value);
        setCustomMinutes(val);
        if (!isActive) {
            setTotalTime(val * 60);
            setTimeLeft(val * 60);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center space-y-6 w-full">
            <div className="text-7xl font-display font-bold text-forest-800 tracking-wider tabular-nums">
                {formatTime(timeLeft)}
            </div>

            {!isActive && (
                <div className="flex flex-col items-center space-y-2 w-full max-w-xs">
                    <label className="text-forest-600 font-medium flex items-center gap-2">
                        <Clock size={16} />
                        <span>Focus Duration: {customMinutes} min</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="120"
                        value={customMinutes}
                        onChange={handleTimeChange}
                        className="w-full accent-forest-500 h-2 bg-forest-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between w-full text-xs text-forest-400">
                        <span>1m</span>
                        <span>60m</span>
                        <span>120m</span>
                    </div>
                </div>
            )}

            <div className="flex space-x-4 mt-4">
                {!isActive && timeLeft === totalTime ? (
                    <button
                        onClick={toggleTimer}
                        className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transform transition active:scale-95 flex items-center space-x-2"
                    >
                        <Play size={24} />
                        <span>Plant</span>
                    </button>
                ) : (
                    <>
                        {isActive ? (
                            <button
                                onClick={onGiveUp}
                                className="bg-white border-2 border-red-200 text-red-500 hover:bg-red-50 px-6 py-3 rounded-full font-bold text-lg shadow-sm transition flex items-center space-x-2"
                            >
                                <XCircle size={24} />
                                <span>Give Up</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsActive(false);
                                    setTotalTime(customMinutes * 60);
                                    setTimeLeft(customMinutes * 60);
                                }}
                                className="bg-forest-100 text-forest-700 hover:bg-forest-200 px-6 py-3 rounded-full font-bold text-lg transition flex items-center space-x-2"
                            >
                                <RotateCcw size={24} />
                                <span>Reset</span>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Timer;
