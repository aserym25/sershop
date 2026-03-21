import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

const TabBar = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-top: -1rem;
`

const Tab = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ $active, theme }) => $active ? 'transparent' : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.gradientPrimary : theme.colors.bgCard};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(108,92,231,0.35)' : 'none'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    color: white;
  }
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
`

const Section = styled.section`
  animation: ${fadeUp} 0.5s ease both;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1.25rem;
`

const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 1.75rem 0 0.75rem;
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.25rem;

  li {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 0.4rem;

    &::before {
      content: '›';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primaryLight};
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
`

const tabs = [
  { id: 'mentions', label: 'Mentions légales' },
  { id: 'confidentialite', label: 'Confidentialité' },
  { id: 'cgu', label: 'CGU' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'affiliation', label: 'Affiliation' },
]

const MentionsSection = () => (
  <Section id="mentions">
    <SectionTitle>Mentions Légales</SectionTitle>
    <SubTitle>Éditeur du site</SubTitle>
    <Paragraph>
      Le site <strong>sershop.fr</strong> est édité par SearShop, site de recommandation et de comparaison de produits en ligne.
    </Paragraph>
    <SubTitle>Hébergement</SubTitle>
    <Paragraph>
      Le site est hébergé par GitHub Pages (GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA).
    </Paragraph>
    <SubTitle>Propriété intellectuelle</SubTitle>
    <Paragraph>
      L'ensemble du contenu du site (textes, images, logo, design) est protégé par le droit de la propriété intellectuelle. 
      Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
    </Paragraph>
    <SubTitle>Contact</SubTitle>
    <Paragraph>
      Pour toute question, vous pouvez nous contacter à l'adresse : <strong>contact@sershop.fr</strong>
    </Paragraph>
  </Section>
)

const ConfidentialiteSection = () => (
  <Section id="confidentialite">
    <SectionTitle>Politique de Confidentialité</SectionTitle>
    <SubTitle>Données collectées</SubTitle>
    <Paragraph>
      SearShop peut collecter des données de navigation anonymes (pages visitées, durée de visite) à des fins d'analyse et d'amélioration du service.
    </Paragraph>
    <SubTitle>Utilisation des données</SubTitle>
    <BulletList>
      <li>Amélioration de l'expérience utilisateur</li>
      <li>Analyse statistique du trafic</li>
      <li>Personnalisation des recommandations de produits</li>
    </BulletList>
    <SubTitle>Partage des données</SubTitle>
    <Paragraph>
      Vos données ne sont jamais vendues à des tiers. Les seuls partenaires ayant accès à des données anonymisées sont nos outils d'analyse (Google Analytics, etc.).
    </Paragraph>
    <SubTitle>Vos droits</SubTitle>
    <Paragraph>
      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. 
      Contactez-nous à <strong>contact@sershop.fr</strong> pour exercer vos droits.
    </Paragraph>
  </Section>
)

const CGUSection = () => (
  <Section id="cgu">
    <SectionTitle>Conditions Générales d'Utilisation</SectionTitle>
    <SubTitle>Objet</SubTitle>
    <Paragraph>
      Les présentes CGU régissent l'utilisation du site sershop.fr. En naviguant sur le site, vous acceptez ces conditions dans leur intégralité.
    </Paragraph>
    <SubTitle>Nature du service</SubTitle>
    <Paragraph>
      SearShop est un service de recommandation et de comparaison de produits. Nous ne vendons pas directement de produits. 
      Les achats sont effectués sur les sites de nos partenaires (Temu, Amazon, etc.). Nous percevons une commission d'affiliation sur les ventes réalisées via nos liens.
    </Paragraph>
    <SubTitle>Responsabilité</SubTitle>
    <BulletList>
      <li>SearShop n'est pas responsable des produits vendus par les partenaires</li>
      <li>Les prix affichés sont indicatifs et peuvent varier chez le vendeur</li>
      <li>Les retours et SAV sont gérés par les vendeurs partenaires</li>
      <li>SearShop s'efforce de maintenir les informations à jour</li>
    </BulletList>
    <SubTitle>Liens externes</SubTitle>
    <Paragraph>
      Le site contient des liens vers des sites tiers. SearShop ne peut être tenu responsable du contenu ou des pratiques de ces sites.
    </Paragraph>
  </Section>
)

const CookiesSection = () => (
  <Section id="cookies">
    <SectionTitle>Politique de Cookies</SectionTitle>
    <SubTitle>Qu'est-ce qu'un cookie ?</SubTitle>
    <Paragraph>
      Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur un site web. 
      Il permet au site de mémoriser certaines informations pour améliorer votre expérience.
    </Paragraph>
    <SubTitle>Cookies utilisés</SubTitle>
    <BulletList>
      <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (préférences, panier)</li>
      <li><strong>Cookies analytiques</strong> : mesure d'audience et amélioration du service</li>
      <li><strong>Cookies d'affiliation</strong> : suivi des commissions via les liens partenaires</li>
    </BulletList>
    <SubTitle>Gestion des cookies</SubTitle>
    <Paragraph>
      Vous pouvez gérer vos préférences de cookies depuis les paramètres de votre navigateur. 
      La désactivation de certains cookies peut affecter votre expérience sur le site.
    </Paragraph>
  </Section>
)

const AffiliationSection = () => (
  <Section id="affiliation">
    <SectionTitle>Programme d'Affiliation</SectionTitle>
    <SubTitle>Comment ça marche ?</SubTitle>
    <Paragraph>
      SearShop participe à des programmes d'affiliation. Lorsque vous cliquez sur un lien produit et effectuez un achat chez notre partenaire, 
      nous recevons une petite commission. <strong>Cela ne vous coûte rien de plus.</strong>
    </Paragraph>
    <SubTitle>Nos partenaires</SubTitle>
    <BulletList>
      <li><strong>Temu</strong> — Notre partenaire principal pour les bonnes affaires</li>
    </BulletList>
    <SubTitle>Transparence</SubTitle>
    <Paragraph>
      Nous sélectionnons les produits pour leur qualité et leur rapport qualité-prix, indépendamment du montant de la commission. 
      Notre objectif est de vous recommander les meilleures offres disponibles.
    </Paragraph>
  </Section>
)

const sections = {
  mentions: MentionsSection,
  confidentialite: ConfidentialiteSection,
  cgu: CGUSection,
  cookies: CookiesSection,
  affiliation: AffiliationSection,
}

export const LegalPage = () => {
  const location = useLocation()
  const initialTab = location.hash ? location.hash.replace('#', '') : 'mentions'
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      if (sections[id]) {
        setActiveTab(id)
      }
    }
  }, [location.hash])

  const ActiveSection = sections[activeTab] || MentionsSection

  return (
    <PageWrapper>
      <HeroCompact>
        <HeroTitle>
          Informations <span className="gradient">Légales</span>
        </HeroTitle>
        <HeroSub>Transparence et confiance, nos engagements.</HeroSub>
      </HeroCompact>

      <TabBar>
        {tabs.map(t => (
          <Tab
            key={t.id}
            $active={activeTab === t.id}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </Tab>
        ))}
      </TabBar>

      <Content>
        <ActiveSection />
      </Content>
    </PageWrapper>
  )
}

export default LegalPage
