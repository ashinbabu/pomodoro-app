import React from 'react';
import { motion } from 'framer-motion';

const Tree = ({ stage, isDead }) => {
    // Simple SVG representation of tree stages
    const getTreePath = () => {
        switch (stage) {
            case 'seed':
                return (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <circle cx="100" cy="180" r="10" fill="#8B4513" />
                    </motion.g>
                );
            case 'sprout':
                return (
                    <motion.g initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        {/* Simple stem and leaf */}
                        <path d="M100 180 L100 140" stroke="#5dc886" strokeWidth="4" />
                        <path d="M100 140 Q130 110 100 110" fill="#5dc886" />
                    </motion.g>
                );
            case 'sapling':
                return (
                    <motion.g initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <path d="M100 180 L100 100" stroke="#36ac66" strokeWidth="8" />
                        <path d="M100 120 Q60 80 100 60 Q140 80 100 120" fill="#36ac66" />
                    </motion.g>
                );
            case 'tree':
                return (
                    <motion.g initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}>
                        {/* Trunk */}
                        <rect x="90" y="140" width="20" height="40" fill="#5c4528" />
                        {/* Foliage */}
                        <circle cx="100" cy="100" r="50" fill={isDead ? "#9ca3af" : "#268a4e"} />
                        <circle cx="70" cy="110" r="30" fill={isDead ? "#9ca3af" : "#36ac66"} />
                        <circle cx="130" cy="110" r="30" fill={isDead ? "#9ca3af" : "#36ac66"} />
                    </motion.g>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-64 h-64 flex items-center justify-center relative bg-forest-100 rounded-full shadow-inner border-4 border-forest-200">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ground */}
                <path d="M20 180 Q100 200 180 180" stroke="#5c4528" strokeWidth="2" fill="none" />
                {getTreePath()}
            </svg>
            {isDead && (
                <div className="absolute top-0 right-0 p-2 bg-red-100 text-red-600 rounded-full font-bold text-xs transform rotate-12">
                    Withered
                </div>
            )}
        </div>
    );
};

export default Tree;
