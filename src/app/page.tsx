import { HeroSection } from '@/components/sections/hero-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import { fetchFromDatoCMS } from '@/app/api/cms/datocms';
import { TARIFF_PLANS_QUERY } from '@/app/api/cms/queries';
import { PricingFeature } from '@/components/ui/pricing-card';

interface TariffPlan {
  id: string;
  title: string;
  bestseller?: boolean;
  price: number;
  oldprice?: number;
  currency: string;
  badge?: string;
  variant?: 'default' | 'highlighted' | 'max';
  features: PricingFeature[];
  ordernumber: number;
}

interface TariffplansData {
  allTariffplans: TariffPlan[];
}

export default async function Home() {
  const homeContent = {
    title: 'СЕКРЕТЫ ВИРУСНЫХ ВИДЕО',
    subtitle: 'От 0 до 100,000 за 90 дней',
    description:
      'Станьте известным всего за 3 месяца без затрат на рекламу! Узнайте ключ к созданию вирусного контента и превратите свои идеи в миллионные просмотры.',
    imageUrl: '/images/hero_image.png',
    price: '1000 грн',
    oldPrice: '2000 грн',
    discountPercent: '-50%',
  };

  let tariffPlans: TariffPlan[] = [];

  try {
    const data = await fetchFromDatoCMS<TariffplansData>({
      query: TARIFF_PLANS_QUERY,
    });

    tariffPlans = data.allTariffplans;
  } catch (e) {
    console.error('Error fetching tariff plans:', e);
  }

  const normalizedPlans = tariffPlans.map(plan => ({
    ...plan,
    oldPrice: plan.oldprice,
  }));

  const sortedPlans = [...normalizedPlans].sort(
    (a, b) => a.ordernumber - b.ordernumber
  );

  return (
    <>
      <HeroSection
        title={homeContent.title}
        subtitle={homeContent.subtitle}
        description={homeContent.description}
        imageUrl={homeContent.imageUrl}
        price={homeContent.price}
        oldPrice={homeContent.oldPrice}
        discountPercent={homeContent.discountPercent}
      />

      <PricingSection title='ТАРИФЫ' plans={sortedPlans} />

      <CallToActionSection discountPercent={homeContent.discountPercent} />
    </>
  );
}
