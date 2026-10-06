import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AnimatePresence, m } from 'framer-motion'
import { sendChatMessageViaWhatsApp } from '../utils/whatsapp'

const AVATAR = '/Chatbot/avatar.png'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.55); }
  70% { box-shadow: 0 0 0 16px rgba(108, 92, 231, 0); }
  100% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0); }
`

const Bubble = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  width: 64px;
  height: 64px;
  padding: 0;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  animation: ${pulse} 2.4s infinite;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Panel = styled(m.section)`
  position: fixed;
  right: 20px;
  bottom: 96px;
  z-index: 1000;
  width: min(360px, calc(100vw - 24px));
  max-height: min(520px, calc(100vh - 120px));
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  color: #172033;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  font-family: ${({ theme }) => theme.fonts?.body || 'sans-serif'};
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  background: linear-gradient(135deg, #3d2db5, #6c5ce7);
  color: #fff;

  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.85);
    flex-shrink: 0;
  }
  strong { display: block; font-size: 1rem; }
  span { display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; opacity: 0.9; }
  span::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #00c896; }
`

const CloseBtn = styled.button`
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
`

const Body = styled.div`
  padding: 1rem;
  background: #f4f6fb;
  overflow-y: auto;
`

const Message = styled.p`
  margin: 0;
  padding: 0.7rem 0.9rem;
  max-width: 85%;
  border-radius: 14px 14px 14px 4px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 0.92rem;
  line-height: 1.45;
`

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid #e2e8f0;
  background: #fff;

  input {
    flex: 1;
    min-width: 0;
    padding: 0.65rem 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    font: inherit;
    font-size: 0.9rem;
    color: #172033;
  }
  button {
    padding: 0 1rem;
    border: 0;
    border-radius: 999px;
    background: #25d366;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
`

export const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = text.trim()
    if (!message) return
    sendChatMessageViaWhatsApp(message)
    setText('')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <Panel
            role="dialog"
            aria-label="Discuter avec Sershop"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Header>
              <img src={AVATAR} alt="Conseiller Sershop" width="46" height="46" />
              <div>
                <strong>Sershop</strong>
                <span>En ligne</span>
              </div>
              <CloseBtn type="button" aria-label="Fermer le chat" onClick={() => setOpen(false)}>×</CloseBtn>
            </Header>
            <Body>
              <Message>
                Bonjour 👋 Comment puis-je vous aider ? Écrivez votre question, elle sera envoyée sur WhatsApp et nous vous répondrons rapidement.
              </Message>
            </Body>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Votre message..."
                aria-label="Votre message"
              />
              <button type="submit">Envoyer</button>
            </Form>
          </Panel>
        )}
      </AnimatePresence>
      <Bubble
        type="button"
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        onClick={() => setOpen((v) => !v)}
      >
        <img src={AVATAR} alt="" width="64" height="64" />
      </Bubble>
    </>
  )
}
