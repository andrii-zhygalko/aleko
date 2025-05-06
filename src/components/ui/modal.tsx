'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;

      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        } else {
          modalRef.current.focus();
        }
      }
    } else if (previouslyFocusedElement.current) {
      (previouslyFocusedElement.current as HTMLElement).focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !modalRef.current) return;

    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-30 lg:z-25 flex items-center justify-center p-0 md:p-4 bg-background'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          aria-modal='true'
          role='dialog'
          onKeyDown={handleKeyDown}>
          <div
            className='lg:hidden z-1 absolute top-40 -left-20 w-[184px] h-[173px] rounded-[92px] bg-spiro blur-[110px]'
            aria-hidden='true'></div>
          <div
            className='lg:hidden z-1 absolute bottom-10 -right-10 w-[184px] h-[173px] rounded-[92px] bg-lavender blur-[110px]'
            aria-hidden='true'></div>
          <div
            className='hidden lg:block absolute top-[100%] left-[140px] w-[368px] h-[346px] rounded-full bg-lavender blur-[289px]'
            aria-hidden='true'></div>

          <div
            className='absolute top-[120%] right-[10%] w-[368px] h-[346px] rounded-full bg-spiro blur-[289px]'
            aria-hidden='true'></div>

          <motion.div
            ref={modalRef}
            className='relative w-full h-full md:w-[410px] md:h-auto md:rounded-[28px] bg-background 
                      md:p-[90px_50px_70px_50px] md:shadow-[4px_6px_10px_4px_rgba(167,93,243,0.20)_inset]
                      flex flex-col'
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            tabIndex={-1}>
            <button
              onClick={onClose}
              className='absolute cursor-pointer top-8 right-6 md:top-7 md:right-7 w-8 h-8 text-white'
              aria-label='Close'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='33'
                height='33'
                viewBox='0 0 33 33'
                fill='none'>
                <path
                  d='M16.0062 17.8722L9.47511 24.4078C9.23075 24.6524 8.91968 24.7747 8.54191 24.7748C8.16413 24.775 7.85297 24.6528 7.60845 24.4085C7.36392 24.1641 7.24159 23.8531 7.24146 23.4753C7.24133 23.0975 7.36344 22.7863 7.6078 22.5418L14.1389 16.0062L7.60328 9.47515C7.35875 9.23079 7.23642 8.91972 7.23629 8.54194C7.23616 8.16417 7.35827 7.85301 7.60263 7.60848C7.84699 7.36395 8.15806 7.24162 8.53584 7.24149C8.91362 7.24136 9.22477 7.36348 9.4693 7.60784L16.0049 14.1389L22.536 7.60332C22.7803 7.35879 23.0914 7.23646 23.4692 7.23633C23.847 7.2362 24.1581 7.35831 24.4026 7.60267C24.6472 7.84703 24.7695 8.1581 24.7696 8.53588C24.7698 8.91365 24.6476 9.22481 24.4033 9.46934L17.8722 16.0049L24.4078 22.536C24.6523 22.7804 24.7747 23.0914 24.7748 23.4692C24.7749 23.847 24.6528 24.1581 24.4084 24.4027C24.1641 24.6472 23.853 24.7695 23.4752 24.7697C23.0975 24.7698 22.7863 24.6477 22.5418 24.4033L16.0062 17.8722Z'
                  fill='white'
                />
              </svg>
            </button>

            <div className='pt-[157px] px-8 pb-[41px] md:p-0 flex flex-col h-full'>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
