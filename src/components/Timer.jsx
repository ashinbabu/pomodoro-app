import React, { useState, useEffect } from 'react';
import { Play, Pause, XCircle, RotateCcw } from 'lucide-react';

const Timer = ({ onComplete, onGiveUp, onTick, totalTime = 25 * 60 }) => {
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isActive, setIsActive] = useState(false);

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
            onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete, onTick, totalTime]);

    const toggleTimer = () => setIsActive(!isActive);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="text-7xl font-display font-bold text-forest-800 tracking-wider">
                {formatTime(timeLeft)}
            </div>

            <div className="flex space-x-4">
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
                                    setTimeLeft(totalTime);
                                    setIsActive(false);
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
