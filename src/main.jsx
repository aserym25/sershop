import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './styles/theme'
import { CartProvider } from './context/CartContext'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { Navbar } from './components/Navbar'

const GlobalStyle = createGlobalStyle`
  body { background-color: #0F0F0F; margin: 0; font-family: sans-serif; }
`

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CartProvider>
                <GlobalStyle />
                <Router>
                    {/* Navbar apparaît sur toutes les pages */}
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
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
