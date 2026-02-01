import React, { useState, useEffect } from 'react';
import Tree from './components/Tree';
import Timer from './components/Timer';
import Stats from './components/Stats';
import confetti from 'canvas-confetti';
import { BarChart3, Sprout } from 'lucide-react';

function App() {
    const [view, setView] = useState('timer'); // 'timer' or 'stats'
    const [stage, setStage] = useState('seed'); // seed, sprout, sapling, tree
    const [isDead, setIsDead] = useState(false);
    const [message, setMessage] = useState("Stay focused to grow your tree!");

    // History state with lazy initialization from localStorage
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('pomodoro_history');
        return saved ? JSON.parse(saved) : [];
    });

    // Save history whenever it changes
    useEffect(() => {
        localStorage.setItem('pomodoro_history', JSON.stringify(history));
    }, [history]);

    const handleTick = (timeLeft, totalTime) => {
        const progress = (totalTime - timeLeft) / totalTime;

        if (progress < 0.1) setStage('seed');
        else if (progress < 0.4) setStage('sprout');
        else if (progress < 0.7) setStage('sapling');
        else setStage('tree');
    };

    const handleComplete = (totalTime) => {
        setStage('tree');
        setMessage("Great job! You grew a tree!");

        // Add to history
        const newSession = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            duration: totalTime,
            status: 'completed'
        };
        setHistory(prev => [...prev, newSession]);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#268a4e', '#5dc886', '#fdf6e9']
        });
    };

    const handleGiveUp = () => {
        if (confirm("Are you sure? Your tree will wither!")) {
            setIsDead(true);
            setStage('tree');
            setMessage("Oh no! The tree withered...");
        }
    };

    const handleReset = () => {
        setStage('seed');
        setIsDead(false);
        setMessage("Stay focused to grow your tree!");
    }

    return (
        <div className="min-h-screen bg-forest-50 flex flex-col items-center justify-center p-4">
            {/* Navigation Tabs */}
            <div className="fixed top-6 bg-white p-1 rounded-full shadow-md border border-forest-100 flex space-x-1 z-10">
                <button
                    onClick={() => setView('timer')}
                    className={`px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${view === 'timer' ? 'bg-forest-100 text-forest-800' : 'text-forest-400 hover:text-forest-600'}`}
                >
                    <Sprout size={18} />
                    Focus
                </button>
                <button
                    onClick={() => setView('stats')}
                    className={`px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${view === 'stats' ? 'bg-forest-100 text-forest-800' : 'text-forest-400 hover:text-forest-600'}`}
                >
                    <BarChart3 size={18} />
                    Forest
                </button>
            </div>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-forest-100 flex flex-col items-center space-y-8 mt-12 transition-all">
                {view === 'timer' ? (
                    <>
                        <h1 className="text-3xl font-display font-bold text-forest-900">Forest Focus</h1>

                        <div className="relative">
                            <Tree stage={stage} isDead={isDead} />
                        </div>

                        <p className="text-center text-forest-600 font-medium h-6">
                            {message}
                        </p>

                        {/* If the tree is done/dead, show reset, otherwise show timer */}
                        {(stage === 'tree' && (isDead || message.includes("Great job"))) ? (
                            <button
                                onClick={handleReset}
                                className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
                            >
                                Plant Another
                            </button>
                        ) : (
                            <Timer
                                onTick={handleTick}
                                onComplete={handleComplete}
                                onGiveUp={handleGiveUp}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-display font-bold text-forest-900 mb-4">Your Forest</h1>
                        <Stats history={history} />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
