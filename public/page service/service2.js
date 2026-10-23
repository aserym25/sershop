


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesClimatisation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    typeAppareil: 'Climatiseur',
    marque: '',
    panne: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intégrez ici votre logique d'envoi vers Supabase ou une API d'email
    console.log("Demande d'intervention :", formData);
    setIsSubmitted(true);
    
    // Réinitialisation du formulaire après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nom: '', telephone: '', typeAppareil: 'climatiseur', marque: '', panne: '' });
    }, 3000);
  };

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
        
        {/* En-tête */}
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Services Froid & Climatisation
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            De la pose murale à la gestion des fluides frigorigènes, une expertise technique complète pour vos installations. Interventions rapides sur Errachidia, Tinghir et toute la région.
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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

        {/* Formulaire de demande d'intervention */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Colonne Information */}
            <div className="bg-blue-900 text-white p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Besoin d'un diagnostic rapide ?</h2>
              <p className="text-blue-200 text-lg mb-8">
                Renseignez les détails de votre équipement. Plus vous nous donnez d'informations sur la marque et les symptômes, plus notre pré-diagnostic et notre intervention seront efficaces.
              </p>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Réponse sous 24h
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Devis transparent
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Pièces de rechange certifiées
                </li>
              </ul>
            </div>

            {/* Colonne Formulaire */}
            <div className="p-10">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                        <input type="text" name="nom" required value={formData.nom} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input type="tel" name="telephone" required value={formData.telephone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="06 XX XX XX XX" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type d'équipement</label>
                        <select name="typeAppareil" value={formData.typeAppareil} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                          <option value="climatiseur">Climatiseur (Split/Gainable)</option>
                          <option value="refrigerateur">Réfrigérateur / Congélateur</option>
                          <option value="chambre_froide">Chambre Froide</option>
                          <option value="autre">Autre matériel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
                        <input type="text" name="marque" required value={formData.marque} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Daikin, Samsung, LG..." />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nature de la panne</label>
                      <textarea name="panne" required value={formData.panne} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Décrivez le problème (ex: L'unité intérieure coule, le compresseur ne démarre pas, code erreur affiché...)"></textarea>
                    </div>

                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                      Envoyer la demande
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Demande envoyée !</h3>
                    <p className="text-gray-600">Nous analyserons les symptômes de votre {formData.marque} et vous contacterons très rapidement.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}