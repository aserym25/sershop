import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhatlwpqjhlclbhhbmvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXRsd3BxamhsY2xiaGhibXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTcyNTMsImV4cCI6MjA4NzIzMzI1M30.4zYB12U_GqUQl74GYJUWXFEXeJwYXSv_0WymtZjXyuk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
    console.log('Testing update...');
    const { data, error } = await supabase
        .from('products')
        .update({ affiliate_link: 'https://temu.to/k/ecg15ib5igw' })
        .eq('id', 1)
        .select();

    console.log('Data:', data);
    console.log('Error:', error);
}

testUpdate();
