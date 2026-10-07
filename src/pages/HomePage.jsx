import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutGroup, m } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import { ProductCard } from '../components/ProductCard'
import { useRegion } from '../context/RegionContext'
import { supabase, saveCache } from '../services/supabase'
import { products as localProducts, categories } from '../data/products'
import { useCart } from '../context/CartContext'

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`
const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } }
}
const heroItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
}

/* ── Hero ───────────────────────────────────────────────── */
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6.5rem 2rem 2.5rem;
  background: ${({ theme }) => theme.colors.gradientHero};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 60% 40%, rgba(108,92,231,0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 70%, rgba(0,200,150,0.12) 0%, transparent 50%);
    animation: float 8s ease-in-out infinite;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`
const HeroContent = styled(m.div)`
  position: relative;
  z-index: 1;
  max-width: 820px;
`
const HeroTitle = styled(m.h1)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4.5vw, 3.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.black};
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  .gradient {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`
const HeroSub = styled(m.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.75;
`
const HeroCTA = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`
const BtnPrimary = styled(m.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.2rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  box-shadow: 0 8px 30px rgba(108,92,231,0.4);
  transition: box-shadow ${({ theme }) => theme.transitions.spring};

  &:hover { box-shadow: 0 12px 40px rgba(108,92,231,0.6); }
`
const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.2rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.normal};
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    color: white;
    background: rgba(108,92,231,0.1);
  }
`
const Stats = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`
const Stat = styled(m.div)`
  text-align: center;
  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.black};
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`

/* ── Shop Section ───────────────────────────────────────── */
const ShopSection = styled.section`
  max-width: 1300px;
  margin: 0 auto;
  padding: 4rem 2rem;
`
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`
const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  span {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`
const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`
const FilterBtn = styled(m.button)`
  padding: 0.4rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ $active, theme }) => $active ? 'transparent' : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.gradientPrimary : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.textSecondary};
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(108,92,231,0.35)' : 'none'};
  cursor: pointer;

  &:hover { border-color: ${({ theme }) => theme.colors.primaryLight}; color: white; }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
`
const SkeletonCard = styled.div`
  border-radius: 16px;
  height: 380px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgCard} 25%,
    rgba(108,92,231,0.08) 50%,
    ${({ theme }) => theme.colors.bgCard} 75%
  );
  background-size: 1200px 100%;
  animation: ${shimmer} 1.6s infinite linear;
