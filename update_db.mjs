import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhatlwpqjhlclbhhbmvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXRsd3BxamhsY2xiaGhibXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTcyNTMsImV4cCI6MjA4NzIzMzI1M30.4zYB12U_GqUQl74GYJUWXFEXeJwYXSv_0WymtZjXyuk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLinks() {
    console.log('Fetching products...');
    const { data: products, error: fetchError } = await supabase.from('products').select('id, affiliate_link');
    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return;
    }

    console.log(`Found ${products.length} products. Updating...`);
    for (const product of products) {
        if (product.affiliate_link && product.affiliate_link.includes('temu.com')) {
            const { error: updateError } = await supabase
                .from('products')
                .update({ affiliate_link: 'https://temu.to/k/ecg15ib5igw' })
                .eq('id', product.id);

            if (updateError) {
                console.error(`Failed to update product ${product.id}:`, updateError);
            } else {
                console.log(`Updated product ${product.id}`);
            }
        }
    }
    console.log('Update complete.');
}

updateLinks();
