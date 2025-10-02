'use client'
import React, { useState, useEffect } from 'react';

import ExpenseTable from '@/app/ui/expense/ExpenseTable';

import SideNav from '@/app/ui/dashboard/SideNav';


interface Expenses {
  id:number;
  category:string;
  totalAmount: number;
  capAmount: number;
  isOverBudget: string;
    expenseMonth: number;
  expenseYear: number;
}

interface YearAndMonth {
  month:number;
  year:number;
}


export default function ExpenseHistory() {

      const endpoint = process.env.NEXT_PUBLIC_API_URL;
      const [expenses, setExpenses] = useState<Expenses[]>([]);
      const [monthYear, setMonthYear] = useState<YearAndMonth>();
      const [errorCode, setErrorCode] = useState<string>("");
      

      useEffect(() => {
        const fetchExpense = async () => {
          try {
            
    
            const response = await fetch(
              `/api/Expense/expense-history`,
              {
                method: "GET",
                credentials:"include"
              }
            );

              if(!response.ok){
              setErrorCode(`${response.status}`)
            }
            else{
              setErrorCode(`${response.status}`)
            const data = await response.json();
            setExpenses(data);
            }


              
        
            
          } catch (error) {
            console.error("Error fetching bookings:", error);
          } 
        };
    
        fetchExpense();
      }, [endpoint]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // format: "YYYY-MM"
     const [year, month] = value.split('-');
    setMonthYear(prev => ({
        ...prev,
        month:parseInt(month, 10),
        year: parseInt(year, 10)
    }));
    
  };

      



    return (
    <div className="min-h-screen flex bg-gray-50">
          <SideNav onboarding={false}/>
          <main className="flex-1 p-8 mt-6 overflow-auto"> 

            <div className="flex gap-4 justify-center mb-4">
                <label htmlFor="bday-month" className='text-stone-700'>Filter By Month and Year: </label>
                            <input
                            id="bday-month"
                            type="month"
                            name="bday-month"
                            className='text-stone-700 border'
                            defaultValue={new Date().toISOString().slice(0, 7)} 
                            onChange={handleChange}
                            />
            </div>
            
            <ExpenseTable errorCode={errorCode} yearAndMonth={monthYear} history = {true} expenses={expenses} tableHead={["Categories", "Total Amount", "Cap Amount", "Status"]} expense={null} />
          </main>
        </div>
       
    );
}