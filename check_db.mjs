import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhatlwpqjhlclbhhbmvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXRsd3BxamhsY2xiaGhibXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTcyNTMsImV4cCI6MjA4NzIzMzI1M30.4zYB12U_GqUQl74GYJUWXFEXeJwYXSv_0WymtZjXyuk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data } = await supabase.from('products').select('id, title, affiliate_link');
    console.log(data);
}
check();
