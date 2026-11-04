# EthioEncyclopedia

## Présentation
Ce projet consiste à créer un site web
dans le cadre de mon projet universitaire.

## Technologies utilisées
🛠️ Technologies Utilisées - ÉthioEncyclopédie
 
Ce projet a été développé en utilisant les technologies web front-end suivantes :
 
1. Langages de base
• HTML5 : Structure sémantique de toutes les pages (projet.html, histoire.html, culture.html, modernite.html).
• CSS3 : Mise en page, animations et design global.
• JavaScript (ES6+) : Interactions dynamiques, gestion du lecteur audio, carrousel et chronologie. 
2. Bibliothèques et Frameworks externes
• Font Awesome (v6.4.0) : Utilisé via CDN pour toutes les icônes (<i class="fas fa-..."></i>).
• Google Fonts : Importation des polices Poppins (pour les titres) et Open Sans (pour le corps du texte). 
3. Fonctionnalités CSS Avancées
• Variables CSS (Custom Properties) : Définies dans :root pour les couleurs du drapeau éthiopien, de la page culture et de la page modernité.
• CSS Grid : Utilisé pour la disposition des cartes (ethnies, figures historiques, projets modernité).
• Flexbox : Gestion de la barre de navigation, du footer et des éléments internes.
• Animations et Transitions CSS :
	• Animation de texte gradient (@keyframes gradient-text).
	• Effets de survol (hover) sur les cartes et boutons.
	• Transitions fluides sur les images (zoom) et les ombres.
• Media Queries : Design entièrement responsive (breakpoints à 1200px, 992px, 768px et 576px).
• Background Blend Mode & Linear Gradients : Utilisés sur la section Hero pour mixer les couleurs du drapeau éthiopien avec l'image de fond. 
4. Fonctionnalités JavaScript natives (Vanilla JS)
• API Audio HTML5 : Gestion complète du lecteur (play, pause, timeupdate, volume, barre de progression).
• Intersection Observer API : Pour déclencher les animations des cartes au défilement (scroll).
• Smooth Scroll : Défilement fluide vers les ancres internes avec compensation de la hauteur du header fixe.
• Manipulation du DOM : Changement dynamique des classes, gestion des événements (clic, survol, clavier).
• Logique du Carrousel : Défilement automatique, boutons de navigation, points de pagination et navigation clavier.
• Logique de Chronologie Interactive : Changement d'état des points et des cartes lors du clic. 
5. Fonctionnalités Web
• Favicon : Lien vers images/favicon.png pour l'onglet du navigateur.
• Meta Viewport : Configuration pour un affichage optimal sur les appareils mobiles.
• Accessibilité (A11y) : Utilisation d'attributs aria-label, navigation au clavier (flèches, Entrée, Home, End) et structure HTML sémantique.

## Fonctionnalités
Ce site est une expérience web immersive et interactive dédiée à la découverte de l'Éthiopie. Voici les fonctionnalités implémentées :
 
🏠 Page d'Accueil (projet.html)
 
1. Lecteur Audio "Ethio-Jazz" Personnalisé
• Lecture/Pause : Contrôle total de la piste audio (Mulatu Astatke).
• Barre de progression interactive : Cliquez n'importe où sur la barre pour avancer ou reculer dans la musique.
• Contrôle du volume : Curseur avec changement dynamique d'icône (muet, bas, haut).
• Boutons Précédent/Suivant : Avance ou recule de 10 secondes dans la piste.
• Playlist interactive : Cliquez sur un titre pour mettre à jour les informations affichées (titre, artiste, genre).
• Affichage du temps : Temps actuel et durée totale formatés (mm:ss). 
2. Carrousel d'Images (Galerie)
• Défilement automatique : Les images changent toutes les 5 secondes.
• Navigation manuelle : Boutons "Précédent" et "Suivant".
• Points de pagination (Dots) : Cliquez sur un point pour accéder directement à une image spécifique.
• Navigation au clavier : Utilisez les flèches gauche/droite, ou les touches Home/End.
• Pause au survol : Le défilement automatique s'arrête quand la souris est sur le carrousel.
• Légendes animées : Les textes apparaissent en fondu lors du changement d'image. 
3. Animations et Design
• Texte à dégradé animé : Les paragraphes d'introduction ont un effet de couleur mouvante inspiré du drapeau éthiopien.
• Cartes interactives : Effet de "lift" (élévation) et zoom sur les images au survol.
• Scroll fluide : Navigation douce vers les sections internes. 
 
📜 Page Histoire (histoire.html)
 
