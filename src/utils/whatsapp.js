// ─────────────────────────────────────────────────────────────
//  Sershop — Utilitaire bouton "Commander via WhatsApp"
// ─────────────────────────────────────────────────────────────

// Numéro WhatsApp du vendeur (format international sans "+")
// Ex : 212661234567  (Maroc)
// Configurable via VITE_WHATSAPP_NUMBER dans .env
const WHATSAPP_NUMBER =
    import.meta.env.VITE_WHATSAPP_NUMBER || '212600000000'

/**
 * Ouvre WhatsApp avec un message pré-rempli pour UN produit.
 * @param {object} product - L'objet produit (title, price, id…)
 * @param {number} [qty=1]  - Quantité souhaitée
 */
export const orderProductViaWhatsApp = (product, qty = 1) => {
    const price = Number(product.price || 0).toFixed(2)
    const message =
        `Bonjour ! Je souhaite commander :\n` +
        `• ${product.title} ${price} MAD\n` +
        `Quantité : ${qty}\n` +
        `\nMerci 🙏`

    openWhatsApp(message)
}

/**
 * Ouvre WhatsApp avec un message récapitulatif du PANIER complet.
 * @param {Array} cartItems - Tableau d'items du panier (title, price, quantity)
 */
export const orderCartViaWhatsApp = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return

    const lines = cartItems.map((item) => {
        const price = Number(item.price || 0).toFixed(2)
        const qty = item.quantity || 1
        return `• ${item.title} ${price} MAD x${qty}`
    })

    const total = cartItems
        .reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0)
        .toFixed(2)

    const message =
        `Bonjour Sershop ! Je souhaite commander :\n` +
        lines.join('\n') +
        `\n\nTotal : ${total} MAD\n` +
        `Merci 🙏`

    openWhatsApp(message)
}

/** @private */
const openWhatsApp = (message) => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
}
