import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Trophy, Clock } from 'lucide-react';

const Stats = ({ history }) => {
    // Aggregate data for chart (trees per day)
    const chartData = Object.values(history.reduce((acc, session) => {
        const date = format(new Date(session.timestamp), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = { date, trees: 0, minutes: 0 };
        }
        acc[date].trees += 1;
        acc[date].minutes += Math.floor(session.duration / 60);
        return acc;
    }, {})).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-30); // Last 30 days

    const formatXAxis = (tickItem) => {
        return format(parseISO(tickItem), 'MMM d');
    };

    const totalTrees = history.length;
    const totalMinutes = history.reduce((acc, s) => acc + Math.floor(s.duration / 60), 0);

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-forest-100 p-4 rounded-2xl flex flex-col items-center justify-center text-forest-800">
                    <Trophy size={32} className="mb-2 text-forest-600" />
                    <span className="text-3xl font-bold">{totalTrees}</span>
                    <span className="text-xs uppercase tracking-wide opacity-70">Trees Grown</span>
                </div>
                <div className="bg-earth-100 p-4 rounded-2xl flex flex-col items-center justify-center text-earth-800">
                    <Clock size={32} className="mb-2 text-earth-800" />
                    <span className="text-3xl font-bold">{totalMinutes}</span>
                    <span className="text-xs uppercase tracking-wide opacity-70">Minutes Focused</span>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-forest-100">
                <h3 className="text-lg font-bold text-forest-900 mb-4">Monthly Growth</h3>
                <div className="h-64 w-full">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#94e0ad" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f2fcf5' }}
                                />
                                <Bar dataKey="trees" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#5dc886" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-forest-300">
                            No data yet. Start growing!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;
