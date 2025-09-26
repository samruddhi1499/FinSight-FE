'use client'
import React, { useState } from 'react';
import { useUser } from '../../store/UserContext';

import { useRouter } from "next/navigation";
import SideNav from '@/app/ui/dashboard/SideNav';

export default function Onboarding() {

  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { userDetails, setUserDetails } = useUser();

  const [salary, setSalary] = useState(userDetails.salary);
  const [balance, setBalance] = useState(userDetails.balance);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    // Optionally POST the data to your backend API
    try {
      const response = await fetch(`${endpoint}/api/UserDetails/profile-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({
        
        salaryPerMonth: salary,
        currentBalance: balance,
      }),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const data = await response.json();

      // Update context state on successful save
       setUserDetails(prevEdit => ({
      ...prevEdit,
        username:data.username,
        salary: data.salaryPerMonth,
        balance: data.currentBalance      }));



      alert('Onboarding complete!');
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert('Error updating user');
    }
  };


  // ... your onboarding form submission handler calls handleOnboardingComplete on success ...


  return (

    <div className="min-h-screen flex flex-row  bg-gray-50">
              <SideNav onboarding={true}/>
    <div className='rounded-lg w-5/6  shadow-md '>
    <form onSubmit={handleSubmit} className="text-gray-600 mx-auto w-1/2 p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Onboarding</h1>

  


      <label className="block">
        <span>Monthly Salary</span>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          required
          min={0}
          step="0.01"
        />
      </label>

      <label className="block">
        <span>Current Balance</span>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          required
          min={0}
          step="0.01"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Complete Onboarding
      </button>
    </form>
    </div>
    </div>
  );
}
