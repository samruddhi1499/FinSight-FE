// src/app/ui/dashboard/CardsSection.tsx
import React from 'react';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

import { cardDataType } from '@/app/dashboard/page';
import { IconType } from "react-icons";

interface Props {
  cardData: cardDataType[]

}

export default function CardsSection({cardData}: Props) {
  

  
const CARD_icon :  Record<string, IconType> = {
  "Monthly Income": BanknotesIcon,
  "Estimated Saving": ClockIcon,
  "Current Savings": UserGroupIcon,
  "Total Spent": InboxIcon,
};

return (
  <div className="flex space-x-4">
    {cardData.map(({ title, amount }) => {
      const IconComponent = CARD_icon[title];
      return (
        
        <div key={title} className="rounded-xl text-stone-600 bg-gray-50 p-4 shadow-sm flex-1">
          <div className="flex p-2.5 items-center">
            {IconComponent && <IconComponent className="h-5 w-5 text-gray-700" />}
            { (title == "Current Savings" && amount < 0) && (<h3 className="ml-2 text-sm font-medium">Exceded By</h3>)}
            { amount > 0 &&  <h3 className="ml-2 text-sm font-medium">{title}</h3>}
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
             {(title == "Current Savings" && amount < 0) && `\$${Math.abs(amount)}`}
             { amount > 0 && `\$${amount}` } 
          </p>
        </div>
      );
    })}
  </div>
);

}
