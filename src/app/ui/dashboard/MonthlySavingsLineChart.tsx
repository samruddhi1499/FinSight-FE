// src/app/ui/dashboard/MonthlySavingsLineChart.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlySavingsLineDataType } from '@/app/dashboard/page';


interface Props {
  monthlySavingsLineData: monthlySavingsLineDataType[]
}


export default function MonthlySavingsLineChart({monthlySavingsLineData}:Props) {
  return (
    <div className="rounded-xl text-stone-600  bg-gray-50 p-4 shadow-sm">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Revenue</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlySavingsLineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="savings" stroke="#3182ce" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}
