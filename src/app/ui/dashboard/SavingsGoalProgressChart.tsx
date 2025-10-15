import React from 'react';
import { monthlyGoalDataType } from '@/app/dashboard/page';

interface Props {
  monthlyGoalData: monthlyGoalDataType;
}

export default function SavingsGoalProgressChart({ monthlyGoalData }: Props) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  // Calculate raw percent — allow exceeding 100% when overspent
  const rawPercent =
    monthlyGoalData.goal && monthlyGoalData.goal !== 0
      ? (monthlyGoalData.current / monthlyGoalData.goal) * 100
      : 0;

  // Clamp only for display (cap at 100 for circle visualization)
  const displayPercent = Math.min(Math.abs(Math.round(rawPercent)), 100);

  // Determine stroke color — red if over goal
  const strokeColor = monthlyGoalData.current > monthlyGoalData.goal
    ? '#e53e3e' // red if over goal
    : '#38b2ac'; // teal if within goal

  // Calculate stroke offset
  const strokeDashoffset = circumference * (1 - Math.min(displayPercent, 100) / 100);

  const remaining = monthlyGoalData.goal - monthlyGoalData.current;

  return (
    <div className="rounded-xl text-stone-600 bg-gray-50 p-4 shadow-sm">
      <div className="bg-white shadow-lg rounded-xl h-full p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Monthly Expense Completion</h2>
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
              style={{ transition: 'stroke-dashoffset 0.7s, stroke 0.7s' }}
            />
          </svg>
          <span className="absolute text-3xl font-semibold">
            {Math.round(rawPercent)}%
          </span>
        </div>
        {remaining >= 0 && (
          <div className="text-gray-600">
            Current Expense: ${monthlyGoalData.current.toFixed(2)}
          </div>
        )}
        {remaining < 0 && (
          <div className="text-gray-600">
            Exceeded Expense: ${Math.abs(remaining).toFixed(2)}
          </div>
        )}
        <div className="text-gray-600">Goal: ${monthlyGoalData.goal.toFixed(2)}</div>
        <div className="text-gray-600">Current Savings: ${Math.abs(monthlyGoalData.currentSavings).toFixed(2)}</div>
      </div>
    </div>
  );
}
