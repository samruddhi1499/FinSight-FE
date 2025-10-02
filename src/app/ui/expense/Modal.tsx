import React, { useState } from 'react';
import ExpenseTable from './ExpenseTable';
import { XMarkIcon } from '@heroicons/react/24/outline';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id:number;
}

interface Expense {
  id:number;
  category:string;
  amount:number;
  expenseDate:Date;
}


export default function Modal({ id, isOpen, onClose }: ModalProps) {
        
    const endpoint = process.env.NEXT_PUBLIC_API_URL;
    const [expense, setExpense] = useState<Expense[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshModalContent = () => {
  if (isOpen && id) {
    // cause re-fetch by updating id or using a refresh state
    // simple way: call fetchExpense logic again or force a refresh key:

    setRefreshKey((prev) => prev + 1);
  }
};
   

  // Reset input when modal opens
  React.useEffect(() => {
    if (isOpen) {
        const fetchExpense = async () => {
          try {
            
    
            const response = await fetch(
              `/api/Expense/get-expense/${id}`,
              {
                method: "GET",
                credentials:"include"
              }
            );
    
            const data = await response.json();
            setExpense(data);


        
            
          } catch (error) {
            console.error("Error fetching bookings:", error);
          } 
          
        };
        fetchExpense();
    }
    
  }, [isOpen, endpoint,id, refreshKey]);

  if (!isOpen) return null;

  const handleDelete = async(id:number) =>{
     try {
      const response = await fetch(`/api/Expense/delete-expense/${id}`, {
        method: 'Delete', // or PUT depending on your API
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
   
      });
      if (!response.ok) throw new Error('Failed to save data');
       refreshModalContent();

      


  } catch (error) {
      console.error(error);
      alert('Error updating profile');
  }
  }

  const handleUpdateExpense = async(id:number, amount:number) =>{
              
                      try {
                  const response = await fetch(`/api/Expense/update-expense/${id}`, {
                    method: 'PUT', // or PUT depending on your API
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(
                      amount
                    ),
                  });
                  if (!response.ok) throw new Error('Failed to save data');

             

                  
                   refreshModalContent();
               
                } catch (error) {
                  console.error(error);
                  alert('Error updating profile');
                }
              
                  }

      

  return (
<div className="fixed inset-0 bg-white/45 bg-opacity-20 flex justify-center items-center z-50">
  <div className="relative bg-white rounded-lg p-6 w-1/2 shadow-lg">
    {/* Close icon button */}
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
      aria-label="Close modal"
    >
      <XMarkIcon className="h-6 w-6" />
    </button>

    <ExpenseTable
      history={false}
      onUpdate={handleUpdateExpense}
      onDelete={handleDelete}
      expenses={null}
      tableHead={["Category", "Expense Date", "Amount", "Actions"]}
      expense={expense}
    />
  </div>
</div>
   
  );

}
