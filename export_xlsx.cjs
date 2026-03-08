const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://qhatlwpqjhlclbhhbmvr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXRsd3BxamhsY2xiaGhibXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTcyNTMsImV4cCI6MjA4NzIzMzI1M30.4zYB12U_GqUQl74GYJUWXFEXeJwYXSv_0WymtZjXyuk'
);

const localProducts = [
    {
        id: 9,
        title: 'الدليل الذهبي في صيانة أنظمة التدفئة',
        price: 49.00,
        original_price: 99.00,
        category: 'Livre',
        rating: 5.0,
        reviews: 42,
        badge: 'Nouveau',
        description: 'دليل شامل لطلبة وتقنيي الهندسة الحرارية بالمغرب',
        affiliate_link: '/chauffage.html',
        in_stock: true,
        source: 'LOCAL'
    },
    {
        id: 10,
        title: 'Guide interactif de la distribution des systèmes thermiques',
        price: 29.00,
        original_price: 59.00,
        category: 'Livre',
        rating: 4.9,
        reviews: 18,
        badge: 'Premium',
        description: 'Explications et schémas interactifs animés du chauffage.',
        affiliate_link: '/chauffe_e.html',
        in_stock: true,
        source: 'LOCAL'
    }
];

async function exportToXLSX() {
    const { data: supabaseProducts } = await supabase.from('products').select('*').order('id');
    const supabaseIds = new Set((supabaseProducts || []).map(p => p.id));
    const newLocalProducts = localProducts.filter(p => !supabaseIds.has(p.id));
    
    const allRaw = [
        ...(supabaseProducts || []).map(p => ({ ...p, source: 'SUPABASE' })),
        ...newLocalProducts
    ];

    const rows = allRaw.map(p => ({
        'id': p.id,
        'title': p.title,
        'price': p.price,
        'original_price': p.original_price || p.originalPrice || '',
        'category': p.category,
        'rating': p.rating,
        'reviews': p.reviews,
        'image': p.image || '/chauffage/img1-transformed.jpeg',
        'badge': p.badge,
        'description': p.description,
        'affiliate_link': p.affiliate_link || p.affiliateLink || '',
        'in_stock': (p.in_stock || p.inStock) ? true : false
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
        { wch: 5 }, { wch: 55 }, { wch: 12 }, { wch: 16 },
        { wch: 18 }, { wch: 8 }, { wch: 8 }, { wch: 12 },
        { wch: 60 }, { wch: 25 }, { wch: 10 }, { wch: 12 }
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Produits Sershop');
    XLSX.writeFile(wb, 'products_export.xlsx');
    console.log('Done: ' + rows.length + ' products exported.');
}

exportToXLSX();
