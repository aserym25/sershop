import React from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { orderCartViaWhatsApp } from '../utils/whatsapp'

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

const WhatsAppCheckoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  letter-spacing: 0.02em;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(37, 211, 102, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    flex-shrink: 0;
  }
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

          <WhatsAppCheckoutBtn
            onClick={() => orderCartViaWhatsApp(cartItems)}
            id="whatsapp-cart-checkout"
            aria-label="Commander tout le panier via WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Commander via WhatsApp
          </WhatsAppCheckoutBtn>
        </>
      )}
    </Wrapper>
  )
}

export default CartPage
