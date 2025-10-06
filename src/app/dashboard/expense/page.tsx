'use client'
import React, { useState, useEffect } from 'react';

import ExpenseTable from '@/app/ui/expense/ExpenseTable';

import SideNav from '@/app/ui/dashboard/SideNav';
import { PlusIcon } from '@heroicons/react/24/outline';


interface Expenses {
  id:number;
  category:string;
  totalAmount: number;
  capAmount: number;
  isOverBudget: string;
  expenseMonth: number;
  expenseYear: number;
}


interface RecurringCategories {
  categoryId:number | string,
  category: string;
}

export default function Expense() {

      const endpoint = process.env.NEXT_PUBLIC_API_URL;
      const [expenses, setExpenses] = useState<Expenses[]>([]);
      const [isVisibile, setIsVisibile] = useState(false);
      const [allowedMonth, setAllowedMonth] = useState(new Date()); // set to today or first day of month
      const [isDisabled, setIsDisabled] = useState(false);



      // Get current month details
      const year = allowedMonth.getFullYear();
      const month = allowedMonth.getMonth(); // 0-indexed
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const minDate = firstDay.toISOString().split('T')[0];
      const maxDate = lastDay.toISOString().split('T')[0];
            const [recurringCategories, setRecurringCategories] = useState<RecurringCategories[]>([]);
      const [expense, setExpense] = useState({
        expenseCategoryId: "",  // empty means no category selected yet
        expenseDate: "",
        amount: 0.0,
      });
      const [errorCode, setErrorCode] = useState<string>("");

      const [refreshKey, setRefreshKey] = useState(0);
      
   

      useEffect(() => {
     const refreshModalContent = () => {
        if (isDisabled) {
          setRefreshKey((prev) => prev + 1);
        }
      };
  refreshModalContent();
}, [isDisabled]);


      function toggleAdd(){
        const val = !isVisibile;
        setIsVisibile(val)
      }
      

      useEffect(() => {
        const fetchExpense = async () => {
          try {
            
            const responseCheck = await fetch(
              `/api/Expense/check-complete`,
              {
                method: "GET",
                credentials:"include"
              }
            );
            const val = await responseCheck.text();

            if(val == "No"){

              setIsDisabled(false);
                const response = await fetch(
              `/api/Expense/expense`,
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

               const responseRecurring = await fetch(
              `/api/RecurringCategories/selected-categories`,
              {
                method: "GET",
                credentials:"include"
              }
            );
            if(!responseRecurring.ok){ 
              setRecurringCategories([]);
            }
            else{
            const dataRecurring = await responseRecurring.json();
            setRecurringCategories(dataRecurring);
            }
            }
            else{
              setIsDisabled(true);
            }
            
        
            
          } catch (error) {
            console.error("Error fetching bookings:", error);
          } 
        };
    
        fetchExpense();
      }, [endpoint,refreshKey]);

      
      const handleDone = async() => {

        try {
          const response = await fetch(`/api/Expense/mark-complete`, {
            method: 'PUT', // or PUT depending on your API
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });
          
          if (!response.ok) throw new Error('Failed to save data');
          setAllowedMonth(new Date(year, month + 1, 1));
        } catch (error) {
          console.error(error);
          alert('Error Marking Complete');
        }
        
    
      }
      const handleSaveExpense = async() =>{
      
              try {
          const response = await fetch(`/api/Expense/add-expense`, {
            method: 'POST', // or PUT depending on your API
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              expenseCategoriesId: expense.expenseCategoryId,
              amount: expense.amount,
              expenseDate: expense.expenseDate,
            }),
          });
          if (!response.ok) throw new Error('Failed to save data');
       
        } catch (error) {
          console.error(error);
          alert('Error updating profile');
        }
      
          }



    return (
    <div className="min-h-screen flex bg-gray-50">
          <SideNav onboarding={false}/>
          <main className={`flex-1 p-8 mt-6  overflow-auto ${isDisabled ? 'pointer-events-none opacity-50' : ""}`}> <div className="flex justify-end mb-4">
            {!isVisibile &&
            <div className='flex flex-row gap-4'>
<button onClick={toggleAdd} className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
  <PlusIcon className="h-5 w-5 text-white font-extrabold" />
  <span>Add Expense</span>
</button>
<button onClick={() => {
    if (window.confirm(`Are you want to Mark this Month Complete? \n This action is irreversible.`)) {
      handleDone();
    }}} className="px-4 py-2  flex items-center gap-2 bg-green-500 text-white rounded hover:bg-green-600 transition">

  <span>Mark Complete</span>
</button>
</div>}

{isVisibile && <form onSubmit={handleSaveExpense} className=" mx-auto flex flex-col gap-4 justify-center mb-10">
  
  
<div className='flex flex-row gap-4'>
<select
  id="expenseCategories"
  className="bg-gray-50 border border-gray-300 rounded-md text-lg px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-50"
  value={expense.expenseCategoryId}
  onChange={(e) =>
    setExpense(prev => ({
      ...prev,
      expenseCategoryId: e.target.value,
    }))
  }
>
  <option value="" disabled>
    {recurringCategories.length === 0 ? "Add Recurring Categories" : "Select Categories"}
  </option>
  {recurringCategories.map((cat) => (
    <option key={cat.categoryId} value={cat.categoryId}>
      {cat.category}
    </option>
  ))}
</select>

  

  <input
    type="number"
    placeholder="Amount"
    value={expense.amount}
    className="w-50 border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-900"
    onChange={(e) => setExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
  />

</div>
  

  <input
  type="date"
  className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-900"
  min={minDate}
  max={maxDate}
  onChange={(e) =>
    setExpense((prev) => ({ ...prev, expenseDate: e.target.value }))
  }
/>
 <div className='flex flex-row gap-16 justify-center'>
   <button
    type="submit"
    className="px-4 py-2 w-30 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Save
  </button>
  <button
    onClick={toggleAdd}
    className="px-4 py-2 w-30 bg-stone-400 text-white rounded-md hover:bg-stone-500 transition"
  >
    Cancel
  </button>
 </div>
</form>}

  </div>
            <ExpenseTable errorCode={errorCode} history={false} expenses={expenses} tableHead={["Categories", "Total Amount", "Cap Amount", "Status", "Actions"]} expense={null} />
          </main>
        </div>
       
    );
}