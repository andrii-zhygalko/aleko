import type { Metadata } from 'next';
import { Inter, Manrope, Montserrat, Raleway } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/layout/header';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-manrope',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '700'],
  variable: '--font-montserrat',
});

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-raleway',
});

const sansation = localFont({
  src: '../fonts/Sansation-Bold.ttf',
  weight: '700',
  variable: '--font-sansation',
});

export const metadata: Metadata = {
  title: 'Алеко Сокурашвили | Секреты вирусных видео',
  description:
    'Узнайте, как создавать контент, который покоряет аудиторию. От 0 до 100,000 просмотров за 90 дней.',
  keywords:
    'вирусные видео, контент, тикток, инстаграм, социальные сети, блогинг, курс',
  openGraph: {
    title: 'Алеко Сокурашвили | Секреты вирусных видео',
    description:
      'Узнайте, как создавать контент, который покоряет аудиторию. От 0 до 100,000 просмотров за 90 дней.',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru' className='scroll-smooth'>
      <body
        className={`${inter.variable} ${manrope.variable} ${montserrat.variable} ${raleway.variable} ${sansation.variable} antialiased text-white min-h-screen flex flex-col relative`}>
        <div className='relative w-full flex-1 overflow-hidden'>
          <div className='main-gradient ' aria-hidden='true' />
          <div className='second-gradient' aria-hidden='true' />
          <div className='third-gradient' aria-hidden='true' />
          <Header />
          <main className='container flex-grow relative z-10'>{children}</main>
        </div>
      </body>
    </html>
  );
}
