import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex items-center justify-between border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex items-center gap-4'>
          <ThemeSwitcher />
          <UserButton afterSwitchSessionUrl='/' />
        </div>
      </nav>
      <main className='flex w-full flex-grow'>{children}</main>
    </div>
  );
};

export default layout;
