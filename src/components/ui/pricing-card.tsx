'use client';

import { cn } from '@/lib/utils';
import { Button } from './button';
import {
  pricingButtonVariants,
  PricingCardVariant,
} from '@/lib/ui/button-variants';

export interface PricingFeature {
  text: string;
}

export interface PricingCardProps {
  title: string;
  price: number;
  currency?: string;
  oldPrice?: number;
  features: PricingFeature[];
  ctaText?: string;
  badge?: string;
  bestseller?: boolean;
  variant?: PricingCardVariant;
  className?: string;
  onPurchase?: () => void;
}

export function PricingCard({
  title,
  price,
  currency = '$',
  oldPrice,
  features,
  ctaText = 'Купить',
  badge,
  bestseller,
  variant = 'default',
  className,
  onPurchase,
}: PricingCardProps) {
  const cardBaseStyles =
    'w-[313px] lg:w-[360px] min-h-[430px] rounded-[28px]  p-[32px_28px] lg:p-[26px_36px] flex flex-col items-center relative shadow-[4px_6px_10px_4px_rgba(167,93,243,0.20)_inset]';

  const cardVariantStyles = {
    default: 'bg-background text-white relative overflow-hidden',
    highlighted: 'bg-white text-background',
    max: 'bg-gradient-to-br from-gradient-blue via-gradient-purple to-gradient-violet/50 text-white',
  };

  const buttonClassName = pricingButtonVariants[variant];

  const badgeStyles = {
    default: '',
    highlighted:
      'bg-background bg-gradient-to-r from-gradient-blue via-gradient-blue to-gradient-purple bg-clip-text text-transparent',
    max: 'bg-white bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-purple bg-clip-text text-transparent',
  };

  return (
    <div className='relative flex flex-col items-center mt-6'>
      {bestseller && (
        <div className='absolute -top-7 z-10 px-5 py-2 rounded-[18px] bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-violet text-white font-raleway text-base font-bold uppercase shadow-[0px_4px_16px_1px_rgba(0,0,0,0.25)] w-[169px] h-[42px] flex items-center justify-center'>
          BEST SELLER
        </div>
      )}

      <div
        className={cn(
          cardBaseStyles,
          cardVariantStyles[variant],
          'h-full',
          className
        )}>
        {variant === 'default' && (
          <>
            <div className='absolute top-0 right-0 w-[359px] h-[396px] overflow-hidden pointer-events-none'>
              <div className='absolute w-[184px] h-[174px] rounded-full bg-lavender blur-[144px] -right-[82px] -top-[80px]' />
            </div>
            <div className='absolute bottom-0 left-0 w-[360px] h-[397px] overflow-hidden pointer-events-none'>
              <div className='absolute w-[184px] h-[174px] rounded-full bg-spiro blur-[144px] -left-[82px] -bottom-[80px]' />
            </div>
          </>
        )}

        <div className='w-full min-h-[42px] flex justify-between items-center mb-2'>
          <h3 className='font-raleway text-base lg:text-xl font-semibold uppercase'>
            {title}
          </h3>
          {badge && (
            <div
              className={cn(
                'rounded-[30px] w-[119px] h-[42px] flex items-center justify-center font-raleway text-base font-bold uppercase py-[10px] px-[34px]',
                variant === 'highlighted' ? 'bg-background' : 'bg-white'
              )}>
              <span className={badgeStyles[variant]}>{badge}</span>
            </div>
          )}
        </div>

        <div className='flex items-baseline mb-3 w-full'>
          <span className='font-manrope text-[64px] lg:text-[74px] font-bold uppercase'>
            {price}
          </span>
          <span className='ml-[8px] font-manrope text-[74px] font-bold'>
            {currency}
          </span>
          {oldPrice && (
            <span className='ml-[22px] font-manrope text-xl font-bold uppercase line-through opacity-70'>
              {oldPrice}
              {currency}
            </span>
          )}
        </div>

        <div className='w-full mb-auto'>
          <ul>
            {features.map((feature, index) => (
              <li key={index} className='flex items-center'>
                <div
                  className={cn(
                    'w-[20px] h-[20px] rounded-full mr-[8px] flex-shrink-0',
                    variant === 'highlighted' ? 'bg-background' : 'bg-white'
                  )}
                />
                <span className='font-raleway text-[16px] font-semibold uppercase py-1.5'>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={onPurchase} className={cn(buttonClassName)}>
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
