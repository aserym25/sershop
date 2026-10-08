import Head from 'next/head';

export default function Layout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sershop",
    "url": "https://sershop.fr",
    "logo": "https://sershop.fr/logo.png", 
    "description": "Plateforme e-commerce spécialisée dans les équipements CVC, l'outillage frigorifique et le matériel didactique technique.",
    "sameAs": [
      "https://www.instagram.com/sershop.fr/"
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <main>{children}</main>
    </>
  );
}