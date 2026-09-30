import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { requestServiceViaWhatsApp } from '../utils/whatsapp'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 72px;
  background: ${({ theme }) => theme.colors.bg};
`

const Hero = styled.section`
  padding: 5rem 2rem 4rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.gradientHero};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 850px;
  margin: 0 auto;
  animation: ${fadeUp} 0.7s ease both;
`

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.primaryLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.black};
  line-height: 1.15;
  margin-bottom: 1rem;

  span {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeroText = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.75;
`

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
`

const SectionHeading = styled.div`
  max-width: 700px;
  margin: 0 auto 2.5rem;
  text-align: center;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
  }
`

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled.article`
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 1rem 0 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.75;
  }
`

const ServiceIcon = styled.div`
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(108, 92, 231, 0.15);
  font-size: 1.7rem;
`

const RequestPanel = styled.section`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.bgCard};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const RequestIntro = styled.div`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.gradientHero};

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 1rem;
  }

  p, li {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
  }

  li + li { margin-top: 0.5rem; }
`

const RequestForm = styled.form`
  padding: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`

const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.45rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  input, select, textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 0.9rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textPrimary};
    font: inherit;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primaryLight};
      box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
    }
  }

  textarea {
    min-height: 125px;
    resize: vertical;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.25rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const FormNotice = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`

const services = [
  {
    icon: '❄️',
    title: 'Installation et mise en service',
    description: 'Installation de climatiseurs split, multisplit et gainables, ainsi que d’équipements frigorifiques. Dimensionnement et raccordement soignés.',
  },
  {
    icon: '🛠️',
    title: 'Entretien préventif',
    description: 'Nettoyage des filtres, entretien des évaporateurs et contrôle de l’installation pour préserver les performances et la durée de vie de vos équipements.',
  },
  {
    icon: '🔧',
    title: 'Réparation et dépannage',
    description: 'Diagnostic des pannes de climatisation et de froid : compresseur, circuit frigorifique, composants électriques ou fuite de fluide.',
  },
]

const initialForm = {
  nom: '',
  telephone: '',
  typeAppareil: 'Climatiseur (split / gainable)',
  marque: '',
  panne: '',
}

export const ServicePage = () => {
  const [form, setForm] = useState(initialForm)
  const [notice, setNotice] = useState('')

  const handleChange = (event) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setNotice('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    requestServiceViaWhatsApp(form)
    setNotice('Votre demande est prête dans WhatsApp. Envoyez le message pour nous la transmettre.')
  }

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <Eyebrow>Installation · Entretien · Dépannage</Eyebrow>
          <HeroTitle>Services froid & <span>climatisation</span></HeroTitle>
          <HeroText>
            Une expertise technique pour vos équipements thermiques et frigorifiques,
            de l’installation au diagnostic de panne. Intervention à Errachidia,
            Tinghir et dans la région.
          </HeroText>
        </HeroContent>
      </Hero>

      <Content>
        <SectionHeading>
          <h2>Des services adaptés à vos équipements</h2>
          <p>Décrivez votre besoin et préparons ensemble la solution la plus adaptée.</p>
        </SectionHeading>

        <ServiceGrid>
          {services.map(service => (
            <ServiceCard key={service.title}>
              <ServiceIcon aria-hidden="true">{service.icon}</ServiceIcon>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServiceGrid>

        <RequestPanel>
          <RequestIntro>
            <h2>Besoin d’un diagnostic ?</h2>
            <p>
              Indiquez le type d’équipement, sa marque et les symptômes observés.
              Ces informations nous aideront à préparer notre réponse.
            </p>
            <ul>
              <li>✓ Réponse sous 24 h</li>
              <li>✓ Devis clair</li>
              <li>✓ Demande transmise directement via WhatsApp</li>
            </ul>
          </RequestIntro>

          <RequestForm onSubmit={handleSubmit}>
            <FormTitle>Demander une intervention</FormTitle>
            <FieldGrid>
              <Field>
                <label htmlFor="service-name">Nom complet</label>
                <input id="service-name" name="nom" autoComplete="name" required value={form.nom} onChange={handleChange} />
              </Field>
              <Field>
                <label htmlFor="service-phone">Téléphone</label>
                <input id="service-phone" name="telephone" type="tel" autoComplete="tel" required value={form.telephone} onChange={handleChange} />
              </Field>
            </FieldGrid>
            <FieldGrid>
              <Field>
                <label htmlFor="service-equipment">Type d’équipement</label>
                <select id="service-equipment" name="typeAppareil" value={form.typeAppareil} onChange={handleChange}>
                  <option>Climatiseur (split / gainable)</option>
                  <option>Réfrigérateur / congélateur</option>
                  <option>Chambre froide</option>
                  <option>Autre matériel</option>
                </select>
              </Field>
              <Field>
                <label htmlFor="service-brand">Marque</label>
                <input id="service-brand" name="marque" required value={form.marque} onChange={handleChange} placeholder="Ex. Daikin, Samsung, LG" />
              </Field>
            </FieldGrid>
            <Field>
              <label htmlFor="service-issue">Nature de la panne ou du besoin</label>
              <textarea id="service-issue" name="panne" required value={form.panne} onChange={handleChange} placeholder="Décrivez le problème ou l’installation souhaitée..." />
            </Field>
            <SubmitButton type="submit">Continuer sur WhatsApp</SubmitButton>
            {notice && <FormNotice role="status">{notice}</FormNotice>}
          </RequestForm>
        </RequestPanel>
      </Content>
    </PageWrapper>
  )
}

export default ServicePage
