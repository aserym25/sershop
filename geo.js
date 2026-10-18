// Pays du visiteur : en-tête x-user-country (Nginx), sinon cf-ipcountry (Cloudflare)
export const getCountry = (req) => {
  const raw = req.headers['x-user-country'] || req.headers['cf-ipcountry'] || ''
  const code = String(raw).trim().toUpperCase()
  
  // 1. Si on est en production (Hetzner) et qu'un code valide est trouvé
  if (/^[A-Z]{2}$/.test(code)) {
    return code
  }

  // 2. Fallback SERSHOP (Local) : Si on travaille sur notre ordinateur,
  // on simule un pays par défaut pour tester notre interface (ex: MA pour Maroc, FR pour France).
  const host = req.headers['host'] || '';
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'MA' // <-- Modifiez ce 'MA' en 'FR' pour tester l'affichage européen
  }

  return 'MA' // Fallback global de sécurité si tout échoue
}

export const geoHandler = (req, res, next) => {
  if (req.url.split('?')[0] !== '/api/geo') return next()
  
  // Ajout des en-têtes CORS pour éviter les erreurs de sécurité en local
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  
  res.end(JSON.stringify({ country: getCountry(req) }))
}