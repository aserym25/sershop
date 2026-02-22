import React from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'

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

export const CartPage = () => {
  const { cartItems } = useCart()

  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0)

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
                <p>{Number(item.price || 0).toFixed(2)} MAD × {item.quantity || 1}</p>
              </ItemInfo>
            </Item>
          ))}
          <Total>Total : {total.toFixed(2)} MAD</Total>
        </>
      )}
    </Wrapper>
  )
}

export default CartPage
