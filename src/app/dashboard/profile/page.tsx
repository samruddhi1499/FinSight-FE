'use client';

import React, { useState, useEffect } from 'react';
import SideNav from '@/app/ui/dashboard/SideNav';
import { isNotEmpty, isEqualToOtherValue, hasMinLength } from "../../../util/validation.js"; 

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xl mb-6 select-none">
      {initials}
    </div>
  );
}

export default function ProfilePage() {
  
  const [userDetails,setUserDetails] = useState({
    username : " ",
    salary: 0.0,
    balance: 0.0

  });
  const [isEditing, setIsEditing] = useState(false);

  const [passwordDetails, setPasswordDetails] = useState({
    newPassword: "",
    currentPassword: "",
    confirmPassword: ""
  })


  const handlePasswordChange = async(e:React.FormEvent) => {
     e.preventDefault();

      if (!isNotEmpty(passwordDetails.newPassword) || !hasMinLength(passwordDetails.newPassword, 6) || !isNotEmpty(passwordDetails.currentPassword)) {
         throw new Error("Check entered value. Password must be at least 6 characters long");
       }

     if (!isEqualToOtherValue(passwordDetails.newPassword, passwordDetails.confirmPassword)) {
        throw new Error("Passwords do not match");
      }

    try {
      const response = await fetch(`${endpoint}/api/Auth/change-password`, {
        method: 'POST', // or PUT depending on your API
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          newPassword: passwordDetails.newPassword,
          currentPassword: passwordDetails.currentPassword,
        }),
      });
      if (!response.ok) throw new Error('Failed to save data');

    setPasswordDetails(prev => ({
  ...prev,
  newPassword: "",
  currentPassword: "",
  confirmPassword: ""
}));


  } catch (error) {
      console.error(error);
      alert('Error updating profile');
  }
  }

const saveUserDetails = async () => {
  try {
    const response = await fetch(`${endpoint}/api/UserDetails/update-profile-data`, {
      method: 'PUT', // or PUT depending on your API
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        salaryPerMonth: userDetails.salary,
        currentBalance: userDetails.balance,
      }),
    });
    if (!response.ok) throw new Error('Failed to save data');

    // Possibly refresh or update state based on response
    setIsEditing(false);
  } catch (error) {
    console.error(error);
    alert('Error updating profile');
  }
};


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${endpoint}/api/UserDetails/profile`, {
          credentials: "include",
        });


        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();

        setUserDetails(prevEdit => ({
      ...prevEdit,
        username:data.username,
        salary: data.salaryPerMonth,
        balance: data.currentBalance
      }));

      } catch (e) {
        console.error("Error fetching users:");
      
      } 
    };

    fetchUsers();
  }, [endpoint]);




  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav />
      <main className="flex-1 p-8 mt-14 overflow-auto mx-auto w-full">
        <div className="bg-white grid grid-cols-3 gap-2 place-items-center rounded-lg shadow-md p-4 space-y-6">
        

            <div className='text-center'>
                 <Avatar name={userDetails.username} />

          <div>
            <h2 className="text-gray-600 font-medium">Username</h2>
            <p className="text-lg text-gray-900">{userDetails.username}</p>
          </div>
            </div>
         
            <div>
          <div>
            <h2 className="text-gray-600 font-medium">Current Balance</h2>
            {isEditing ? (
              <input
                type="number"
                value={userDetails.balance}
                 onChange={(e) => setUserDetails(prev => ({ ...prev, balance: parseFloat(e.target.value) }))}
                className="mt-1 w-full border text-gray-900 rounded-md px-3 py-2 text-lg"
              />
            ) : (
              <p className="text-lg text-gray-900">${userDetails.balance.toLocaleString()}</p>
            )}
          </div>

          <div className='mt-8'>
            <h2 className="text-gray-600 font-medium">Salary Per Month</h2>
            {isEditing ? (
              <input
                type="number"
                value={userDetails.salary}
                 onChange={(e) => setUserDetails(prev => ({ ...prev, salary: parseFloat(e.target.value) }))}
                className=" w-full border text-gray-900 rounded-md px-3 py-2 text-lg"
              />
            ) : (
              <p className="text-lg text-gray-900">${userDetails.salary.toLocaleString()}</p>
            )}
          </div>


          <button
            onClick={toggleEdit}
           className={`px-4 py-2 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isEditing ? 'hidden' : ''}`}

          >
            Edit
          </button>
          <button
           onClick={saveUserDetails}
            className={`px-4 py-2 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${!isEditing ? 'hidden' : ''}`}
          >
            Save
          </button>

          </div>

          <div className="pt-6  ">
            

           
              <form
                onSubmit={(e) => {
                 handlePasswordChange(e);
                }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={passwordDetails.currentPassword}
                    onChange={(e) => setPasswordDetails(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={passwordDetails.newPassword}
                    onChange={(e) => setPasswordDetails(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={passwordDetails.confirmPassword}
                    onChange={(e) => setPasswordDetails(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </form>
            
          </div>
        </div>
      </main>
    </div>
  );
}
