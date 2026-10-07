import React from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useRegion } from '../context/RegionContext'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 6rem auto 4rem;
  padding: 0 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #D4AF37;
  margin-bottom: 2rem;
`

const Empty = styled.div`
  text-align: center;
  padding: 4rem;
  color: #888;
  font-size: 1.1rem;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  margin-bottom: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
`

const ItemInfo = styled.div`
  flex: 1;
  h3 { margin: 0 0 0.3rem; font-size: 1rem; color: #fff; }
  p  { margin: 0; color: #D4AF37; font-weight: bold; }
`

const Total = styled.div`
  text-align: right;
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #D4AF37;
`

const CheckoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #D4AF37, #B8960C);
  color: #000;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  letter-spacing: 0.02em;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(212, 175, 55, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`

export const CartPage = () => {
  const { cartItems } = useCart()
  const { formatPrice } = useRegion()
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0)

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Wrapper>
      <Title>🛒 Mon Panier</Title>
      {cartItems.length === 0 ? (
        <Empty>Votre panier est vide.</Empty>
      ) : (
        <>
          {cartItems.map((item, i) => (
            <Item key={item.id ?? i}>
              {item.image && <img src={item.image} alt={item.title} />}
              <ItemInfo>
                <h3>{item.title}</h3>
                <p>{formatPrice(item.price)} × {item.quantity || 1}</p>
              </ItemInfo>
            </Item>
          ))}

          <Total>Total : {formatPrice(total)}</Total>

          <CheckoutBtn
            onClick={handleCheckout}
            aria-label="Procéder au paiement"
          >
            Procéder au paiement →
          </CheckoutBtn>
        </>
      )}
    </Wrapper>
  )
}

export default CartPage
