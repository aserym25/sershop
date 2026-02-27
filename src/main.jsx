import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { AdminDashboard } from './pages/AdminDashboard'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CartProvider>
                <Router>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/shop" element={<HomePage />} />
                            <Route path="/deals" element={<HomePage />} />
                            <Route path="/about" element={<HomePage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            </CartProvider>
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
