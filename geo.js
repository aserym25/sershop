// Pays du visiteur : en-tête x-user-country, sinon cf-ipcountry (Cloudflare)
export const getCountry = (req) => {
  const raw = req.headers['x-user-country'] || req.headers['cf-ipcountry'] || ''
  const code = String(raw).trim().toUpperCase()
  return /^[A-Z]{2}$/.test(code) ? code : null
}

export const geoHandler = (req, res, next) => {
  if (req.url.split('?')[0] !== '/api/geo') return next()
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify({ country: getCountry(req) }))
}
