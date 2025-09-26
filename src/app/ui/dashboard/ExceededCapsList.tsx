// src/app/ui/dashboard/ExceededCapsList.tsx

import React from 'react';
import { monthlyExceedDataType } from '@/app/dashboard/page';

interface Props  {
  monthlyExceedData: monthlyExceedDataType[]
}

// const exampleData = [
//   { category: 'Dining Out', cap: 300, spent: 450 },
//   { category: 'Groceries', cap: 500, spent: 520 },
//   { category: 'Transport', cap: 150, spent: 180 },
// ];

export default function ExceededCapsList({ monthlyExceedData }: Props) {
  // const exceeding = exampleData
  //   .filter(({ spent, cap }) => spent > cap)
  //   .sort((a, b) => (b.spent - b.cap) - (a.spent - a.cap));

  return (
    <div className="rounded-xl text-stone-600  bg-gray-50 p-4 shadow-sm">
    <div className="bg-white p-6 rounded-xl h-full shadow overflow-auto">
      <h2 className="text-xl font-semibold mb-4">
        Categories Exceeding Caps
      </h2>
      {monthlyExceedData.length === 0 && <p>No categories exceeding caps.</p>}
      <ul>
        {monthlyExceedData.map(({ category, capAmount, spentAmount }) => (
          <li
            key={category}
           
            className="cursor-pointer p-2 rounded hover:bg-teal-100 flex justify-between"
          >
            <span>{category}</span>
            <span className="font-semibold text-red-600">
              ${spentAmount} / ${capAmount}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-gray-500">Click category to view details.</p>
    </div>
    </div>
  );
}
