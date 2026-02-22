import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4rem 2rem 2rem;
  margin-top: 6rem;
`

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  img {
    height: 36px;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 8px rgba(108, 92, 231, 0.4));
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.7;
    max-width: 280px;
    margin-bottom: 1.5rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`

const SocialBtn = styled.a`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(108, 92, 231, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: rgba(108, 92, 231, 0.25);
    border-color: ${({ theme }) => theme.colors.primaryLight};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const Column = styled.div``

const ColTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
`

const ColLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`

const ColLink = styled.li`
  a {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color ${({ theme }) => theme.transitions.fast};
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::before {
      content: '›';
      color: ${({ theme }) => theme.colors.primaryLight};
      font-size: 1rem;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      transform: translateX(4px);
    }
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 1200px;
  margin: 2rem auto;
`

const Bottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    display: flex;
    align-items: center;
    gap: 0.25rem;

    a {
      color: ${({ theme }) => theme.colors.primaryLight};
      &:hover { text-decoration: underline; }
    }
  }
`

export const Footer = () => (
    <FooterWrapper>
        <FooterGrid>
            <Brand>
                <img src="/logo_1.png" alt="SearShop" />
                <p>
                    Trouvez les meilleures offres sur des milliers de produits.
                    SearShop vous connecte aux deals les plus attractifs du moment.
                </p>
                <SocialLinks>
                    {['facebook', 'twitter', 'instagram', 'tiktok'].map(s => (
                        <SocialBtn key={s} href="#" aria-label={s}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </SocialBtn>
                    ))}
                </SocialLinks>
            </Brand>

            <Column>
                <ColTitle>Boutique</ColTitle>
                <ColLinks>
                    {['Nouveautés', 'Meilleures ventes', 'Promotions', 'Tech', 'Mode', 'Maison'].map(l => (
                        <ColLink key={l}><Link to="/shop">{l}</Link></ColLink>
                    ))}
                </ColLinks>
            </Column>

            <Column>
                <ColTitle>Support</ColTitle>
                <ColLinks>
                    {['FAQ', 'Livraison', 'Retours', 'Suivi commande', 'Contact', 'SAV'].map(l => (
                        <ColLink key={l}><a href="#">{l}</a></ColLink>
                    ))}
                </ColLinks>
            </Column>

            <Column>
                <ColTitle>Légal</ColTitle>
                <ColLinks>
                    {['Mentions légales', 'Confidentialité', 'CGU', 'Cookies', 'Partenaires'].map(l => (
                        <ColLink key={l}><a href="#">{l}</a></ColLink>
                    ))}
                </ColLinks>
            </Column>
        </FooterGrid>

        <Divider />

        <Bottom>
            <p>© {new Date().getFullYear()} SearShop. Tous droits réservés.</p>
            <span>
                Liens affiliés — <a href="#">En savoir plus</a>
            </span>
        </Bottom>
    </FooterWrapper>
)

export default Footer
