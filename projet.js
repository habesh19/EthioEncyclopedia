/* ============================================
   FICHIER JAVASCRIPT UNIFIÉ POUR TOUTES LES PAGES
   ============================================ */

// ===== FONCTIONS GLOBALES (pour toutes les pages) =====

/**
 * Gestion de TOUS les ancres internes
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Sauf les liens vides
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Animation des cartes au scroll
 */
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.style.animationPlayState !== undefined) {
                    entry.target.style.animationPlayState = 'running';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observer les cartes de section
    document.querySelectorAll('.carte-section, .ethnie-card, .card').forEach(card => {
        if (card.style.animationPlayState !== undefined) {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        }
    });
}

/**
 * Animation du texte gradient
 */
function setupGradientText() {
    const animatedTextElements = document.querySelectorAll('.animated-text');
    animatedTextElements.forEach(text => {
        text.style.animation = 'gradient-text 6s linear infinite';
    });
}

/**
 * Mettre en surbrillance le lien de navigation actif
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'projet.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== FONCTIONS POUR LA PAGE PROJET.HTML (Accueil) =====

/**
 * Lecteur audio pour la section musique
 */
function initMusicPlayer() {
    const audio = document.getElementById('ethio-music');
    const playBtn = document.querySelector('.play-btn');
    
    // Si pas de lecteur audio sur cette page, on sort
    if (!audio || !playBtn) return;
    
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const volumeSlider = document.querySelector('.volume-slider');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    // Formatage du temps
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    // Mettre à jour la durée totale
    audio.addEventListener('loadedmetadata', () => {
        if (totalTimeEl) {
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    });
    
    // Mettre à jour la progression
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        
        const percent = (audio.currentTime / audio.duration) * 100;
        if (progressFill) {
            progressFill.style.width = percent + '%';
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });
    
    // Bouton play/pause
    playBtn.addEventListener('click', () => {
        const icon = playBtn.querySelector('i');
        
        if (audio.paused) {
            audio.play();
            icon.className = 'fas fa-pause';
            playBtn.style.background = 'linear-gradient(135deg, #FFA000, #FFD700)';
        } else {
            audio.pause();
            icon.className = 'fas fa-play';
            playBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA000)';
        }
    });
    
    // Clic sur la barre de progression
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }
    
    // Contrôle du volume
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
            const icon = document.querySelector('.fa-volume-up');
            
            if (audio.volume == 0) {
                icon.className = 'fas fa-volume-mute';
            } else if (audio.volume < 0.5) {
                icon.className = 'fas fa-volume-down';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        });
    }
    
    // Boutons précédent/suivant
    const prevBtn = document.querySelector('.control-btn:nth-child(1)');
    const nextBtn = document.querySelector('.control-btn:nth-child(3)');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 10); // Recule 10s
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); // Avance 10s
        });
    }
    
    // Sélection des titres de la playlist
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            playlistItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Mettre à jour les infos du titre
            const title = item.querySelector('h5').textContent;
            const artist = item.querySelector('p').textContent;
            
            document.querySelector('.track-title').textContent = title;
            document.querySelector('.track-genre').textContent = artist;
            
            // Réinitialiser la lecture
            const icon = playBtn.querySelector('i');
            icon.className = 'fas fa-play';
            playBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA000)';
            if (progressFill) progressFill.style.width = '0%';
            if (currentTimeEl) currentTimeEl.textContent = '0:00';
            
            // Pourrait charger une nouvelle musique ici
            console.log(`Changer pour: ${title} - ${artist}`);
        });
    });
    
    // Quand la musique se termine
    audio.addEventListener('ended', () => {
        const icon = playBtn.querySelector('i');
        icon.className = 'fas fa-play';
        playBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA000)';
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
    });
}

/**
 * Carousel pour la galerie d'images
 */
class Carousel {
    constructor(containerSelector = '.carousel-container') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.dots = this.container.querySelectorAll('.dot');
        this.prevBtn = this.container.querySelector('.prev-btn');
        this.nextBtn = this.container.querySelector('.next-btn');
        this.carousel = this.container.querySelector('.carousel');
        
