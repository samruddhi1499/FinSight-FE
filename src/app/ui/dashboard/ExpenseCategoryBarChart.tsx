// src/app/ui/dashboard/ExpenseCategoryBarChart.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categoryOptions = ['Dining Out', 'Groceries', 'Transport'];

const exampleMonthlyExpenses = {
  'Dining Out': [
    { month: 'Jan', amount: 400 },
    { month: 'Feb', amount: 380 },
    { month: 'Mar', amount: 450 },
    { month: 'Apr', amount: 420 },
  ],
  Groceries: [
    { month: 'Jan', amount: 480 },
    { month: 'Feb', amount: 510 },
    { month: 'Mar', amount: 500 },
    { month: 'Apr', amount: 530 },
  ],
  Transport: [
    { month: 'Jan', amount: 130 },
    { month: 'Feb', amount: 140 },
    { month: 'Mar', amount: 150 },
    { month: 'Apr', amount: 160 },
  ],
};

type Props = {
  category: string | null;
};

export default function ExpenseCategoryBarChart({ category }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(category || categoryOptions[0]);
  const [data, setData] = useState(exampleMonthlyExpenses[selectedCategory]);

  useEffect(() => {
    if (category != null) {
      setSelectedCategory(category);
      setData(exampleMonthlyExpenses[category]);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setData(exampleMonthlyExpenses[newCategory]);
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
