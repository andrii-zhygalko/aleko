import { type ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

export const buttonVariants: Record<ButtonVariant, ClassValue> = {
  primary:
    'bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-violet text-white hover:from-blue-600 hover:to-purple-700 rounded-full',
  secondary: 'bg-white text-gray-900 hover:bg-gray-100 rounded-full',
  outline:
    'border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 rounded-full',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 rounded-full',
  light: 'bg-white text-background hover:bg-gray-100',
  dark: 'bg-background text-white hover:bg-gray-900',
  submit: 'w-full py-[10px] px-[6px] rounded-[12px] bg-white text-background',
  ctaHero:
    'relative w-full lg:w-[534px] h-[74px] px-[30px] rounded-full bg-white hover:bg-gradient-purple text-black shadow-[7px_11px_18px_7px_rgba(167,93,243,0.20)_inset] font-raleway text-[22px] font-semibold leading-[36px]',
  cta: 'w-full lg:w-[534px] h-[68px] lg:h-[74px] px-4 lg:px-[31px] rounded-full text-white shadow-[7px_11px_18px_7px_rgba(167,93,243,0.20)_inset] font-raleway text-sm lg:text-[22px] font-semibold leading-[36px] bg-gr-secondary hover:shadow-lg',
  contactForm:
    'bg-white text-background hover:bg-gray-50 font-raleway text-base font-semibold',
};

export const buttonSizes = {
  sm: 'py-2.5 px-10 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'light'
  | 'dark'
  | 'submit'
  | 'ctaHero'
  | 'cta'
  | 'contactForm';

export type ButtonSize = 'sm' | 'md' | 'lg';

const pricingButtonBase =
  'w-[256px] h-[47px] lg:w-[287px] lg:h-[57px] rounded-[52px] text-sm lg:text-base font-manrope font-semibold py-[17px] px-[64px] mt-auto';

export const pricingButtonVariants: Record<PricingCardVariant, ClassValue> = {
  default: cn(pricingButtonBase, 'bg-white text-background hover:bg-gray-100'),
  highlighted: cn(
    pricingButtonBase,
    'bg-background text-white hover:bg-gray-900'
  ),
  max: cn(pricingButtonBase, 'bg-white text-background hover:bg-gray-100'),
};

export const pricingCardToButtonVariant: Record<
  PricingCardVariant,
  ButtonVariant
> = {
  default: 'light',
  highlighted: 'dark',
  max: 'light',
};

export type PricingCardVariant = 'default' | 'highlighted' | 'max';
