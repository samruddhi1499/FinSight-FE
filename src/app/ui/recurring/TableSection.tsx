import React from 'react';
import { useState } from 'react';
import EditCapModal from './EditCapModal';

interface RecurringCategories {
  categoryId:number,
  category: string;
  capAmount: number;
}
interface Props {
  recurringCategory: RecurringCategories[];
  errorCode: string;
}



export default function TableSection({recurringCategory, errorCode}: Props) {

    const endpoint = process.env.NEXT_PUBLIC_API_URL;

    

     

  const [isModalOpen, setIsModalOpen] = useState(false);
     const [updateCategory, setUpdateCategory] = useState({
         category: "",
         capAmount: 0.0
     });

  const handleSave = async (newAmount: number) => {
    
    setIsModalOpen(false);
    try {
      const response = await fetch(`${endpoint}/api/RecurringCategories/update-categories`, {
        method: 'PUT', // or PUT depending on your API
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          category: updateCategory.category,
          capAmount: newAmount,
        }),
      });
      if (!response.ok) throw new Error('Failed to save data');

          setUpdateCategory(prev => ({
  ...prev,
  capAmount: newAmount
}));

 setTimeout(() => {
  window.location.reload();
}, 100);

  } catch (error) {
      console.error(error);
      alert('Error updating profile');
  }
    // Additional save logic like API calls here
  };


  const handleDelete = async(id:number) =>{
     try {
      const response = await fetch(`${endpoint}/api/RecurringCategories/delete-categories/${id}`, {
        method: 'Delete', // or PUT depending on your API
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
   
      });
      if (!response.ok) throw new Error('Failed to save data');


 setTimeout(() => {
  window.location.reload();
}, 100);

  } catch (error) {
      console.error(error);
      alert('Error updating profile');
  }
  }



    return(
        <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900   bg-white ">
            Our products
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
        </caption>
     
        <thead className="text-xs text-gray-700 uppercase bg-blue-100  dark:text-gray-600">
            <tr>
                
                <th scope="col" className="px-6 text-center py-3">
                    Category
                </th>
                <th scope="col" className="px-6 text-center py-3">
                    Price
                </th>
                <th scope="col" className="px-6 text-center py-3">
                    Actions
                </th>
                
            </tr>
        </thead>
        
        {errorCode != "400" ? (<tbody>
            {recurringCategory.map((cat) => 
            
            <tr key={cat.categoryId} className="bg-white border-b  dark:border-gray-200 border-gray-200">
               
                <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap ">
                    {cat.category}
                </th>
                <td className="px-6 py-4 text-gray-500 text-center">
                   {`$${cat.capAmount}`}
                </td>
  
                <td className="px-6 py-4 text-center">
                    <button onClick={() => {setIsModalOpen(true);
                            setUpdateCategory(prev => ({
                                ...prev,
                               category: cat.category,
                               capAmount: cat.capAmount
                                }));
                    }}  className="font-medium text-blue-600 pr-1 dark:text-blue-500 hover:underline">Edit</button>
               
                    <button onClick={() => {
    if (window.confirm("Are you sure you want to delete?")) {
      handleDelete(cat.categoryId);
    }
  }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
            </tr>
            )}
        </tbody>):
      ( <tbody>
         <tr>
      <td colSpan={3} className="text-center p-4 text-gray-500">
          Add Recurring Categories
      </td>
    </tr>
    </tbody>)
        }
        
    
        </table>

    <EditCapModal
        initialCapAmount={updateCategory.capAmount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      </>
    )
}