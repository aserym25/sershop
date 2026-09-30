# sershop
vendre produits

## Configuration Supabase

Copiez `.env.example` dans `.env.local`, puis renseignez l'URL du projet Supabase
actif et sa clé anon. En production, configurez ces mêmes variables dans
l'environnement de build de l'hébergeur. Ne mettez jamais une clé `service_role`
dans une application cliente.

Si l'URL Supabase ne se résout pas, vérifiez que le projet existe et que sa
référence dans `VITE_SUPABASE_URL` est correcte. Le catalogue local reste
disponible tant que Supabase est inaccessible.