`
const Empty = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  svg { margin: 0 auto 1rem; opacity: 0.3; }
`
const RetryBtn = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  &:hover { opacity: 0.85; }
`

const ALL_CATEGORIES = categories

export const HomePage = ({ searchQuery = '' }) => {
  const location = useLocation()
  const { country } = useRegion()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const urlCat = new URLSearchParams(location.search).get('cat')
  const requestedProductId = new URLSearchParams(location.search).get('add')
  const handledProductRequest = useRef(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(urlCat && categories.includes(urlCat) ? urlCat : 'Tous')

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    // Supabase non configuré : on utilise directement les produits locaux, sans tenter d'appel réseau ni logguer d'erreur
    if (!supabase) {
      let fallback = [...localProducts]
      if (activeCategory !== 'Tous') {
        fallback = fallback.filter(p => p.category === activeCategory)
      }
      setProducts(fallback)
      setError(fallback.length === 0 ? 'Aucun produit disponible pour le moment.' : null)
      setLoading(false)
      return
    }

    try {
      let query = supabase.from('products').select('*').order('id', { ascending: true })
      if (activeCategory !== 'Tous') query = query.eq('category', activeCategory)

      const { data, error: err } = await query

      if (err) throw err

      // Supabase returns 'in_stock' but frontend expects 'inStock'
      const formattedData = (data || []).map(p => {
        let finalLink = p.affiliate_link || p.affiliateLink;
        if (finalLink && /temu\.to|temu\.com/i.test(finalLink)) {
          finalLink = null;
        }
        return {
          ...p,
          inStock: p.in_stock,
          affiliate_link: finalLink,
          affiliateLink: finalLink
        }
      })

      // Combiner avec les produits locaux qui ne sont pas dans Supabase
      const existingIds = new Set(formattedData.map(p => p.id));
      const newLocalProducts = localProducts.filter(p => !existingIds.has(p.id));

      let allProducts = [...formattedData, ...newLocalProducts];

      // Réappliquer le filtre si une catégorie est sélectionnée
      if (activeCategory !== 'Tous') {
        allProducts = allProducts.filter(p => p.category === activeCategory);
      }

      setProducts(allProducts)
      if (activeCategory === 'Tous') saveCache(allProducts)

    } catch (err) {
      console.error('Supabase error, fallback to local products:', err)
      // Fallback : utiliser les produits locaux si Supabase est indisponible
      let fallback = [...localProducts]
      if (activeCategory !== 'Tous') {
        fallback = fallback.filter(p => p.category === activeCategory)
      }
      setProducts(fallback)
      // Afficher un avertissement discret au lieu de bloquer la page
      if (fallback.length === 0) {
        setError('Aucun produit disponible pour le moment.')
      } else {
        setError(null) // Produits locaux disponibles, pas d'erreur bloquante
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    if (urlCat && categories.includes(urlCat) && urlCat !== activeCategory) {
      setActiveCategory(urlCat)
    }
  }, [urlCat])

  useEffect(() => { fetchProducts() }, [activeCategory])

  useEffect(() => {
    if (loading || !requestedProductId || handledProductRequest.current) return

    const product = products.find(item => String(item.id) === requestedProductId)
    if (!product) return

    addToCart(product)
    handledProductRequest.current = true
    navigate('/cart', { replace: true })
  }, [loading, products, requestedProductId, addToCart, navigate])

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    const list = searchQuery ? products.filter(p => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)) : [...products]
    // MA : produits physiques (livraison) d'abord ; autres pays : produits numeriques d'abord
    const dir = country === 'MA' ? 1 : -1
    return list.sort((a, b) => dir * (Number(!!a.isDigital) - Number(!!b.isDigital)))
  }, [products, searchQuery, country])

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection>
        <HeroContent variants={heroContainerVariants} initial="hidden" animate="visible">
          <HeroTitle variants={heroItemVariants}>
            Trouvez, Apprenez,
            {' '}<span className="gradient">Achetez Mieux</span>
          </HeroTitle>
          <HeroSub variants={heroItemVariants}>
            Des dizaines de produits sélectionnés, des prix imbattables.<br />
            SerShop vous aide à faire les meilleurs choix.
          </HeroSub>
          <HeroCTA variants={heroItemVariants}>
            <BtnPrimary
              href="#products"
              id="hero-shop-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            >
              🚀 Découvrir les produits
            </BtnPrimary>
          </HeroCTA>
          <Stats variants={heroContainerVariants}>
            <Stat variants={heroItemVariants}><strong>10k+</strong><span>Produits</span></Stat>
            <Stat variants={heroItemVariants}><strong>50k+</strong><span>Clients</span></Stat>
            <Stat variants={heroItemVariants}><strong>-40%</strong><span>En moyenne</span></Stat>
            <Stat variants={heroItemVariants}><strong>4.8★</strong><span>Satisfaction</span></Stat>
          </Stats>
        </HeroContent>
      </HeroSection>

      {/* ── Shop ── */}
      <ShopSection id="products">
        <SectionHeader>
          <SectionTitle>Produits <span>Populaires</span></SectionTitle>
          <FilterRow>
            {ALL_CATEGORIES.map(cat => (
              <FilterBtn
                key={cat}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase()}`}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
              </FilterBtn>
            ))}
          </FilterRow>
        </SectionHeader>

        <LayoutGroup>
          <Grid>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : error ? (
              <Empty>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                </svg>
                <p>{error}</p>
                <RetryBtn onClick={fetchProducts}>↺ Réessayer</RetryBtn>
              </Empty>
            ) : filtered.length > 0 ? (
              filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onClick={() => {
                    const link = p.affiliate_link || p.affiliateLink;
                    if (link) {
                      if (link.startsWith('/')) {
                        window.location.href = link;
                      } else {
                        window.open(link, '_blank', 'noopener,noreferrer');
                      }
                    }
                  }}
                />
              ))
            ) : (
              <Empty>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p>Aucun produit trouvé{searchQuery ? ` pour "${searchQuery}"` : '.'}</p>
              </Empty>
            )}
          </Grid>
        </LayoutGroup>
      </ShopSection>
    </>
  )
}

export default HomePage