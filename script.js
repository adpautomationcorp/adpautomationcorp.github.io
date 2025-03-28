document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burgerBtn = document.querySelector('.header-burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            const burgerInner = document.querySelector('.burger-inner');
            mobileMenu.classList.toggle('open');
            burgerInner.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
    }
    
    // Add this new code - Desktop language dropdown toggle
    const desktopLanguagePicker = document.getElementById('language-picker-desktop');
    const currentLanguageDesktop = desktopLanguagePicker?.querySelector('.current-language');
    
    if (desktopLanguagePicker && currentLanguageDesktop) {
        currentLanguageDesktop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            desktopLanguagePicker.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopLanguagePicker.contains(e.target)) {
                desktopLanguagePicker.classList.remove('active');
            }
        });
    }
    
    // Mobile menu links close menu when clicked
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.querySelector('.burger-inner').classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Mobile language dropdown
    const currentLangMobile = document.querySelector('.current-language-mobile');
    const mobileLangDropdown = document.querySelector('.mobile-language-dropdown');
    
    if (currentLangMobile && mobileLangDropdown) {
        currentLangMobile.addEventListener('click', function(e) {
            e.preventDefault();
            mobileLangDropdown.style.display = mobileLangDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Language switcher functionality
    function setupLanguageSwitcher(selector) {
        const languageItems = document.querySelectorAll(selector);
        
        languageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                
                // Set active class
                document.querySelectorAll('.language-item, .header-menu-nav-item[data-lang]').forEach(el => {
                    el.classList.remove('active');
                });
                document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
                    el.classList.add('active');
                });
                
                // Update current language display
                const language = this.querySelector('span') ? this.querySelector('span').textContent : this.textContent;
                document.querySelectorAll('.current-language-name').forEach(el => {
                    el.textContent = language;
                });
                
                // Close desktop dropdown
                if (desktopLanguagePicker) {
                    desktopLanguagePicker.classList.remove('active');
                }
                
                // Here you would implement actual language switching logic
                console.log(`Language switched to: ${lang}`);
                
                // Example of storing language preference
                localStorage.setItem('preferred-language', lang);
                
                // Simple demonstration - you'd replace this with proper translation logic
                if (lang === 'es') {
                    translateToSpanish();
                } else {
                    translateToEnglish();
                }
            });
        });
    }
    
    // Setup both desktop and mobile language switchers
    setupLanguageSwitcher('.language-item');
    setupLanguageSwitcher('.header-menu-nav-item[data-lang]');
    
    // Check stored language preference
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang) {
        // Trigger click on appropriate language item
        const langItem = document.querySelector(`.language-item[data-lang="${storedLang}"]`);
        if (langItem) {
            langItem.click();
        }
    }
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            body.style.overflow = '';
            if (document.querySelector('.burger-inner').classList.contains('active')) {
                document.querySelector('.burger-inner').classList.remove('active');
            }
        }
    });
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default form submission (let Formspree handle it)
            
            // Simple form validation - still good to have client-side
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                e.preventDefault(); // Prevent submission only if validation fails
                alert('Please fill out all required fields.');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // The form will be submitted to Formspree
            // No need to reset form or restore button as the page will refresh
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animations for service cards and gallery items
    const animateElements = document.querySelectorAll('.service-card, .contact-form-wrapper, .contact-info, .gallery-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.style.transform = 'translateY(0)';
                    } else if (entry.target.classList.contains('contact-form-wrapper')) {
                        entry.target.style.transform = 'translateX(0)';
                    } else if (entry.target.classList.contains('contact-info')) {
                        entry.target.style.transform = 'translateX(0)';
                    } else if (entry.target.classList.contains('gallery-item')) {
                        entry.target.style.transform = 'translateY(0)';
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            element.style.opacity = 0;
            
            if (element.classList.contains('service-card')) {
                element.style.transform = 'translateY(30px)';
            } else if (element.classList.contains('contact-form-wrapper')) {
                element.style.transform = 'translateX(30px)';
            } else if (element.classList.contains('contact-info')) {
                element.style.transform = 'translateX(-30px)';
            } else if (element.classList.contains('gallery-item')) {
                element.style.transform = 'translateY(30px)';
            }
            
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    }
    
    // Simple translation demonstration functions - replace with actual translation system
    function translateToSpanish() {
        // Make sure all translatable elements have data-translate attributes
        addTranslateAttributes();
        
        const translations = {
            // Navigation
            'Home': 'Inicio',
            'Services': 'Servicios',
            'Contact': 'Contacto',
            
            // Hero section
            'ADP Automation Corp.': 'ADP Automation Corp.',
            'Servicing towns, municipalities, and private customers with control and automation services and repairs with 24/7 on-call support.': 'Al servicio de ciudades, municipios y clientes privados haciendo diagnosticos y reparaciones de paneles de control y automatización con soporte disponible 24/7.',
            
            // Section titles and subsections
            'We troubleshoot and repair:': 'Diagnosticos de problemas y reparaciónes:',
            'Water & Wastewater Systems': 'Sistemas para produccion de Agua potable y manejo de Aguas Residuales',
            'Wireless and Control Systems': 'Sistemas Inalámbricos de Control',
            'PLC / HMI Programming': 'Programación de PLC / HMI',
            'Industrial Motor Controls': 'Control de Motores Industriales',
            'Instrumentation': 'Instrumentación',
            'Services, Upgrades and Repairs': 'Servicios, Actualizaciones y Reparaciones',
            'Contact Us': 'Contáctenos',
            
            // Service card content
            'Water:': 'Agua:',
            'Wastewater:': 'Aguas Residuales:',
            'Booster stations': 'Estaciones Elevadoras de Presion',
            'Filtration systems': 'Sistemas de filtración',
            'Water level': 'Niveles de agua',
            'Tank levels': 'Niveles de tanques',
            'Well pump controls': 'Controles de bombas de agua de pozo',
            'Pump stations': 'Estaciones de bombeo',
            'Press machines': 'Máquinas prensadoras',
            'Wet well controls': 'Controles de pozo húmedo',
            'Remote signals': 'Señales remotas',
            'Radio and cellular wireless communications for control and alarms': 'Comunicaciones inalámbricas por radio y por red celular para control y alarmas',
            'Tank level monitoring': 'Monitoreo de nivel de tanques',
            'Remote motor controls': 'Controles remotos para motores',
            'Cell phone alarm notifications': 'Notificaciones de alarma por aplicaciones de teléfono celular',
            'Touch screen PLC\'s for controls': 'PLC y pantalla táctil para diversos controles',
            'SCADA': 'SCADA',
            'Remote Terminal Units (RTU\'s)': 'Unidades Terminales Remotas (RTU)',
            'Human Machine Interfaces': 'Interfaces Hombre-Máquina',
            'Variable Frequency Drive (VFD\'s)': 'Variadores de Frecuencia (VFD)',
            '3 Phase Motor Diagnostics': 'Diagnósticos de Motores electricos trifasicos',
            'Low-voltage and high-voltage motors': 'Motores de bajo y alto voltaje',
            'Soft staters': 'Arranques de motores suaves',
            'Motor protection systems': 'Sistemas de protección de motores',
            'Synchronous and induction motors': 'Motores síncronos y de inducción',
            'Flow meters': 'Medidores de flujo de agua',
            'pH level monitoring': 'Monitoreo de nivel de pH',
            'Turbidimeters': 'Turbidímetros',
            'Annual & on-demand calibrations': 'Calibraciónes anuales y requeridas',
            'Field service troubleshooting for:': 'Servicio de diagnostico de problemas en campo:',
            'Control systems': 'Sistemas de control',
            'Electric motors': 'Motores eléctricos',
            'Level control': 'Controles de nivel',
            'Alarms & Radios': 'Alarmas y Radios',
            'We perform new installs of complete systems.': 'Realizamos nuevas instalaciones de sistemas completos.',
            'We also upgrade outdated systems to new technologies.': 'También actualizamos sistemas obsoletos hacia nuevas tecnologías.',
            
            // Contact section
            'To schedule a call or get more information:': 'Para programar una llamada u obtener más información:',
            'Email:': 'Correo electrónico:',
            'Address:': 'Dirección:',
            'Hours:': 'Horario:',
            'Monday-Friday: 8am-5pm': 'Lunes-Viernes: 8am-5pm',
            '24/7 Emergency Service Available': 'Servicio de Emergencia 24/7 Disponible',
            'New Windsor, NY 12553': 'New Windsor, NY 12553',
            
            // Form
            'Name*': 'Nombre*',
            'Email*': 'Correo*',
            'Phone': 'Teléfono',
            'Company': 'Empresa',
            'Subject*': 'Asunto*',
            'Message*': 'Mensaje*',
            'Submit': 'Enviar',
            'Sending...': 'Enviando...',
            'Please fill out all required fields.': 'Por favor complete todos los campos requeridos.',
            'Your message has been sent. We will contact you shortly.': 'Su mensaje ha sido enviado. Nos pondremos en contacto con usted pronto.',
            
            // Footer
            '© 2025 ADP Automation Corp. All rights reserved.': '© 2025 ADP Automation Corp. Todos los derechos reservados.',
            
            // About section
            'About': 'Acerca de',
            'ADP Automation Corp. was established in 2008, starting out specializing in building control panels. Now offering a variety of services, ADP Automation Corp delivers top quality services utilizing original manufacturer practices and schematics.': 
            'ADP Automation Corp. Comenzo en 2008 especializandose en la construcción de paneles de control. Ahora ofrece una variedad de servicios, ADP Automation Corp ofrece servicios de alta calidad utilizando prácticas y procedimientos originales del fabricante de equipos.',
            
            "Providing on-site troubleshooting and maintenance to towns, municipalities, and private customers. The primary goal is to maintain the customer's priorities as our priorities. We maintain close functional customer relationships to keep your equipment running.": 
            'Ofreciendo solución a problemas y mantenimiento en el campo a ciudades, municipios y clientes privados. El objetivo principal nuestro es mantener las prioridades del cliente como nuestras prioridades. Mantenemos relaciones funcionales cercanas con los clientes para mantener sus equipo en funcionamiento.',
            
            'We are based in New York. We generally service Orange, Sullivan, Ulster, Dutchess, Putnam. Contact for additional locations.': 
            'Estamos ubicados en Nueva York. Generalmente atendemos Orange, Sullivan, Ulster, Dutchess, Putnam. Contáctenos para ubicaciones adicionales.',
            
            // Gallery section
            'Past Work': 'Trabajos Anteriores'
        };
        
        // Apply translations to page elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
    
    function translateToEnglish() {
        // Restore original English content
        document.querySelectorAll('[data-translate]').forEach(element => {
            element.textContent = element.dataset.translate;
        });
    }
    
    function addTranslateAttributes() {
        // Title elements across all sections
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Navigation links
        document.querySelectorAll('.nav-list .nav-item a, .header-menu-nav-item a').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Hero section
        document.querySelectorAll('.hero-content p').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Services section
        document.querySelectorAll('.service-details p, .service-details li').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // About section (already has attributes, but ensuring)
        document.querySelectorAll('.about-text p').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Contact section
        document.querySelectorAll('.contact-section p, .contact-section strong, .contact-info div p').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Form labels and buttons
        document.querySelectorAll('label, .submit-button').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Footer content
        document.querySelectorAll('.footer-info p').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
        
        // Gallery section
        document.querySelectorAll('.gallery-section h2').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
    }
});