1. Chronologie Interactive (Timeline)
• 10 points clés : De l'alphabet Guèze à la construction du Barrage de la Renaissance.
• Navigation par clic : Cliquez sur un point de la ligne de temps pour afficher la carte détaillée correspondante.
• Boutons de navigation : Flèches "Précédent" et "Suivant" avec désactivation automatique aux extrémités.
• Compteur dynamique : Affiche "X / 10" pour savoir où l'on se trouve.
• Navigation au clavier : Les flèches gauche/droite changent d'événement.
• Animations : Les cartes apparaissent en glissant vers le haut (@keyframes cardSlide). 
2. Cartes des Grandes Figures
• Grille de 4 personnages : Téwodros II, Ménélik II, Haïlé Sélassié Ier et la Reine de Saba.
• Effet de survol : Les images zooment et les cartes s'élèvent avec une bordure rouge distinctive. 
3. Section "Lucy"
• Galeries comparatives : Images de Lucy et du site de Hadar avec overlay textuel au survol.
• Statistiques visuelles : Affichage clair des données (40% de squelette, 1,10m, 25kg). 
 
🎭 Page Culture (culture.html)
 
1. Cartes des Groupes Ethniques
• Badges de population : Pourcentages affichés directement sur les images (Oromo 34%, Amhara 27%, etc.).
• Détails structurés : Langue, localisation et description pour chaque ethnie.
• Animation au scroll : Les cartes apparaissent en fondu et glissement (IntersectionObserver). 
2. Section Religion
• Cartes distinctes : Christianisme Orthodoxe, Islam et Beta Israel (Judaïsme).
• En-têtes dégradés : Couleurs spécifiques pour chaque religion.
• Listes de caractéristiques : Puces avec icônes Font Awesome.
• Tags interactifs : Les fêtes et villes saintes sont présentées sous forme de "tags" qui changent de couleur au survol. 
3. Section Traditions (Tenues)
• Cartes illustrées : Tenues masculines, féminines et de mariage.
• Listes détaillées : Description des vêtements traditionnels (Netela, Shamma, Kemis, etc.).
• Effet Parallaxe : Le fond du Hero se déplace légèrement au scroll. 
4. Effets Visuels
• Tooltips : Info-bulles qui apparaissent au survol des tags (via JS).
• Animation Pulse : Le bouton "Commencer l'exploration" pulse en continu. 
 
🏙️ Page Modernité (modernite.html)
 
1. Statistiques Animées
• Cartes de chiffres clés : Affichage des données démographiques et économiques.
• Animation d'apparition : Les cartes s'animent lorsqu'elles entrent dans le champ de vision. 
2. Projets d'Infrastructure
• Cartes de projets : Barrage de la Renaissance, Chemins de fer, etc.
• Badges "En cours" / "Terminé" : Indicateurs visuels de l'état des projets.
• Tags technologiques : Classification des projets (Énergie, Transport, etc.). 
3. Section "Vision 2030"
• Timeline verticale : Étapes clés du développement avec années encerclées.
• Citation inspirante : Blockquote stylisée avec icône de citation. 
 
🌐 Fonctionnalités Globales (Toutes les pages)
 
1. Navigation
• Header fixe : Reste en haut de l'écran lors du défilement.
• Lien actif : Le lien de la page courante est surligné automatiquement (via JS).
• Scroll fluide : Compensation de la hauteur du header pour les ancres internes.
• Responsive Design : Adaptation complète sur mobile, tablette et desktop. 
2. Design Thématique par Page
• Accueil : Couleurs du drapeau éthiopien (Vert, Jaune, Rouge).
• Histoire : Dominante rouge (#DA121A) et verte.
• Culture : Jaune doré (#FCDD09) et vert.
• Modernité : Vert profond et touches de cyan/rose. 
3. Accessibilité
• Navigation au clavier : Tous les éléments interactifs sont accessibles (Tab, Entrée, Flèches).
• Attributs ARIA : aria-label sur les boutons de navigation.
• Contrastes : Respect des normes de lisibilité. 
4. Performance
• Préchargement audio : preload="metadata" sur la balise audio.
• Images optimisées : Utilisation de formats web (.webp, .jpg).
• Animations GPU : Utilisation de transform et opacity pour des animations fluides. 
 
📱 Responsive & Compatibilité
• Mobile-first : Adaptation des grilles et des tailles de police.
• Breakpoints : 1200px, 992px, 768px, 576px.
• Compatibilité : Chrome, Firefox, Safari, Edge (versions récentes).

## Auteur
Étudiant en Licence Sciences de l'ingénieur.
