'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from '@/components/forms/contact-form';

interface CallToActionButtonProps {
  discountPercent: string;
}

export function CallToActionButton({
  discountPercent,
}: CallToActionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal} variant='cta' className='relative mx-auto'>
        Купить со скидкой
        <span className='pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[63px] h-[68px] lg:w-[74px] lg:h-[74px] rounded-full bg-rose-light flex items-center justify-center text-white font-raleway text-xl lg:text-2xl font-semibold leading-[36px]'>
          {discountPercent}
        </span>
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm onClose={closeModal} />
      </Modal>
    </>
  );
}
