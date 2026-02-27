import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useCart } from '../context/CartContext'
import { orderProductViaWhatsApp } from '../utils/whatsapp'

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`

const Card = styled.article`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${fadeIn} 0.5s ease both;
  animation-delay: ${({ $index }) => $index * 0.06}s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSecondary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${({ $type, theme }) =>
    $type === 'Bestseller' || $type === 'Top Vente'
      ? theme.colors.gradientGold
      : $type === 'Nouveau'
        ? 'linear-gradient(135deg, #00C896, #00A878)'
        : $type === 'Gaming'
          ? 'linear-gradient(135deg, #FF4757, #C44569)'
          : theme.colors.gradientPrimary};
  color: white;
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`

const OutOfStock = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 26, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const WishlistBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(10, 10, 26, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ $active }) => $active ? '#FF4757' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  opacity: 0;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.15);
    border-color: #FF4757;
  }
`

const Body = styled.div`
  padding: 1.25rem;
`

const Category = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const StockStatus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ $inStock, theme }) => $inStock ? '#00C896' : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    box-shadow: 0 0 6px currentColor;
  }
`

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0.4rem 0 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;

  .stars {
    color: ${({ theme }) => theme.colors.accentGold};
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  .score {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .count {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`

const Discount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.success};
  background: rgba(0, 200, 150, 0.12);
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
`

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.spring};
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);

  &:hover:not(:disabled) {
    transform: scale(1.1) rotate(3deg);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const WhatsAppButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.spring};
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);

  &:hover:not(:disabled) {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.55);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const getStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0))
}

const getDiscount = (price, original) =>
  Math.round(((original - price) / original) * 100)

export const ProductCard = ({ product, index = 0, onClick }) => {
  const { addToCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (!product.inStock) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWhatsApp = (e) => {
    e.stopPropagation()
    if (!product.inStock) return
    orderProductViaWhatsApp(product)
  }

  const price = Number(product.price) || 0
  const originalPrice = Number(product.originalPrice) || price
  const discount = originalPrice > price ? getDiscount(price, originalPrice) : 0

  return (
    <Card $index={index} onClick={onClick}>
      <ImageWrapper>
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.badge && <Badge $type={product.badge}>{product.badge}</Badge>}
        {!product.inStock && <OutOfStock>Épuisé</OutOfStock>}
        <WishlistBtn
          $active={wishlisted}
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
          aria-label="Ajouter aux favoris"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </WishlistBtn>
      </ImageWrapper>

      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Category>{product.category}</Category>
          <StockStatus $inStock={product.inStock}>
            {product.inStock ? 'En stock' : 'Épuisé'}
          </StockStatus>
        </div>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>

        <Rating>
          <span className="stars">{getStars(Number(product.rating) || 0)}</span>
          <span className="score">{Number(product.rating || 0).toFixed(1)}</span>
          <span className="count">({(Number(product.reviews) || 0).toLocaleString()})</span>
        </Rating>

        <PriceRow>
          <Prices>
            <Price style={{ color: '#D4AF37', fontWeight: 'bold' }}>
              {price.toFixed(2)} MAD
            </Price>
            {originalPrice > price && (
              <OriginalPrice>{originalPrice.toFixed(2)} MAD</OriginalPrice>
            )}
            {discount > 0 && <Discount>-{discount}%</Discount>}
          </Prices>
          <AddButton
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label="Ajouter au panier"
            id={`add-to-cart-${product.id}`}
          >
            {added ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </AddButton>

          <WhatsAppButton
            onClick={handleWhatsApp}
            disabled={!product.inStock}
            aria-label="Commander via WhatsApp"
            id={`whatsapp-order-${product.id}`}
            title="Commander via WhatsApp"
          >
            {/* WhatsApp SVG icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </WhatsAppButton>
        </PriceRow>
      </Body>
    </Card>
  )
}

export default ProductCard
