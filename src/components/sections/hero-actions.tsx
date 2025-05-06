'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from '@/components/forms/contact-form';

interface HeroActionsProps {
  discountPercent: string;
  price: string;
  oldPrice: string;
}

export function HeroActions({
  discountPercent,
  price,
  oldPrice,
}: HeroActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className='mt-[44px] flex flex-col items-start w-full'>
        <Button onClick={openModal} variant='ctaHero' className=''>
          Купить со скидкой
          <span className='pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[74px] h-[74px] rounded-full bg-rose-light flex items-center justify-center text-white font-raleway text-[24px] font-semibold leading-[36px]'>
            {discountPercent}
          </span>
        </Button>

        <div className='mt-[11px] flex items-center justify-center self-center lg:pr-12'>
          <span className='text-rose-light font-raleway text-[24px] font-semibold leading-[36px]'>
            {price}
          </span>
          <span className='ml-[16px] text-silver font-raleway text-[14px] font-semibold leading-[36px] line-through'>
            {oldPrice}
          </span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm onClose={closeModal} />
      </Modal>
    </>
  );
}
