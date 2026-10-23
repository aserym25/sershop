import { useCountry } from '../hooks/useCountry';

export default function ProductCard({ title, priceMAD, priceEUR }) {
  const { country, isLoading } = useCountry();

  // Logique : Si le pays est le Maroc, on affiche en Dirhams, sinon en Euros
  const isMorocco = country === 'MA';
  const displayPrice = isMorocco ? `${priceMAD} MAD` : `${priceEUR} €`;

  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm text-start">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      
      {isLoading ? (
        <div className="mt-3 h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <p className="mt-3 text-2xl font-semibold text-blue-600">
          {priceMAD === 0 ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              Téléchargement Libre
            </span>
          ) : (
            displayPrice
          )}
        </p>
      )}

      <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Ajouter au panier
      </button>
    </div>
  );
}