import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${slideDown} 0.5s ease;

  background: ${({ $scrolled }) =>
    $scrolled
      ? 'rgba(10, 10, 26, 0.95)'
      : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(20px)' : 'none')};
  border-bottom: ${({ $scrolled, theme }) =>
    $scrolled ? `1px solid ${theme.colors.border}` : 'none'};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;

  img {
    height: 40px;
    width: auto;
    filter: drop-shadow(0 0 8px rgba(108, 92, 231, 0.5));
    transition: transform ${({ theme }) => theme.transitions.spring};
  }

  &:hover img {
    transform: scale(1.1) rotate(-3deg);
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme, $active }) => $active ? theme.colors.primaryLight : theme.colors.textSecondary};
  position: relative;
  transition: color ${({ theme }) => theme.transitions.fast};
  letter-spacing: 0.02em;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    border-radius: 2px;
    transition: width ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    &::after { width: 100%; }
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0.5rem 1rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
    background: rgba(255,255,255,0.1);
  }

  input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    width: 180px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 120px;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    flex-shrink: 0;
  }
`

const CartButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(108, 92, 231, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    background: rgba(108, 92, 231, 0.3);
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 200, 150, 0.5);
`

const ShopButton = styled(Link)`
  padding: 0.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(108, 92, 231, 0.5);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const Header = ({ onSearch, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { totalItems } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <Nav $scrolled={scrolled}>
      <Logo to="/">
        <img src="/logo_1.png" alt="SearShop" />
      </Logo>

      <NavLinks>
        <NavLink to="/" $active={location.pathname === '/'}>Accueil</NavLink>
        <NavLink to="/shop" $active={location.pathname === '/shop'}>Boutique</NavLink>
        <NavLink as="a" href="https://temu.to/k/ecg15ib5igw" target="_blank" rel="noopener noreferrer">🔥 Offres Temu</NavLink>
        <NavLink to="/about" $active={location.pathname === '/about'}>À propos</NavLink>
      </NavLinks>

      <NavActions>
        <SearchBar>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchVal}
            onChange={handleSearch}
            id="search-input"
          />
        </SearchBar>

        <CartButton id="cart-button" onClick={onCartOpen} aria-label="Panier">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </CartButton>

        <ShopButton to="/shop">Acheter</ShopButton>
      </NavActions>
    </Nav>
  )
}

export default Header
