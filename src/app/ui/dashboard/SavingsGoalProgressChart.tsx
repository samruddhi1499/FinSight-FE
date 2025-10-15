import React from 'react';
import { monthlyGoalDataType } from '@/app/dashboard/page';

interface Props {
  monthlyGoalData: monthlyGoalDataType;
}

export default function SavingsGoalProgressChart({ monthlyGoalData }: Props) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  // Guard division by zero and clamp percent between 0 and 100
  const rawPercent =
    monthlyGoalData.goal && monthlyGoalData.goal !== 0
      ? (monthlyGoalData.current / monthlyGoalData.goal) * 100
      : 0;
  const percent = Math.min(Math.max(Math.round(rawPercent), 0), 100);

  const strokeDashoffset = circumference * (1 - percent / 100);
  const remaining = Math.max(monthlyGoalData.goal - monthlyGoalData.current, 0);

  const strokeColor = monthlyGoalData.current < 0 ? '#e53e3e' : '#38b2ac'; // red if negative current

  return (
    <div className="rounded-xl text-stone-600 bg-gray-50 p-4 shadow-sm">
      <div className="bg-white shadow-lg rounded-xl h-full p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Monthly Goal Completion</h2>
        <div className="relative flex items-center justify-center w-40 h-40 my-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={8}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth={8}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.7s' }}
            />
          </svg>
          <span className="absolute text-3xl font-semibold">{percent}%</span>
        </div>
        {monthlyGoalData.current < 0 && <div className="text-gray-600">Exceeded By: ${Math.abs(monthlyGoalData.current)}</div>}
        {monthlyGoalData.current > 0 && <div className="text-gray-600">Remaining: ${remaining.toFixed(2)}</div>}
        <div className="text-gray-600">Goal: ${monthlyGoalData.goal.toFixed(2)}</div>
        <div className="text-gray-600">Current Savings: ${monthlyGoalData.currentSavings.toFixed(2)}</div>
      </div>
    </div>
  );
}
