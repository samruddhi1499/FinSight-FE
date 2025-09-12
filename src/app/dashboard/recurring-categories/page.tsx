'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import SideNav from '@/app/ui/dashboard/SideNav';
import TableSection from '@/app/ui/recurring/TableSection'
const endpoint = process.env.NEXT_PUBLIC_API_URL;

interface RecurringCategories {
  categoryId:number,
  categoryName: string;
  capAmount: number;
}

export default function RecurringCategoriesPage() {


    const [recurringCategories, setRecurringCategories] = useState<RecurringCategories[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
    const [recurringCategory, setRecurringCategory] = useState({
        category: "",
        capAmount: 0.0
    });

    const saveCategory = async(e:React.FormEvent) =>{

        try {
    const response = await fetch(`${endpoint}/api/UserDetails/add-categories`, {
      method: 'POST', // or PUT depending on your API
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        category: recurringCategory.category,
        capAmount: recurringCategory.capAmount,
      }),
    });
    if (!response.ok) throw new Error('Failed to save data');
 
  } catch (error) {
    console.error(error);
    alert('Error updating profile');
  }

    }
    
  useEffect(() => {
    const fetchRecurringCategories = async () => {
      try {
        

        const response = await fetch(
          `${endpoint}/api/UserDetails/selected-categories`,
          {
            method: "GET",
            credentials:"include"
          }
        );

        const responseExpense = await fetch(
          `${endpoint}/api/UserDetails/remaining-categories`,
          {
            method: "GET",
            credentials:"include"
          }
        );

        const dataExpense = await responseExpense.json()
        const data = await response.json();
        
        setExpenseCategories(dataExpense);
          setRecurringCategories(data);
          console.log(data)
        
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } 
    };

    fetchRecurringCategories();
  }, []);

 

return(

     <div className="min-h-screen flex bg-gray-50">
          <SideNav />
          <main className="flex-1 p-8 rounded-xl text-stone-600  bg-gray-50 shadow-sm overflow-auto">
            <div className='w-full '>
                <h3 className='mb-4 text-xl text-stone-800 text-center md:text-2xl'>Add Recurring Category</h3>
                <form onSubmit={saveCategory} className=" mx-auto flex flex-row gap-4 justify-center mb-10">
  
  
<select
  id="expenseCategories"
  className="bg-gray-50 border border-gray-300 rounded-md text-lg px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-50"
  defaultValue=""
  onChange={(e) => setRecurringCategory(prev => ({ ...prev, category: e.target.value }))}
>
  <option value="" disabled>Select Category</option>
  {expenseCategories.map((cat, index) => (
    <option key={index} value={cat} >
      {cat}
    </option>
  ))}
</select>

  

  <input
    type="number"
    placeholder="Cap Amount"
    className="w-50 border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-900"
    value={recurringCategory.capAmount}
    onChange={(e) => setRecurringCategory(prev => ({ ...prev, capAmount: parseFloat(e.target.value) }))}
  />

  <button
    type="submit"
    className="px-4 py-2 w-30 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Save
  </button>
</form>

            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <TableSection recurringCategory={recurringCategories}/>
            </div>

          </main>

          </div>

    



);

}