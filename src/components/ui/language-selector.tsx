'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        className='flex items-center text-white font-raleway text-base font-bold leading-5'
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label='Выбрать язык'>
        <span>RU</span>
        <span className='ml-[9px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            className={cn(
              'transition-transform duration-200',
              isOpen ? 'rotate-180' : ''
            )}>
            <path
              d='M13.28 5.96667L8.9333 10.3133C7.99997 11.2467 7.99997 11.2467 7.06664 10.3133L2.71997 5.96667'
              stroke='white'
              strokeWidth='2'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 mt-2 bg-background border border-gray-700 rounded-lg shadow-lg py-2 px-4 z-40 min-w-[60px]'>
          <button
            className='text-white font-raleway text-base font-bold leading-5 cursor-pointer hover:text-gradient-blue transition-colors'
            onClick={() => setIsOpen(false)}>
            RU
          </button>
        </div>
      )}
    </div>
  );
}
