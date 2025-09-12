// src/app/ui/dashboard/CardsSection.tsx
import React from 'react';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const CARD_DATA = [
  { title: 'Current Income (Monthly)', value: '$5,500', icon: BanknotesIcon },
  { title: 'Estimated Saving (Monthly)', value: '$1,200', icon: ClockIcon },
  { title: 'Current Savings', value: '$12,850', icon: UserGroupIcon },
  { title: 'Total Spent (This Month)', value: '$2,700', icon: InboxIcon },
];

export default function CardsSection() {
  return (
    <div className="flex space-x-4">
      {CARD_DATA.map(({ title, value, icon: Icon }) => (
        <div key={title} className="rounded-xl text-stone-600  bg-gray-50 p-4 shadow-sm flex-1">
          <div className="flex p-2.5 items-center">
            <Icon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2  text-sm font-medium">{title}</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
