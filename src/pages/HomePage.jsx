import React, { useState, useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { ProductCard } from '../components/ProductCard'
import { supabase, saveCache } from '../services/supabase'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`
const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`

/* ── Hero ───────────────────────────────────────────────── */
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 4rem;
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
    height: 200px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`
const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  animation: ${fadeUp} 0.9s ease both;
`
const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(108,92,231,0.15);
  border: 1px solid rgba(108,92,231,0.35);
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0.4rem 1.1rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primaryLight};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;

  span {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    animation: pulse 2s ease-in-out infinite;
  }
`
const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 5rem);
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
const HeroSub = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.75;
`
const HeroCTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`
const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.2rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  box-shadow: 0 8px 30px rgba(108,92,231,0.4);
  transition: all ${({ theme }) => theme.transitions.spring};

  &:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(108,92,231,0.6); }
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
const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`
const Stat = styled.div`
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
const FilterBtn = styled.button`
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

const ALL_CATEGORIES = ['Tous', 'Tech', 'Audio', 'Montres', 'Maison', 'Mode', 'Livres']

export const HomePage = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Tous')

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    let query = supabase.from('products').select('*').order('id', { ascending: true })
    if (activeCategory !== 'Tous') query = query.eq('category', activeCategory)

    const { data, error: err } = await query

    if (err) {
      setError('Impossible de charger les produits.')
    } else {
      // Supabase returns 'in_stock' but frontend expects 'inStock'
      const formattedData = (data || []).map(p => ({
        ...p,
        inStock: p.in_stock
      }))
      setProducts(formattedData)
      if (activeCategory === 'Tous') saveCache(formattedData)
    }
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [activeCategory])

  const filtered = useMemo(() => {
    if (!searchQuery) return products
    const q = searchQuery.toLowerCase()
    return products.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection>
        <HeroContent>
          <HeroBadge><span />🛍️ Les meilleures offres du moment</HeroBadge>
          <HeroTitle>
            Trouvez, Comparez,<br />
            <span className="gradient">Achetez Mieux</span>
          </HeroTitle>
          <HeroSub>
            Des milliers de produits sélectionnés, des prix imbattables.<br />
            SearShop vous aide à faire les meilleurs choix.
          </HeroSub>
          <HeroCTA>
            <BtnPrimary href="#products" id="hero-shop-btn">🚀 Découvrir les produits</BtnPrimary>
            <BtnSecondary href="https://temu.to/k/ecg15ib5igw" target="_blank" rel="noopener noreferrer">🔥 Mega Offres Temu ›</BtnSecondary>
          </HeroCTA>
          <Stats>
            <Stat><strong>10k+</strong><span>Produits</span></Stat>
            <Stat><strong>50k+</strong><span>Clients</span></Stat>
            <Stat><strong>-40%</strong><span>En moyenne</span></Stat>
            <Stat><strong>4.8★</strong><span>Satisfaction</span></Stat>
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
              >
                {cat}
              </FilterBtn>
            ))}
          </FilterRow>
        </SectionHeader>

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
                      window.open(link, '_blank');
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
      </ShopSection>
    </>
  )
}

export default HomePage