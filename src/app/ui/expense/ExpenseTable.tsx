import React from 'react';
import { useState } from 'react';
import { CheckIcon, XMarkIcon  } from '@heroicons/react/24/outline';
interface Expenses {
  id:number;
  category:string;
  totalAmount: number;
  capAmount: number;
  isOverBudget: string;
  expenseMonth: number;
  expenseYear: number;
}

interface Expense {
  id:number;
  category:string;
  amount:number;
  expenseDate:Date;
}

interface YearAndMonth {
  month:number;
  year:number;
}

import Modal from "./Modal"

interface Props {
  expenses?: Expenses[] | null;
  tableHead: string[];
  expense?: Expense[] | null;
  onDelete?: (id: number) => void;
  onUpdate?: (id:number, amount:number) => void;
  history: boolean;
  yearAndMonth?: YearAndMonth
  errorCode? : string

}

export default function ExpenseTable({expense, expenses, tableHead, onDelete, onUpdate, history, yearAndMonth, errorCode}: Props) {

    
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [id, setId] = useState(0);
      const [amount, setAmount] = useState(0.0);
      const [editRowId, setEditRowId] = useState<number | null>(null);

      
      
    const filteredExpenses = expenses?.filter(
  (exp) =>
    exp.expenseYear === (yearAndMonth?.year || new Date().getFullYear()) &&
    exp.expenseMonth === (yearAndMonth?.month || new Date().getMonth() + 1)
);


const getMonthName = (monthNumber: number): string => {
  // monthNumber: 1 = January, 12 = December
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
};

      
     

  return (
    
<>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900   bg-white ">
            Your Expense
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
  Check your expense for Month of {getMonthName(yearAndMonth?.month || new Date().getMonth() + 1)} {new Date().getFullYear()}
</p>

        </caption>
     
    
       {expenses && <thead className={`text-xs text-gray-700 uppercase bg-sky-100  dark:text-gray-600 `}>
            <tr>
              {tableHead.map((head) => 
                
                <th key={head} scope="col" className="px-6 text-center py-3">
                    {head}
                </th>
                
             ) }
                
            </tr>
        </thead>}

        {expense  && 
           <thead className={`text-xs text-gray-700 uppercase bg-gray-300  dark:text-gray-600 `}>
            <tr>
              {tableHead.map((head) => 
                
                <th key={head} scope="col" className="px-6 text-center py-3">
                    {head}
                </th>
                
             ) }
                
            </tr>
        </thead>
        }
        
        <tbody>
           { expenses && filteredExpenses && filteredExpenses.length > 0  && errorCode == "200"? (
    filteredExpenses.map((exp) => (
      <tr key={exp.category} className="bg-white border-b dark:border-gray-200 border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap">
          {exp.category}
        </th>
        <td className="px-6 py-4 text-gray-500 text-center">{`$${exp.totalAmount}`}</td>
        <td className="px-6 py-4 text-gray-500 text-center">{`$${exp.capAmount}`}</td>
        <td
          className={`px-6 py-4 text-center ${
            exp.isOverBudget === "Over" ? "text-red-500" : "text-green-500"
          }`}
        >
          {exp.isOverBudget}
        </td>
        {!history && (
          <td className="px-6 py-4 text-center">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setId(exp.id);
              }}
              className="font-medium text-blue-600 pr-1 dark:text-blue-500 hover:underline"
            >
              View Details
            </button>
          </td>
        )}
      </tr>
    ))
  ) : (
   
    <tr>
       {!expense &&
      <td colSpan={5} className="text-center p-4 text-gray-500">
          No expenses found for the selected month and year.
      </td>
}
    </tr>
  )}

{expense && expense.map((exp) => {
  const isEditing = exp.id === editRowId; // check if this row is being edited

  return (
    <tr key={exp.id} className="bg-white border-b dark:border-gray-200 border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap ">
        {exp.category}
      </th>

      <td className="px-6 py-4 text-gray-500 text-center">{`${exp.expenseDate}`}</td>

      {!isEditing && (
        <td className="px-6 py-4 text-gray-500 text-center">{`$${exp.amount}`}</td>
      )}

      {isEditing && (
        <td className="px-6 py-4 flex gap-2 flex-row text-gray-500 text-center">
          <input
            type="text"
            className="border"
            defaultValue={exp.amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            onClick={() => {
              onUpdate?.(exp.id, amount);
              setEditRowId(null); // exit edit mode
            }}
          >
            <CheckIcon className="h-5 w-5 text-green-500 border rounded-2xl p-0.5 font-extrabold" />
          </button>
          <button
            onClick={() => {
              setEditRowId(null); // cancel edit mode
            }}
          >
            <XMarkIcon className="h-5 w-5 text-red-500 border rounded-2xl p-0.5 font-extrabold" />
          </button>
        </td>
      )}

      <td className="px-6 py-4 text-center">
        <button
          onClick={() => {
            setEditRowId(exp.id);
            setAmount(exp.amount); // initialize edit amount state
          }}
          className={`font-medium pr-1 hover:underline ${
            isEditing ? "text-stone-500" : "text-blue-600 dark:text-blue-500"
          }`}
          disabled={isEditing}
        >
          Edit
        </button>

        <button
          onClick={() => {
            onDelete?.(exp.id);
          }}
          className={`font-medium hover:underline ${
            isEditing ? "text-stone-500" : "text-red-600 dark:text-red-500"
          }`}
          disabled={isEditing}
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}

        </tbody>

        {!expenses && !expense && <p>No Data</p>}
        
    
        </table>

    <Modal
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false);
                     setTimeout(() => {
  window.location.reload();
}, 100);}

        }
        id={id}
      />

      </>

  );
}
