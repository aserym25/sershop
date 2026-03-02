-- ============================================================
--  SERSHOP — Schema Supabase
--  À coller dans : app.supabase.com → SQL Editor → New query
-- ============================================================


-- ============================================================
--  1. TABLE : products
-- ============================================================

CREATE TABLE IF NOT EXISTS public.products (
    id             BIGINT        PRIMARY KEY,
    title          TEXT          NOT NULL,
    price          NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    category       TEXT          NOT NULL,
    rating         NUMERIC(3,1)  DEFAULT 0,
    reviews        INTEGER       DEFAULT 0,
    image          TEXT,
    badge          TEXT,
    description    TEXT,
    affiliate_link TEXT,
    in_stock       BOOLEAN       DEFAULT true,
    created_at     TIMESTAMPTZ   DEFAULT NOW()
);

-- Index pour accélérer les filtres par catégorie
CREATE INDEX IF NOT EXISTS idx_products_category
    ON public.products (category);

-- Index pour les tris par note
CREATE INDEX IF NOT EXISTS idx_products_rating
    ON public.products (rating DESC);


-- ============================================================
--  2. SÉCURITÉ — Row Level Security (RLS)
--     Lecture publique, écriture réservée aux admins
-- ============================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les produits
DROP POLICY IF EXISTS "Lecture publique des produits" ON public.products;
CREATE POLICY "Lecture publique des produits"
    ON public.products
    FOR SELECT
    USING (true);

-- Seuls les utilisateurs authentifiés (admins) peuvent modifier
DROP POLICY IF EXISTS "Modification réservée aux admins" ON public.products;
CREATE POLICY "Modification réservée aux admins"
    ON public.products
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');


-- ============================================================
--  3. REALTIME — Activer les événements temps réel
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.products;


-- ============================================================
--  4. DONNÉES — Insertion des 8 produits initiaux
-- ============================================================

INSERT INTO public.products
    (id, title, price, original_price, category, rating, reviews, image, badge, description, affiliate_link, in_stock)
VALUES
    (
        1,
        'Écouteurs Bluetooth Pro Max',
        49.99, 89.99,
        'Audio', 4.8, 2341,
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        'Bestseller',
        'Son cristallin, réduction de bruit avancée, autonomie 30h.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        2,
        'Montre Connectée Sport Ultra',
        39.99, 79.99,
        'Montres', 4.7, 1892,
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        'Nouveau',
        'GPS intégré, étanche 5ATM, suivi santé 24/7.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        3,
        'Lampe LED Bureau Premium',
        24.99, 45.99,
        'Maison', 4.6, 987,
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80',
        '-45%',
        'Lumière ajustable, charge USB-C intégrée, design élégant.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        4,
        'Sac à Dos Tech Anti-Vol',
        34.99, 59.99,
        'Mode', 4.9, 3241,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
        'Top Vente',
        'Port USB, compartiment laptop 17", matière imperméable.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        5,
        'Chargeur Sans Fil 65W',
        19.99, 39.99,
        'Tech', 4.5, 1432,
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80',
        'Promo',
        'Compatible iPhone & Android, charge ultra-rapide.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        6,
        'Clavier Mécanique RGB',
        59.99, 99.99,
        'Tech', 4.8, 2108,
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
        'Gaming',
        'Switches blue, rétroéclairage RGB, layout compact TKL.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        7,
        'Lunettes Anti-Lumière Bleue',
        14.99, 29.99,
        'Mode', 4.4, 876,
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80',
        'Santé',
        'Protection oculaire, monture légère, verres anti-reflet.',
        'https://temu.to/k/ecg15ib5igw',
        true
    ),
    (
        8,
        'Mini Ventilateur USB-C',
        12.99, 24.99,
        'Maison', 4.3, 654,
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        'Été',
        '3 vitesses, pliable, silencieux, adapté bureau et voyage.',
        'https://temu.to/k/ecg15ib5igw',
        false
    )
ON CONFLICT (id) DO NOTHING;


-- ============================================================
--  5. VÉRIFICATION — Affiche les produits insérés
-- ============================================================

SELECT id, title, category, price, in_stock
FROM public.products
ORDER BY id;
