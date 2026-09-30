import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { domMax, LazyMotion, MotionConfig } from 'framer-motion'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Seo } from './components/Seo'

const HomePage = lazy(() => import('./pages/HomePage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MotionConfig reducedMotion="user">
                <LazyMotion features={domMax}>
                    <GlobalStyles />
                    <CartProvider>
                        <Router>
                            <Seo />
                            <Header />
                            <main>
                                <Suspense fallback={<div role="status">Chargement de la boutique...</div>}>
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/shop" element={<HomePage />} />
                                        <Route path="/deals" element={<HomePage />} />
                                        <Route path="/about" element={<AboutPage />} />
                                        <Route path="/service" element={<ServicePage />} />
                                        <Route path="/faq" element={<FAQPage />} />
                                        <Route path="/contact" element={<ContactPage />} />
                                        <Route path="/legal" element={<LegalPage />} />
                                        <Route path="/cart" element={<CartPage />} />
                                        <Route path="/admin" element={<AdminDashboard />} />
                                    </Routes>
                                </Suspense>
                            </main>
                            <Footer />
                        </Router>
                    </CartProvider>
                </LazyMotion>
            </MotionConfig>
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
