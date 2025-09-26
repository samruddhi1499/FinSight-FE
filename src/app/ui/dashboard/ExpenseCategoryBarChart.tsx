// src/app/ui/dashboard/ExpenseCategoryBarChart.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyExpense, MonthlyExpensesByCategory } from '@/app/dashboard/page';



interface Props {
 monthlyExpsneByCategoryData: MonthlyExpensesByCategory
}

export default function ExpenseCategoryBarChart({ monthlyExpsneByCategoryData }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(monthlyExpsneByCategoryData)[0]);
  const [data, setData] = useState(monthlyExpsneByCategoryData[selectedCategory]);

  useEffect(() => {
    if (monthlyExpsneByCategoryData != null) {
      setSelectedCategory(Object.keys(monthlyExpsneByCategoryData)[0]);
      setData(monthlyExpsneByCategoryData[Object.keys(monthlyExpsneByCategoryData)[0]]);
    }
  }, [monthlyExpsneByCategoryData]);

  const categoryOptions = Object.keys(monthlyExpsneByCategoryData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setData(monthlyExpsneByCategoryData[newCategory]);
  };


  return (
    <div className="rounded-xl text-stone-600  bg-gray-50 p-4 shadow-sm">
    <section className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses by Category</h2>

      <select
        value={selectedCategory}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full max-w-xs"
      >
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#38b2ac" />
        </BarChart>
      </ResponsiveContainer>
    </section>
    </div>
  );
}
