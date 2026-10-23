import { useState, useEffect } from 'react';

export function useCountry() {
  // MA par défaut, correspond à votre public principal
  const [country, setCountry] = useState('MA'); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('/api/geo');
        if (!response.ok) throw new Error('Erreur réseau API Geo');
        
        const data = await response.json();
        if (data.country) {
          setCountry(data.country);
        }
      } catch (error) {
        console.error("Échec de la géolocalisation, fallback sur MA :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, []);

  return { country, isLoading };
}