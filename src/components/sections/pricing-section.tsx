import { PricingActions, TariffPlan } from './pricing-actions';

export interface PricingSectionProps {
  title: string;
  plans: TariffPlan[];
}

export function PricingSection({ title, plans }: PricingSectionProps) {
  return (
    <section id='pricing' className='mt-16 mb-19 lg:mt-25 lg:mb-50'>
      <h2 className='text-2xl lg:text-5xl font-bold text-center text-white pb-7 lg:pb-20 uppercase font-raleway'>
        {title}
      </h2>

      <PricingActions plans={plans} />
    </section>
  );
}
