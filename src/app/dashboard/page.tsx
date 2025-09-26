// src/app/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import SideNav from '@/app/ui/dashboard/SideNav';
import CardsSection from '@/app/ui/dashboard/CardSection';
import MonthlySavingsLineChart from '@/app/ui/dashboard/MonthlySavingsLineChart';
import SavingsGoalProgressChart from '@/app/ui/dashboard/SavingsGoalProgressChart';
import ExceededCapsList from '@/app/ui/dashboard/ExceededCapsList';
import ExpenseCategoryBarChart from '@/app/ui/dashboard/ExpenseCategoryBarChart';

export interface cardDataType {
  title:string,
  amount:number
}

export interface monthlySavingsLineDataType {
  month:string,
  savings:number
}

export interface monthlyGoalDataType {
  goal:number,
  current:number
}

export interface monthlyExceedDataType{
  category: string;
  capAmount:number;
  spentAmount: number;
}
export type MonthlyExpense = {
  month: string;
  amount: number;
  cap: number;
};

export type MonthlyExpensesByCategory = {
  [category: string]: MonthlyExpense[];
};
export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cardData, setCardData] = useState<cardDataType[]>([]);
  const [monthlySavingsLineData, setMonthlySavingsLineData] = useState<monthlySavingsLineDataType[]>([]);
  const [monthlyGoalData, setMonthlyGoalData] = useState<monthlyGoalDataType>({
    goal: 0.0,
    current : 0.0
  });
  const [monthlyExceedData, setMonthlyExceedData] = useState<monthlyExceedDataType[]>([]);
  const [monthlyExpsneByCategoryData, setMonthlyExpsneByCategoryData] = useState<MonthlyExpensesByCategory>({});
  const endpoint = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`${endpoint}/api/Dashboard/data`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Failed to fetch user details");
  
          const data = await response.json();

          setCardData(data.cardResult);
          setMonthlySavingsLineData(data.monthlySavingsResult);
          setMonthlyGoalData(prev => ({
            ...prev,
            goal: data.monthlyGoalResult.goal,
            current: data.monthlyGoalResult.current
          }));
          setMonthlyExceedData(data.monthlyExceedResult);
          setMonthlyExpsneByCategoryData(data.monthlyExpsneByCategoryResult);

          console.log(data.monthlyExpsneByCategoryResult)
  
  
        } catch (e) {
          console.error("Error fetching users:");
        
        } 
      };
  
      fetchUsers();
    }, [endpoint]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav onboarding={false}/>
      <main className="flex-1 p-8 mt-6 overflow-auto">
        <CardsSection cardData = {cardData}/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <MonthlySavingsLineChart monthlySavingsLineData = {monthlySavingsLineData}/>
          <SavingsGoalProgressChart monthlyGoalData = {monthlyGoalData}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left block: Categories exceeding cap */}
          <ExceededCapsList
            monthlyExceedData = {monthlyExceedData}
          />

          {/* Right block: Bar chart for selected category */}
          <ExpenseCategoryBarChart monthlyExpsneByCategoryData = {monthlyExpsneByCategoryData} /> 
        </div>
      </main>
    </div>
  );
}
