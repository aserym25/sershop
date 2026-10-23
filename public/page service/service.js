


import { motion } from 'framer-motion';

// Si vous utilisez des icônes, vous pouvez importer 'lucide-react' ou utiliser des SVG directs.
// Exemple avec des SVG intégrés pour éviter des dépendances supplémentaires.

export default function ServicesClimatisation() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      titre: "Installation & Mise en service",
      description: "Pose professionnelle de climatiseurs (split-système, multisplit, gainable) et d'équipements frigorifiques industriels ou commerciaux. Dimensionnement thermique et raccordement dans le respect des normes d'étanchéité.",
      icone: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      titre: "Entretien préventif",
      description: "Nettoyage des filtres, désinfection des évaporateurs, contrôle des compresseurs et vérification des pressions de gaz (R-32, R-134a, R-600a). Prolongez la durée de vie de vos machines et optimisez votre consommation électrique.",
      icone: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      titre: "Réparation & Dépannage",
      description: "Intervention rapide sur les pannes de circuits frigorifiques, problèmes de cartes électroniques, ou fuites de fluides. Diagnostic précis des compresseurs, relais et pressostats pour un redémarrage sécurisé.",
      icone: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la page */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Services Froid & Climatisation
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            De la pose murale à la gestion des fluides frigorigènes, une expertise technique complète pour vos installations thermiques et frigorifiques.
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.5 } }
              }}
              whileHover={{ y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all"
            >
              <div className="p-4 bg-blue-50 rounded-full mb-6">
                {service.icone}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.titre}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section Call to Action (Devis/Contact) */}
        <motion.div 
          className="mt-20 bg-blue-900 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 flex flex-col md:flex-row items-center justify-between">
            <div className="text-left mb-8 md:mb-0 md:mr-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Besoin d'une intervention ou d'un devis ?</h2>
              <p className="text-blue-200 text-lg">
                Que ce soit pour une installation complète ou un dépannage d'urgence sur un circuit frigorifique, nous sommes à votre disposition.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg whitespace-nowrap shadow-md hover:bg-blue-50 transition-colors"
            >
              Demander une intervention
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}