// 1. الاستيراد في الأعلى
import { createClient } from '@supabase/supabase-js';

// 2. إعدادات Supabase (استبدلها بمعلوماتك الحقيقية)
const supabaseUrl = 'https://qhatlwpqjhlclbhhbmvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXRsd3BxamhsY2xiaGhibXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTcyNTMsImV4cCI6MjA4NzIzMzI1M30.4zYB12U_GqUQl74GYJUWXFEXeJwYXSv_0WymtZjXyuk';
export const supabase = createClient(supabaseUrl, supabaseKey);

// 3. إعدادات الكاش (التخزين المؤقت لتسريع الموقع)
const CACHE_KEY = 'sershop_products_cache_v2';
const CACHE_TTL = 5 * 60 * 1000; // 5 دقائق

// 4. دوال الكاش
export const readCache = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const now = new Date().getTime();

    // التحقق من صلاحية الكاش (5 دقائق)
    if (now - parsed.timestamp > CACHE_TTL) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
    return parsed.data;
};

export const saveCache = (data) => {
    const cacheData = {
        timestamp: new Date().getTime(),
        data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};
// دالة إيقاظ قاعدة البيانات (Warmup)
export const warmupSupabase = async () => {
    try {
        // طلب خفيف جداً لإيقاظ الخادم
        await supabase.from('products').select('id').limit(1);
        console.log('Sershop Supabase est réveillé et prêt ! 🚀');
    } catch (error) {
        console.error('Erreur lors du réveil de Supabase:', error);
    }
};