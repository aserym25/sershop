import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  padding: 5rem 2rem 4rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.gradientHero};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 60% 40%, rgba(108,92,231,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 70%, rgba(0,200,150,0.1) 0%, transparent 50%);
  }

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
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.black};
  margin-bottom: 1rem;
  position: relative;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  position: relative;
  animation: ${fadeUp} 0.7s ease 0.1s both;
`

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0 3rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2rem;
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${fadeUp} 0.7s ease ${({ $delay }) => $delay || '0.2s'} both;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-4px);
  }
`

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 3rem 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    width: 4px;
    height: 28px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    border-radius: 4px;
  }
`

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1.25rem;
`

const CTASection = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-top: 3rem;
`

const CTATitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.75rem;
`

const CTAText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.35);
  transition: all ${({ theme }) => theme.transitions.spring};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(108, 92, 231, 0.5);
  }
`

export const AboutPage = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [location.hash])

  return (
    <PageWrapper>
      <HeroCompact>
        <HeroTitle>
          À propos de <span className="gradient">SearShop</span>
        </HeroTitle>
        <HeroSub>
          Votre guide pour les meilleures offres en ligne. Nous dénichons les meilleurs produits aux meilleurs prix.
        </HeroSub>
      </HeroCompact>

      <Content>
        <Grid>
          <Card $delay="0.2s">
            <CardIcon>🔍</CardIcon>
            <CardTitle>Sélection rigoureuse</CardTitle>
            <CardText>
              Chaque produit est soigneusement sélectionné pour son rapport qualité-prix et sa pertinence.
            </CardText>
          </Card>
          <Card $delay="0.3s">
            <CardIcon>💰</CardIcon>
            <CardTitle>Meilleurs prix</CardTitle>
            <CardText>
              Nous comparons les offres pour vous proposer les prix les plus compétitifs du marché.
            </CardText>
          </Card>
          <Card $delay="0.4s">
            <CardIcon>🛡️</CardIcon>
            <CardTitle>Confiance</CardTitle>
            <CardText>
              Transparence totale sur notre modèle d'affiliation. Aucun surcoût pour vous.
            </CardText>
          </Card>
        </Grid>

        <SectionTitle>Notre mission</SectionTitle>
        <Paragraph>
          SearShop est né d'un constat simple : trouver les meilleures offres en ligne prend trop de temps. 
          Notre mission est de simplifier vos achats en regroupant les meilleurs produits et les offres les plus attractives 
          sur une seule plateforme élégante et facile à utiliser.
        </Paragraph>
        <Paragraph>
          Nous travaillons avec des partenaires de confiance comme <strong>Temu</strong> pour vous donner accès 
          à des milliers de produits à prix réduit, directement depuis notre site.
        </Paragraph>

        <SectionTitle>Comment ça marche ?</SectionTitle>
        <Paragraph>
          SearShop fonctionne sur un modèle d'affiliation. Quand vous cliquez sur un produit et effectuez un achat 
          chez notre partenaire, nous recevons une petite commission — <strong>sans aucun surcoût pour vous</strong>. 
          Cela nous permet de maintenir le site et de continuer à vous proposer les meilleures offres.
        </Paragraph>

        <div id="partenaires">
          <SectionTitle>Nos partenaires</SectionTitle>
          <Paragraph>
            Nous collaborons avec des plateformes reconnues pour vous offrir un large choix de produits :
          </Paragraph>
          <Grid>
            <Card $delay="0.2s">
              <CardIcon>🛒</CardIcon>
              <CardTitle>Temu</CardTitle>
              <CardText>
                Notre partenaire principal. Des millions de produits à prix mini avec livraison en France.
              </CardText>
            </Card>
          </Grid>
        </div>

        <CTASection>
          <CTATitle>Prêt à faire de bonnes affaires ?</CTATitle>
          <CTAText>Découvrez notre sélection de produits aux meilleurs prix.</CTAText>
          <CTAButton to="/shop">🚀 Explorer la boutique</CTAButton>
        </CTASection>
      </Content>
    </PageWrapper>
  )
}

export default AboutPage
