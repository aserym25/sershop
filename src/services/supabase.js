import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null

const CACHE_KEY = 'sershop_products_cache_v2'
const CACHE_TTL = 5 * 60 * 1000

export const readCache = () => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsed = JSON.parse(cached)
    const now = new Date().getTime()

    if (now - parsed.timestamp > CACHE_TTL) {
        localStorage.removeItem(CACHE_KEY)
        return null
    }
    return parsed.data
}

export const saveCache = (data) => {
    const cacheData = {
        timestamp: new Date().getTime(),
        data: data
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
}

export const warmupSupabase = async () => {
    try {
        if (!supabase) {
            throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
        }

        await supabase.from('products').select('id').limit(1)
        console.log('Sershop Supabase est réveillé et prêt ! 🚀')
    } catch (error) {
        console.error('Erreur lors du réveil de Supabase:', error)
    }
}
