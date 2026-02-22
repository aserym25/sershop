export const theme = {
    colors: {
        // Primary palette - inspired by logo colors
        primary: '#3D2DB5',        // Deep purple-blue
        primaryLight: '#6C5CE7',   // Bright purple
        primaryDark: '#2A1F7F',    // Dark navy

        // Accent colors from logo
        accent: '#00C896',         // Teal green
        accentGold: '#F5A623',     // Golden yellow
        accentViolet: '#9B59B6',   // Violet

        // Gradients
        gradientPrimary: 'linear-gradient(135deg, #3D2DB5 0%, #6C5CE7 50%, #00C896 100%)',
        gradientHero: 'linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
        gradientCard: 'linear-gradient(145deg, rgba(60,45,181,0.15) 0%, rgba(0,200,150,0.08) 100%)',
        gradientGold: 'linear-gradient(135deg, #F5A623 0%, #F7D06A 100%)',

        // Backgrounds
        bg: '#0A0A1A',             // Very dark navy
        bgSecondary: '#111128',    // Secondary dark
        bgCard: '#161630',         // Card background
        bgGlass: 'rgba(22, 22, 48, 0.85)', // Glass effect

        // Text
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A8C0',
        textMuted: '#5A6080',

        // UI
        border: 'rgba(108, 92, 231, 0.2)',
        borderHover: 'rgba(108, 92, 231, 0.6)',
        success: '#00C896',
        warning: '#F5A623',
        error: '#FF4757',
    },

    fonts: {
        heading: "'Outfit', sans-serif",
        body: "'Inter', sans-serif",
    },

    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
    },

    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },

    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
    },

    radii: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px',
    },

    shadows: {
        sm: '0 2px 8px rgba(0,0,0,0.3)',
        md: '0 4px 20px rgba(0,0,0,0.4)',
        lg: '0 8px 40px rgba(0,0,0,0.5)',
        glow: '0 0 30px rgba(108, 92, 231, 0.4)',
        glowGreen: '0 0 30px rgba(0, 200, 150, 0.4)',
        glowGold: '0 0 20px rgba(245, 166, 35, 0.4)',
        card: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,92,231,0.1)',
    },

    transitions: {
        fast: '0.15s ease',
        normal: '0.3s ease',
        slow: '0.5s ease',
        spring: '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },

    breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
    },

    zIndex: {
        dropdown: 100,
        sticky: 200,
        overlay: 300,
        modal: 400,
        toast: 500,
    },
}
