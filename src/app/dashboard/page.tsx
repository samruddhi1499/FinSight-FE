// src/app/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import SideNav from '@/app/ui/dashboard/SideNav';
import CardsSection from '@/app/ui/dashboard/CardSection';
import MonthlySavingsLineChart from '@/app/ui/dashboard/MonthlySavingsLineChart';
import SavingsGoalProgressChart from '@/app/ui/dashboard/SavingsGoalProgressChart';
import ExceededCapsList from '@/app/ui/dashboard/ExceededCapsList';
import ExpenseCategoryBarChart from '@/app/ui/dashboard/ExpenseCategoryBarChart';
import { RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/dashboard/Skeleton';

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
  current:number,
  currentSavings: number
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
  const [cardData, setCardData] = useState<cardDataType[]>([]);
  const [monthlySavingsLineData, setMonthlySavingsLineData] = useState<monthlySavingsLineDataType[]>([]);
  const [monthlyGoalData, setMonthlyGoalData] = useState<monthlyGoalDataType>({
    goal: 0.0,
    current : 0.0,
    currentSavings: 0.0
  });
  const [monthlyExceedData, setMonthlyExceedData] = useState<monthlyExceedDataType[]>([]);
  const [monthlyExpsneByCategoryData, setMonthlyExpsneByCategoryData] = useState<MonthlyExpensesByCategory>({});

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/Dashboard/data`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Failed to fetch user details");
  
          const data = await response.json();

          setCardData(data.cardResult);
          setMonthlySavingsLineData(data.monthlySavingsResult);
          setMonthlyGoalData(prev => ({
            ...prev,
            goal: data.monthlyGoalResult.goal,
            current: data.monthlyGoalResult.current,
            currentSavings:data.monthlyGoalResult.currentSavings
          }));
          setMonthlyExceedData(data.monthlyExceedResult);
          setMonthlyExpsneByCategoryData(data.monthlyExpsneByCategoryResult);

          console.log(data.monthlyExpsneByCategoryResult)
          setLoading(false);
  
  
        } catch (e) {
          console.error("Error fetching users:");
        
        } 
      };
  
      fetchUsers();
    }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav onboarding={false}/>
      <main className="flex-1 p-8 mt-6 overflow-auto">
         {/* Conditionally show skeleton if loading or no data */}
        {loading || cardData.length === 0 ? (
          <CardsSkeleton />
        ) : (
          <CardsSection cardData={cardData} />
        )}
     
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
           {loading || cardData.length === 0 ? (
          <RevenueChartSkeleton />
        ) : (
          <MonthlySavingsLineChart monthlySavingsLineData = {monthlySavingsLineData}/>
        )}
     
            {loading || cardData.length === 0 ? (
          <RevenueChartSkeleton />
        ) : (
          <SavingsGoalProgressChart monthlyGoalData = {monthlyGoalData}/>
        )}
          
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left block: Categories exceeding cap */}

              {loading || cardData.length === 0 ? (
          <RevenueChartSkeleton />
        ) : (
            <ExceededCapsList
            monthlyExceedData = {monthlyExceedData}
          />
        )}
        

              {loading || cardData.length === 0 ? (
          <RevenueChartSkeleton />
        ) : (
             <ExpenseCategoryBarChart monthlyExpsneByCategoryData = {monthlyExpsneByCategoryData} /> 
        )}

          {/* Right block: Bar chart for selected category */}
       
        </div>
      </main>
    </div>
  );
}
