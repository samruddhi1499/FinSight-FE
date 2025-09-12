// src/app/ui/dashboard/SideNav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  ClockIcon,
  PlusCircleIcon,
  PowerIcon,
  Squares2X2Icon
  
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const links = [
    { name: 'Dasboard', href: '/dashboard', icon: Squares2X2Icon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Recurring Categories', href: '/dashboard/recurring-categories', icon: ClockIcon },
  { name: 'Add Expense', href: '/dashboard/add-expense', icon: PlusCircleIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className=" sticky top-0 h-screen flex flex-col px-3 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md  p-4 md:h-40"
        href="/"
      >
            <Image src="/piggy-logo.png" width={80}
      height={80} alt='logo' />
        <div className="w-32 text-stone-600 text-[42px] font-serif 
         md:w-40">
          FinSight
          
        </div>
    
      </Link>

      <nav className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <ul className="flex flex-row gap-2 mt-4 md:flex-col md:gap-3">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-sky-100 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <form>
          <button
            type="submit"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-sky-100 hover:text-blue-600 mb-5 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </nav>
    </div>
  );
}
