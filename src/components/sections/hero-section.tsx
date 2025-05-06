import Image from 'next/image';
import { HeroActions } from './hero-actions';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  price: string;
  oldPrice: string;
  discountPercent: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  imageUrl,
  price,
  oldPrice,
  discountPercent,
}: HeroSectionProps) {
  return (
    <>
      <section className='relative pt-[110px] pb-16 lg:hidden'>
        <div className='flex flex-col items-center'>
          <div className='relative w-[313px] h-[354px] rounded-[18px] overflow-hidden'>
            <Image
              src='/images/hero_image_mob.png'
              alt='photo of Aleko Sokurashvili'
              fill
              className='object-cover'
              sizes='(max-width: 1023px) 313px, 100vw'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent from-[57%] to-black/70 to-[80%]'></div>
          </div>

          <div className='relative -mt-[90px] z-10 flex flex-col items-center'>
            <h2 className='font-raleway text-[20.926px] font-bold bg-gr-hero-text text-center'>
              {subtitle}
            </h2>

            <h1 className='text-white font-raleway text-[54px] font-extrabold uppercase leading-16 text-center mt-[4px]'>
              {title}
            </h1>

            <div className='text-white font-raleway text-[14px] font-normal text-center mt-[32px] max-w-[313px]'>
              {description}
            </div>
          </div>

          <HeroActions
            discountPercent={discountPercent}
            price={price}
            oldPrice={oldPrice}
          />
        </div>
      </section>

      <section className='relative pt-[147px] pb-16 lg:pb-25 hidden lg:block'>
        <div className='flex flex-row items-start gap-10'>
          <div className='relative'>
            <div className='relative w-[644px] h-[466px] rounded-[20px] overflow-hidden'>
              <Image
                src={imageUrl}
                alt='photo of Aleko Sokurashvili'
                fill
                sizes='(min-width: 1024px) 644px, 100vw'
                className='object-cover'
                priority
              />
            </div>

            <div className='mt-[42px]'>
              <HeroActions
                discountPercent={discountPercent}
                price={price}
                oldPrice={oldPrice}
              />
            </div>
          </div>

          <div className='w-1/2 relative'>
            <div className='max-w-[396px] text-white font-raleway text-[18px] font-normal pt-21'>
              {description}
            </div>

            <div className='mt-[42px] -ml-[100px]'>
              <h2 className='font-raleway text-[32px] font-bold bg-gr-hero-text'>
                {subtitle}
              </h2>
            </div>

            <div className='mt-[15px] -ml-[100px]'>
              <h1 className='text-white font-raleway text-[96px] font-extrabold uppercase leading-none'>
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
