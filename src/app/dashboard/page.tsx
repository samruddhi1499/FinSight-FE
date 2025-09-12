// src/app/dashboard/page.tsx
'use client';
import React, { useState } from 'react';
import SideNav from '@/app/ui/dashboard/SideNav';
import CardsSection from '@/app/ui/dashboard/CardSection';
import MonthlySavingsLineChart from '@/app/ui/dashboard/MonthlySavingsLineChart';
import SavingsGoalProgressChart from '@/app/ui/dashboard/SavingsGoalProgressChart';
import ExceededCapsList from '@/app/ui/dashboard/ExceededCapsList';
import ExpenseCategoryBarChart from '@/app/ui/dashboard/ExpenseCategoryBarChart';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav />
      <main className="flex-1 p-8 mt-6 overflow-auto">
        <CardsSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <MonthlySavingsLineChart />
          <SavingsGoalProgressChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left block: Categories exceeding cap */}
          <ExceededCapsList
            onSelectCategory={(category) => setSelectedCategory(category)}
          />

          {/* Right block: Bar chart for selected category */}
          <ExpenseCategoryBarChart category={selectedCategory} />
        </div>
      </main>
    </div>
  );
}
