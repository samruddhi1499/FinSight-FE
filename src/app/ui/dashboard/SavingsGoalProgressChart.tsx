// src/app/ui/dashboard/SavingsGoalProgressChart.tsx

import React from 'react';

type Props = {
  goal?: number;        // Default: $1,200
  current?: number;     // Default: $850
};

export default function SavingsGoalProgressChart({ goal = 1200, current = 850 }: Props) {
  const percent = Math.min(Math.round((current / goal) * 100), 100);

  return (
     <div className="rounded-xl text-stone-600  bg-gray-50 p-4 shadow-sm">
    <div className="bg-white shadow-lg rounded-xl h-full p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Monthly Goal Completion</h2>
      <div className="relative flex items-center justify-center w-40 h-40 my-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#38b2ac"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={2 * Math.PI * 46 * (1 - percent / 100)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.7s' }}
          />
        </svg>
        <span className="absolute text-3xl font-semibold">{percent}%</span>
      </div>
      <div className="text-gray-600">Remaining: ${goal - current}</div>
      <div className="text-gray-600">Goal: ${goal}</div>
    </div>
    </div>
  );
}
