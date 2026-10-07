import React, { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useRegion } from '../context/RegionContext'
import { useNavigate } from 'react-router-dom'

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

const StepsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`

const Step = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  background: ${props => props.active ? '#D4AF37' : '#2a2a2a'};
  color: ${props => props.active ? '#000' : '#888'};
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
`

const StepContent = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #D4AF37;
  margin-bottom: 1.5rem;
`

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 0.8rem;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
`

const SummaryInfo = styled.div`
  flex: 1;
  h3 { margin: 0 0 0.2rem; font-size: 0.95rem; color: #fff; }
  p { margin: 0; color: #D4AF37; font-weight: bold; }
`

const Total = styled.div`
  text-align: right;
  margin-top: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #D4AF37;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: #fff;
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #D4AF37;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #D4AF37, #B8960C);
  color: #000;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const BackButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background: #3a3a3a;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`

const ErrorMessage = styled.div`
  background: #ff4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`

const SuccessMessage = styled.div`
  background: #4CAF50;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #D4AF37;
`

const steps = ['Récapitulatif', 'Informations', 'Livraison', 'Validation']

export const CheckoutPage = () => {
  const { cartItems, clearCart, totalPrice } = useCart()
  const { formatPrice } = useRegion()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Maroc'
  })

  const isAllDigital = cartItems.length > 0 && cartItems.every(item => item.isDigital === true)
  const actualSteps = isAllDigital 
    ? steps.filter(step => step !== 'Livraison')
    : steps

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitOrder = async () => {
    setLoading(true)
    setError('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/orders'
      
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          isDigital: item.isDigital || false
        })),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: isAllDigital ? null : {
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
          }
        },
        total: totalPrice,
        isAllDigital
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }

      const result = await response.json()
      
      setOrderSuccess(true)
      clearCart()
      
      setTimeout(() => {
        navigate('/')
      }, 3000)

    } catch (err) {
      console.error('Erreur de soumission:', err)
      setError(err.message || 'Une erreur est survenue lors de la soumission de la commande. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < actualSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (cartItems.length === 0 && !orderSuccess) {
    navigate('/cart')
    return null
  }

  if (orderSuccess) {
    return (
      <Wrapper>
        <SuccessMessage>
          <h2>✅ Commande validée avec succès !</h2>
          <p>Vous allez être redirigé vers l'accueil...</p>
        </SuccessMessage>
      </Wrapper>
    )
  }

  const renderStepContent = () => {
    switch (actualSteps[currentStep]) {
      case 'Récapitulatif':
        return (
          <StepContent>
            <SectionTitle>Récapitulatif de votre commande</SectionTitle>
            {cartItems.map((item, i) => (
              <SummaryItem key={item.id ?? i}>
                {item.image && <img src={item.image} alt={item.title} />}
                <SummaryInfo>
                  <h3>{item.title}</h3>
                  <p>{formatPrice(item.price)} × {item.quantity || 1}</p>
                </SummaryInfo>
              </SummaryItem>
            ))}
            <Total>Total : {formatPrice(totalPrice)}</Total>
            {isAllDigital && (
              <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                📚 Tous les produits sont numériques - aucune livraison requise
              </p>
            )}
          </StepContent>
        )

      case 'Informations':
        return (
          <StepContent>
            <SectionTitle>Vos informations</SectionTitle>
            <Form>
              <FormGroup>
                <Label>Prénom *</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Nom *</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Téléphone *</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Form>
          </StepContent>
        )

      case 'Livraison':
        return (
          <StepContent>
            <SectionTitle>Adresse de livraison</SectionTitle>
            <Form>
              <FormGroup>
                <Label>Adresse *</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Ville *</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Code postal *</Label>
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Pays</Label>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Form>
          </StepContent>
        )

      case 'Validation':
        return (
          <StepContent>
            <SectionTitle>Validation de la commande</SectionTitle>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Client</h3>
              <p style={{ color: '#888' }}>{formData.firstName} {formData.lastName}</p>
              <p style={{ color: '#888' }}>{formData.email}</p>
              <p style={{ color: '#888' }}>{formData.phone}</p>
              
              {!isAllDigital && (
                <>
                  <h3 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '1rem' }}>Livraison</h3>
                  <p style={{ color: '#888' }}>{formData.address}</p>
                  <p style={{ color: '#888' }}>{formData.city}, {formData.postalCode}</p>
                  <p style={{ color: '#888' }}>{formData.country}</p>
                </>
              )}
              
              <h3 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '1rem' }}>Commande</h3>
              {cartItems.map((item, i) => (
                <p key={item.id ?? i} style={{ color: '#888' }}>
                  {item.title} × {item.quantity || 1} - {formatPrice(item.price)}
                </p>
              ))}
              <p style={{ color: '#D4AF37', fontWeight: 'bold', marginTop: '1rem' }}>
                Total : {formatPrice(totalPrice)}
              </p>
            </div>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            {loading ? (
              <Loading>Traitement de votre commande...</Loading>
            ) : (
              <Button onClick={handleSubmitOrder} type="button">
                Confirmer la commande
              </Button>
            )}
          </StepContent>
        )

      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Title>🛍️ Finaliser la commande</Title>
      
      <StepsContainer>
        {actualSteps.map((step, index) => (
          <Step
            key={step}
            active={index === currentStep}
          >
            {index + 1}. {step}
          </Step>
        ))}
      </StepsContainer>

      {renderStepContent()}

      {currentStep < actualSteps.length - 1 && (
        <ButtonGroup>
          {currentStep > 0 && (
            <BackButton onClick={handleBack}>
              ← Retour
            </BackButton>
          )}
          <Button onClick={handleNext} type="button">
            {currentStep === actualSteps.length - 2 ? 'Valider' : 'Suivant →'}
          </Button>
        </ButtonGroup>
      )}
    </Wrapper>
  )
}

export default CheckoutPage
