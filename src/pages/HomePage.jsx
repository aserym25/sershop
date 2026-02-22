import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase, readCache, saveCache } from '../services/supabase';
import { ProductCard } from '../components/ProductCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 2rem;
`;

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // 1. محاولة قراءة البيانات من الكاش أولاً (لسرعة التحميل)
      const cachedData = readCache();
      if (cachedData) {
        setProducts(cachedData);
        setLoading(false);
        return; // توقف هنا ولا تتصل بقاعدة البيانات
      }

      // 2. إذا لم يكن هناك كاش، اتصل بـ Supabase
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Erreur Supabase:', error);
      } else {
        setProducts(data || []);
        saveCache(data || []); // احفظ البيانات الجديدة في الكاش
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 style={{ color: 'gold', textAlign: 'center', marginTop: '50px' }}>Chargement des produits Sershop...</h2>;

  return (
    <Grid>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </Grid>
  );
};