import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_COUNTRY, getCurrency, formatPrice } from '../utils/region'

const RegionContext = createContext({
  country: DEFAULT_COUNTRY,
  currency: 'MAD',
  formatPrice: (v) => formatPrice(v, 'MAD'),
})

// Le pays est lu côté serveur depuis l'en-tête x-user-country et exposé via /api/geo
export const RegionProvider = ({ children }) => {
  const [country, setCountry] = useState(DEFAULT_COUNTRY)

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d?.country) setCountry(String(d.country).toUpperCase()) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const value = useMemo(() => {
    const currency = getCurrency(country)
    return { country, currency, formatPrice: (v) => formatPrice(v, currency) }
  }, [country])

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
}

export const useRegion = () => useContext(RegionContext)
