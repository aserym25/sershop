import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pages = {
  '/': {
    title: 'SearShop | Produits et ressources numériques',
    description: 'Trouvez, comparez et découvrez des produits et ressources numériques sélectionnés par SearShop.',
  },
  '/shop': {
    title: 'Boutique | SearShop',
    description: 'Découvrez les produits, ebooks et ressources numériques disponibles dans la boutique SearShop.',
  },
  '/about': {
    title: 'À propos de SearShop',
    description: 'Découvrez la mission de SearShop et notre sélection de produits et ressources numériques.',
  },
  '/faq': {
    title: 'FAQ | SearShop',
    description: 'Retrouvez les réponses aux questions fréquentes sur les commandes, la livraison et les ressources SearShop.',
  },
  '/contact': {
    title: 'Contact | SearShop',
    description: 'Contactez SearShop pour toute question concernant nos produits et ressources numériques.',
  },
  '/legal': {
    title: 'Mentions légales | SearShop',
    description: 'Consultez les mentions légales, la confidentialité et les conditions d’utilisation de SearShop.',
  },
}

export const Seo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pages[pathname] || pages['/']
    const canonicalUrl = `https://sershop.fr${pathname === '/' ? '/' : pathname}`

    document.title = page.title

    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', page.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    canonical?.setAttribute('href', canonicalUrl)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    ogTitle?.setAttribute('content', page.title)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    ogDescription?.setAttribute('content', page.description)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    ogUrl?.setAttribute('content', canonicalUrl)
  }, [pathname])

  return null
}
