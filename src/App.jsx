import React, { useState } from 'react';
import Tree from './components/Tree';
import Timer from './components/Timer';
import confetti from 'canvas-confetti';

function App() {
    const [stage, setStage] = useState('seed'); // seed, sprout, sapling, tree
    const [isDead, setIsDead] = useState(false);
    const [message, setMessage] = useState("Stay focused to grow your tree!");

    const handleTick = (timeLeft, totalTime) => {
        const progress = (totalTime - timeLeft) / totalTime;

        if (progress < 0.1) setStage('seed');
        else if (progress < 0.4) setStage('sprout');
        else if (progress < 0.7) setStage('sapling');
        else setStage('tree');
    };

    const handleComplete = () => {
        setStage('tree'); // Ensure it's full grown
        setMessage("Great job! You grew a tree!");
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#268a4e', '#5dc886', '#fdf6e9']
        });
    };

    const handleGiveUp = () => {
        if (confirm("Are you sure? Your tree will wither!")) {
            setIsDead(true);
            setStage('tree'); // Show the withered version
            setMessage("Oh no! The tree withered...");
        }
    };

    return (
        <div className="min-h-screen bg-forest-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-forest-100 flex flex-col items-center space-y-8">
                <h1 className="text-3xl font-display font-bold text-forest-900">Forest Focus</h1>

                <div className="relative">
                    <Tree stage={stage} isDead={isDead} />
                </div>

                <p className="text-center text-forest-600 font-medium h-6">
                    {message}
                </p>

                <Timer
                    totalTime={10} // Testing with 10 seconds. Change to 25*60 for production
                    onTick={handleTick}
                    onComplete={handleComplete}
                    onGiveUp={handleGiveUp}
                />
            </div>
        </div>
    );
}

export default App;
