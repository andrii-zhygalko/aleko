'use client';

import { useState } from 'react';
import { PricingCard, PricingFeature } from '@/components/ui/pricing-card';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from '@/components/forms/contact-form';

export interface TariffPlan {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  currency: string;
  features: PricingFeature[];
  badge?: string;
  bestseller?: boolean;
  variant?: 'default' | 'highlighted' | 'max';
}

interface PricingActionsProps {
  plans: TariffPlan[];
}

export function PricingActions({ plans }: PricingActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const mapVariant = (variant?: string): 'default' | 'highlighted' | 'max' => {
    if (variant === 'highlighted') return 'highlighted';
    if (variant === 'max') return 'max';
    return 'default';
  };

  return (
    <>
      <div className='flex flex-wrap justify-center gap-6 lg:gap-3.5'>
        {plans.map(plan => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            oldPrice={plan.oldPrice}
            currency={plan.currency}
            features={plan.features}
            badge={plan.badge}
            bestseller={plan.bestseller}
            variant={mapVariant(plan.variant)}
            onPurchase={openModal}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm onClose={closeModal} />
      </Modal>
    </>
  );
}