        this.currentSlide = 0;
        this.isAnimating = false;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 secondes
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Initialiser le premier slide
        this.showSlide(0);
        
        // Événements des boutons
        this.bindEvents();
        
        // Démarrer l'auto-défilement
        this.startAutoSlide();
    }
    
    bindEvents() {
        // Bouton suivant
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Bouton précédent
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        // Points de navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause au survol
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'Home') this.goToSlide(0);
            if (e.key === 'End') this.goToSlide(this.slides.length - 1);
        });
        
        // Gérer la visibilité de la page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }
    
    showSlide(index) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Masquer le slide actuel
        this.slides[this.currentSlide].classList.remove('active');
        this.slides[this.currentSlide].classList.add('fading-out');
        
        // Mettre à jour le dot actuel
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.remove('active');
        }
        
        // Mettre à jour l'index
        this.currentSlide = index;
        if (this.currentSlide >= this.slides.length) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;
        
        // Afficher le nouveau slide
        setTimeout(() => {
            this.slides.forEach(slide => slide.classList.remove('fading-out'));
            this.slides[this.currentSlide].classList.add('active');
            
            // Mettre à jour le dot
            if (this.dots[this.currentSlide]) {
                this.dots[this.currentSlide].classList.add('active');
            }
            
            this.isAnimating = false;
        }, 300); // Correspond à la durée de l'animation CSS
    }
    
    next() {
        if (this.isAnimating) return;
        this.showSlide(this.currentSlide + 1);
        this.restartAutoSlide();
    }
    
    prev() {
        if (this.isAnimating) return;
        this.showSlide(this.currentSlide - 1);
        this.restartAutoSlide();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.showSlide(index);
        this.restartAutoSlide();
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.next(), this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    // Méthodes publiques pour contrôle externe
    play() {
        this.startAutoSlide();
    }
    
    pause() {
        this.stopAutoSlide();
    }
}

// ===== FONCTIONS POUR LA PAGE HISTOIRE.HTML =====

/**
 * Chronologie interactive
 */
function initTimeline() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const timelineCards = document.querySelectorAll('.timeline-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentIndexEl = document.getElementById('current-index');
    const totalCountEl = document.getElementById('total-count');
    
    // Si pas de chronologie sur cette page, on sort
    if (timelinePoints.length === 0) return;
    
    let currentIndex = 0;
    const totalPoints = timelinePoints.length;
    
    // Initialiser le compteur
    if (totalCountEl) {
        totalCountEl.textContent = totalPoints;
    }
    
    // Fonction pour mettre à jour l'affichage
    function updateDisplay(index) {
        // Retirer la classe active de tous les points et cartes
        timelinePoints.forEach(point => point.classList.remove('active'));
        timelineCards.forEach(card => card.classList.remove('active'));
        
        // Ajouter la classe active aux éléments correspondants
        timelinePoints[index].classList.add('active');
        timelineCards[index].classList.add('active');
        
        // Mettre à jour le compteur
        if (currentIndexEl) {
            currentIndexEl.textContent = index + 1;
        }
        
        // Mettre à jour les boutons de navigation
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === totalPoints - 1;
        
        currentIndex = index;
    }
    
    // Gérer les clics sur les points
    timelinePoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            updateDisplay(index);
        });
        
        // Touche Enter pour l'accessibilité
        point.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                updateDisplay(index);
            }
        });
    });
    
    // Navigation précédente
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateDisplay(currentIndex - 1);
            }
        });
    }
    
    // Navigation suivante
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalPoints - 1) {
                updateDisplay(currentIndex + 1);
            }
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            updateDisplay(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < totalPoints - 1) {
            updateDisplay(currentIndex + 1);
        }
    });
    
    // Initialiser
    updateDisplay(0);
}

// ===== FONCTIONS POUR LA PAGE CULTURE.HTML =====

