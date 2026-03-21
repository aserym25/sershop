import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 72px;
  background: ${({ theme }) => theme.colors.bg};
`

const HeroCompact = styled.section`
  padding: 4rem 2rem 3rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.gradientHero};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.black};
  margin-bottom: 0.75rem;
  animation: ${fadeUp} 0.7s ease both;

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
  animation: ${fadeUp} 0.7s ease 0.1s both;
`

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoSection = styled.div`
  animation: ${fadeUp} 0.7s ease 0.2s both;
`

const InfoTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`

const InfoIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(108, 92, 231, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`

const InfoContent = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0.3rem;
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`

const FormSection = styled.form`
  animation: ${fadeUp} 0.7s ease 0.3s both;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2rem;
`

const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  resize: vertical;
  min-height: 120px;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.spring};
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(108, 92, 231, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const SuccessMsg = styled.div`
  padding: 1rem;
  background: rgba(0, 200, 150, 0.1);
  border: 1px solid rgba(0, 200, 150, 0.3);
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  margin-top: 1rem;
`

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate sending — in production, connect to an API
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <PageWrapper>
      <HeroCompact>
        <HeroTitle>
          Nous <span className="gradient">Contacter</span>
        </HeroTitle>
        <HeroSub>Une question ? Nous sommes là pour vous aider.</HeroSub>
      </HeroCompact>

      <Content>
        <InfoSection>
          <InfoTitle>Nos coordonnées</InfoTitle>

          <InfoCard>
            <InfoIcon>📧</InfoIcon>
            <InfoContent>
              <h3>Email</h3>
              <p>contact@sershop.fr</p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoIcon>⏱️</InfoIcon>
            <InfoContent>
              <h3>Délai de réponse</h3>
              <p>Nous répondons sous 24 à 48h en jours ouvrés.</p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoIcon>📍</InfoIcon>
            <InfoContent>
              <h3>Siège</h3>
              <p>France</p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoIcon>🔗</InfoIcon>
            <InfoContent>
              <h3>Réseaux sociaux</h3>
              <p>Suivez-nous sur Facebook, Instagram et TikTok pour les dernières offres.</p>
            </InfoContent>
          </InfoCard>
        </InfoSection>

        <FormSection onSubmit={handleSubmit}>
          <FormTitle>Envoyez-nous un message</FormTitle>

          <FormGroup>
            <Label htmlFor="contact-name">Nom complet</Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact-subject">Sujet</Label>
            <Input
              id="contact-subject"
              type="text"
              placeholder="Objet de votre message"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Décrivez votre demande..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
            />
          </FormGroup>

          <SubmitBtn type="submit">✉️ Envoyer le message</SubmitBtn>

          {sent && (
            <SuccessMsg>
              ✅ Votre message a bien été envoyé ! Nous vous répondrons rapidement.
            </SuccessMsg>
          )}
        </FormSection>
      </Content>
    </PageWrapper>
  )
}

export default ContactPage
