export const TARIFF_PLANS_QUERY = `
  query TariffPlansQuery {
    allTariffplans {
      id
      title
      bestseller
      price
      oldprice
      currency
      badge
      variant
      features {
        text
      }
      ordernumber
    }
  }
`;