/**
 * Animation au scroll pour les cartes culture
 */
function setupCultureAnimations() {
    const elements = document.querySelectorAll('.ethnie-card, .card, .religion-card, .tradition-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Effet de parallaxe pour le hero culture
 */
function setupParallax() {
    const hero = document.querySelector('.culture-hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
}

/**
 * Tooltips pour les tags
 */
function setupTooltips() {
    const tags = document.querySelectorAll('.ethnie-tags span, .tag, .tradition-tags span');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.textContent;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary-color);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                white-space: nowrap;
            `;
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.top - 30}px`;
            
            document.body.appendChild(tooltip);
            e.target._tooltip = tooltip;
        });
        
        tag.addEventListener('mouseleave', (e) => {
            if (e.target._tooltip) {
                e.target._tooltip.remove();
            }
        });
    });
}

/**
 * Animation pulse pour le bouton CTA culture
 */
function setupPulseAnimation() {
    const ctaBtn = document.querySelector('.hero .btn');
    if (ctaBtn) {
        setInterval(() => {
            ctaBtn.classList.toggle('pulse');
        }, 2000);
        
        // Style pour l'animation pulse
        const style = document.createElement('style');
        style.textContent = `
            .btn.pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FONCTIONS POUR LA PAGE MODERNITE.HTML =====

/**
 * Animation des statistiques modernité
 */
function setupModerniteAnimations() {
    // Animation pour les cartes de statistiques
    const statCards = document.querySelectorAll('.stat-card, .project-card, .potentiel-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    statCards.forEach(card => {
        observer.observe(card);
    });
}

// ===== INITIALISATION GLOBALE =====

/**
 * Détecter la page courante et initialiser les fonctions appropriées
 */
function detectPageAndInitialize() {
    const body = document.body;
    const currentPage = window.location.pathname.split('/').pop() || 'projet.html';
    
    console.log(`Page détectée: ${currentPage}`);
    
    // Fonctions communes à toutes les pages
    setupSmoothScroll();
    setupScrollAnimations();
    setActiveNavLink();
    
    // Fonctions spécifiques par page
    if (currentPage === 'projet.html' || currentPage === '') {
        // Page d'accueil
        setupGradientText();
        initMusicPlayer();
        
        // Initialiser le carousel
        const carousel = new Carousel();
        window.ethioCarousel = carousel; // Exposer globalement si besoin
        
    } else if (currentPage === 'histoire.html') {
        // Page histoire
        initTimeline();
        
    } else if (currentPage === 'culture.html') {
        // Page culture
        setupCultureAnimations();
        setupParallax();
        setupTooltips();
        setupPulseAnimation();
        
    } else if (currentPage === 'modernite.html') {
        // Page modernité
        setupModerniteAnimations();
    }
}

/**
 * Gestion du redimensionnement de la fenêtre
 */
function setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Réinitialiser les animations si nécessaire
            if (window.location.pathname.includes('culture.html') || 
                window.location.pathname.endsWith('culture.html')) {
                setupCultureAnimations();
            }
        }, 250);
    });
}

// ===== INITIALISATION AU CHARGEMENT DE LA PAGE =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site ÉthioEncyclopédie chargé');
    
    // Détecter la page et initialiser les fonctions appropriées
    detectPageAndInitialize();
    
    // Configurer le gestionnaire de redimensionnement
    setupResizeHandler();
    
    // Ajouter une classe au body pour identifier la page
    const currentPage = window.location.pathname.split('/').pop() || 'projet.html';
    const pageName = currentPage.replace('.html', '').replace('projet', 'projet');
    document.body.classList.add(`page-${pageName}`);
});

// ===== EXPOSER LES FONCTIONS GLOBALES SI BESOIN =====

// Exposer le carousel globalement pour contrôle manuel si nécessaire
window.initCarousel = () => new Carousel();
window.initMusicPlayer = initMusicPlayer;
window.initTimeline = initTimeline;