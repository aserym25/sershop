import React, { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
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

const HeroContent = styled(m.div)`
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

const ServiceCard = styled(m.article)`
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

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.primaryLight};
  }
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

const RequestForm = styled(m.form)`
  padding: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`

const SubmissionSuccess = styled(m.div)`
  min-height: 100%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 1.25rem 0 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
`

const SuccessIcon = styled.div`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(28, 228, 178, 0.15);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.8rem;
`

const SecondaryButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
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

const services = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Installation & mise en service',
    description: 'Pose professionnelle de climatiseurs (split-système, multisplit, gainable) et d’équipements frigorifiques industriels ou commerciaux. Dimensionnement thermique et raccordement soignés.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
      </svg>
    ),
    title: 'Entretien préventif',
    description: 'Nettoyage des filtres, désinfection des évaporateurs, contrôle des compresseurs et vérification des pressions. Prolongez la durée de vie de vos équipements et optimisez leur consommation.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: 'Réparation et dépannage',
    description: 'Intervention sur les pannes de circuits frigorifiques, les problèmes de cartes électroniques ou les fuites de fluides. Diagnostic des compresseurs, relais et pressostats.',
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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedBrand, setSubmittedBrand] = useState('')

  const handleChange = (event) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    requestServiceViaWhatsApp(form)
    setSubmittedBrand(form.marque)
    setIsSubmitted(true)
  }

  const handleNewRequest = () => {
    setForm(initialForm)
    setIsSubmitted(false)
  }

  return (
    <PageWrapper>
      <Hero>
        <HeroContent initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}>
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
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.5 } },
              }}
              whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
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

          <AnimatePresence mode="wait" initial={false}>
            {!isSubmitted ? (
              <RequestForm
                key="service-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
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
                      <option>Climatiseur</option>
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
                  <label htmlFor="service-issue">Nature de la panne</label>
                  <textarea id="service-issue" name="panne" required value={form.panne} onChange={handleChange} placeholder="Décrivez le problème (ex. fuite d’eau, compresseur à l’arrêt, code erreur...)" />
                </Field>
                <SubmitButton type="submit">Envoyer la demande</SubmitButton>
              </RequestForm>
            ) : (
              <SubmissionSuccess
                key="service-success"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25 }}
              >
                <SuccessIcon aria-hidden="true">✓</SuccessIcon>
                <h2>Votre demande est prête</h2>
                <p>
                  Un message contenant les informations de votre équipement
                  {submittedBrand ? ` ${submittedBrand}` : ''} a été préparé dans WhatsApp.
                  Envoyez-le dans WhatsApp pour nous transmettre votre demande.
                </p>
                <SecondaryButton type="button" onClick={handleNewRequest}>Faire une autre demande</SecondaryButton>
              </SubmissionSuccess>
            )}
          </AnimatePresence>
        </RequestPanel>
      </Content>
    </PageWrapper>
  )
}

export default ServicePage
