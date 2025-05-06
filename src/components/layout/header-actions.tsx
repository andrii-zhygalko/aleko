'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from '@/components/forms/contact-form';
import { LanguageSelector } from '@/components/ui/language-selector';

interface MenuItem {
  title: string;
  href: string;
}

interface HeaderActionsProps {
  menuItems: MenuItem[];
}

export default function HeaderActions({ menuItems }: HeaderActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className='flex items-center'>
        <nav className='hidden lg:flex items-center space-x-7'>
          {menuItems.map(item => (
            <Link
              href={item.href}
              key={item.title}
              className='text-white hover:text-gradient-blue transition-colors'
              onClick={closeMenu}>
              {item.title}
            </Link>
          ))}
        </nav>

        <LanguageSelector className='hidden lg:block mx-15' />
        <div className='hidden lg:block'>
          <Button variant='primary' size='sm' onClick={openModal}>
            Купить со скидкой
          </Button>
        </div>

        <div className='lg:hidden flex items-center'>
          <LanguageSelector className='mr-4' />
          <button
            className='text-white focus:outline-none'
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            <svg
              className='w-8 h-8'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className='lg:hidden w-full overflow-hidden'
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}>
            <motion.div className='flex flex-col items-center py-4'>
              {menuItems.map(item => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className='py-2'>
                  <Link
                    href={item.href}
                    className='text-white hover:text-gradient-blue transition-colors px-2 py-1'
                    onClick={closeMenu}>
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className='mt-2'>
                <Button
                  variant='primary'
                  size='sm'
                  onClick={() => {
                    openModal();
                    closeMenu();
                  }}>
                  Купить
                </Button>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm onClose={closeModal} />
      </Modal>
    </>
  );
}
