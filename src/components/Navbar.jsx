import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// --- التصميم باللونين الأسود والذهبي ---
const Nav = styled.nav`
  background-color: ${props => props.theme.colors.surface};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
`;

const CartContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: red; /* لون التنبيه */
  color: white;
  border-radius: 50%;
  padding: 0.15rem 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const Navbar = () => {
    // جلب معلومات السلة من الـ Context
    const { totalItems } = useCart();

    return (
        <Nav>
            <Logo to="/">Sershop</Logo>

            <CartContainer to="/cart">
                {/* أيقونة السلة (SVG) باللون الذهبي */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>

                {/* العداد يظهر فقط إذا كان هناك منتجات في السلة */}
                {totalItems > 0 && <Badge>{totalItems}</Badge>}
            </CartContainer>
        </Nav>
    );
};