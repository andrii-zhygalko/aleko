import Link from 'next/link';
import HeaderActions from './header-actions';

const menuItems = [
  { title: 'Структура', href: '#structure' },
  { title: 'Обо мне', href: '#about' },
  { title: 'Плюсы', href: '#benefits' },
  { title: 'Отзывы', href: '#testimonials' },
  { title: 'FAQ', href: '#faq' },
];

export default function Header() {
  return (
    <header className='container fixed top-0 left-0 right-0 z-30 bg-opacity-90 backdrop-blur-md'>
      <div className='mx-auto pt-12 lg:py-10'>
        <div className='flex flex-wrap items-center justify-between py-2'>
          <div className='flex items-center'>
            <Link href='/' className='font-bold text-xl text-white'>
              <span className='text-white text-lg font-sansation'>ALEKO</span>
              <span className='bg-gr-header-text text-lg font-sansation'>
                {' '}
                SOKURASHVILI
              </span>
            </Link>
          </div>

          <HeaderActions menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
