import Image from 'next/image';
import { CallToActionButton } from './call-to-action-button';

interface CallToActionSectionProps {
  discountPercent: string;
}

export function CallToActionSection({
  discountPercent,
}: CallToActionSectionProps) {
  return (
    <section
      className='relative overflow-hidden -mx-10 lg:mx-0 border-t border-b border-gradient-blue/10 mb-15 before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] 
      before:bg-gradient-to-r before:from-gradient-blue/90 before:via-gradient-purple before:to-gradient-violet/90 
      before:opacity-90 before:z-10
      
      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] 
      after:bg-gradient-to-r after:from-gradient-blue/90 after:via-gradient-purple after:to-gradient-violet/90 
      after:opacity-90 after:z-10'>
      <div className='absolute left-0 top-0 h-full hidden lg:block'>
        <Image
          src='/images/shot.jpg'
          alt='Секреты вирусных видео'
          width={608}
          height={488}
          className='h-full w-auto object-cover'
          priority
        />
      </div>

      <div className='absolute lg:hidden -top-1/3 -left-1/3  w-[352px] h-[282px] rounded-[315px] bg-gradient-violet blur-[167px]' />
      <div className='absolute lg:hidden -bottom-1/3 -right-1/3  w-[352px] h-[282px] rounded-[315px] bg-gradient-blue blur-[167px]' />

      <div className='absolute hidden lg:block right-0 top-0 w-full lg:w-[608px] h-full bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-violet opacity-30 lg:opacity-100' />
      <div className='absolute hidden lg:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[712px] h-[1486px] rounded-full bg-background blur-[167px]' />

      <div className='absolute -bottom-20 -right-42 h-[97] origin-bottom-left rotate-[-35deg] bg-gradient-to-b from-gradient-purple to-gradient-blue blur-[3px] hidden lg:flex items-center'>
        <span className='text-white font-sansation text-[34px] font-bold uppercase whitespace-nowrap'>
          Секреты вирусных видео
        </span>
      </div>

      <div className='relative pt-15 pb-28 flex flex-col items-center justify-center'>
        <div className='max-w-[280px] lg:max-w-[534px] mx-auto text-center z-10'>
          <h2 className='font-raleway text-xl lg:text-4xl font-bold uppercase text-white mb-5 leading-7 lg:leading-11'>
            Узнай, как создавать контент, который{' '}
            <span className='bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-violet bg-clip-text text-transparent'>
              покоряет аудитории
            </span>
          </h2>

          <p className='font-raleway mx-auto text-sm lg:text-2xl font-medium text-white mb-16 lg:mb-11 leading-7 lg:max-w-[447px]'>
            Материалы, способные стать вирусными и охватить тысячи людей!
          </p>

          <CallToActionButton discountPercent={discountPercent} />
        </div>
      </div>
    </section>
  );
}
