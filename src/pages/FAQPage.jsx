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

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
`

const CategoryTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 2.5rem 0 1.25rem;
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

const AccordionItem = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1.1rem 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transitions.normal};
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`

const AccordionBody = styled.div`
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  transition: all 0.35s ease;
  padding: ${({ $open }) => ($open ? '0 1.5rem 1.25rem' : '0 1.5rem')};

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
  }
`

const faqData = [
  {
    id: 'livraison',
    title: '🚚 Livraison',
    items: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Les délais varient selon les fournisseurs. En général, comptez 7 à 15 jours ouvrés pour les produits expédiés depuis l\'international (Temu, etc.). Les estimations sont indiquées sur chaque fiche produit.'
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'La plupart de nos produits partenaires proposent la livraison gratuite. Les conditions exactes sont précisées sur la page du produit chez le vendeur.'
      },
      {
        q: 'Puis-je suivre ma commande ?',
        a: 'Oui ! Après avoir passé commande chez le vendeur partenaire, vous recevrez un numéro de suivi par email. Vous pourrez suivre votre colis directement sur le site du transporteur.'
      },
    ]
  },
  {
    id: 'retours',
    title: '↩️ Retours & Remboursements',
    items: [
      {
        q: 'Comment retourner un produit ?',
        a: 'Les retours sont gérés directement par le vendeur partenaire (Temu, Amazon, etc.). Rendez-vous sur votre espace client chez le vendeur pour initier un retour. La plupart offrent un délai de 30 jours.'
      },
      {
        q: 'Quand serai-je remboursé ?',
        a: 'Le remboursement est traité par le vendeur partenaire une fois le retour reçu et validé, généralement sous 5 à 10 jours ouvrés.'
      },
    ]
  },
  {
    id: 'suivi',
    title: '📦 Suivi de commande',
    items: [
      {
        q: 'Où trouver mon numéro de suivi ?',
        a: 'Votre numéro de suivi vous est envoyé par le vendeur partenaire après l\'expédition de votre commande. Consultez votre email ou votre espace client sur le site du vendeur.'
      },
      {
        q: 'Ma commande n\'arrive pas, que faire ?',
        a: 'Si votre commande dépasse le délai estimé, contactez directement le service client du vendeur partenaire. Vous pouvez également nous contacter via notre page Contact et nous vous aiderons dans vos démarches.'
      },
    ]
  },
  {
    id: 'paiement',
    title: '💳 Paiement & Sécurité',
    items: [
      {
        q: 'Quels modes de paiement sont acceptés ?',
        a: 'Le paiement est effectué sur le site du vendeur partenaire. La plupart acceptent : Visa, Mastercard, PayPal, Apple Pay, Google Pay et d\'autres moyens de paiement locaux.'
      },
      {
        q: 'Mes données bancaires sont-elles sécurisées ?',
        a: 'Absolument. SearShop ne collecte aucune donnée bancaire. Tous les paiements sont effectués directement sur les sites partenaires qui utilisent des protocoles de sécurité SSL et des certifications PCI-DSS.'
      },
    ]
  },
  {
    id: 'general',
    title: '❓ Général',
    items: [
      {
        q: 'Qu\'est-ce que SearShop ?',
        a: 'SearShop est un site de comparaison et de recommandation de produits. Nous sélectionnons les meilleures offres sur des plateformes partenaires (Temu, etc.) pour vous aider à trouver les meilleurs prix.'
      },
      {
        q: 'SearShop vend-il directement des produits ?',
        a: 'Non, SearShop est un site affilié. Nous vous redirigeons vers les vendeurs partenaires pour effectuer vos achats. Nous touchons une commission sur chaque vente, sans surcoût pour vous.'
      },
      {
        q: 'Comment contacter le support ?',
        a: 'Rendez-vous sur notre page Contact pour nous envoyer un message. Nous répondons sous 24 à 48h en jours ouvrés.'
      },
    ]
  },
]

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <AccordionItem>
    <AccordionHeader $open={isOpen} onClick={onClick}>
      {question}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionHeader>
    <AccordionBody $open={isOpen}>
      <p>{answer}</p>
    </AccordionBody>
  </AccordionItem>
)

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)
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

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key)

  return (
    <PageWrapper>
      <HeroCompact>
        <HeroTitle>
          Questions <span className="gradient">Fréquentes</span>
        </HeroTitle>
        <HeroSub>Tout ce que vous devez savoir sur SearShop</HeroSub>
      </HeroCompact>

      <Content>
        {faqData.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <CategoryTitle>{cat.title}</CategoryTitle>
            {cat.items.map((item, i) => {
              const key = `${cat.id}-${i}`
              return (
                <FAQItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === key}
                  onClick={() => toggle(key)}
                />
              )
            })}
          </div>
        ))}
      </Content>
    </PageWrapper>
  )
}

export default FAQPage
