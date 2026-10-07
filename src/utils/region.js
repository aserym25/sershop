const MAD_RATES = {
  MAD: 1, EUR: 0.092, USD: 0.10, GBP: 0.079, CAD: 0.137, CHF: 0.089,
  DZD: 13.4, TND: 0.31, EGP: 4.9, SAR: 0.375, AED: 0.367, TRY: 3.4,
}

const EUR_COUNTRIES = ['FR', 'DE', 'ES', 'IT', 'PT', 'BE', 'NL', 'LU', 'IE', 'AT', 'FI', 'GR']

const COUNTRY_CURRENCY = {
  MA: 'MAD', GB: 'GBP', US: 'USD', CA: 'CAD', CH: 'CHF', DZ: 'DZD',
  TN: 'TND', EG: 'EGP', SA: 'SAR', AE: 'AED', TR: 'TRY',
  ...Object.fromEntries(EUR_COUNTRIES.map(c => [c, 'EUR'])),
}

export const DEFAULT_COUNTRY = 'MA'

export const getCurrency = (country) => COUNTRY_CURRENCY[country] || 'EUR'

// Les prix du catalogue sont exprimés en MAD
export const convertFromMad = (amount, currency) =>
  Number(amount || 0) * (MAD_RATES[currency] ?? MAD_RATES.EUR)

export const formatPrice = (amountMad, currency) => {
  try {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(convertFromMad(amountMad, currency))
  } catch {
    return `${convertFromMad(amountMad, currency).toFixed(2)} ${currency}`
  }
}
