document.addEventListener('DOMContentLoaded', function() {
    // Auto-update copyright year so the footer never looks stale
    document.querySelectorAll('.current-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

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
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
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
            'Servicing towns, municipalities, and private customers with control and automation services and repairs with 24/7 on-call support.': 'Al servicio de ciudades, municipios y clientes privados haciendo diagnósticos y reparaciones de paneles de control y automatización con soporte disponible 24/7.',
            'Controls, automation, and SCADA services for towns, municipalities, and private customers across New York\'s Hudson Valley, with 24/7 on-call support.': 'Servicios de control, automatización y SCADA para ciudades, municipios y clientes privados en todo el Valle del Hudson de Nueva York, con soporte disponible 24/7.',

            // Services heading & call-to-action (added)
            'Controls & Automation Services': 'Servicios de Control y Automatización',
            'Request a Quote': 'Solicite una cotización',

            // --- Service page content (added) ---
            "Water & Wastewater Controls": "Controles de Agua y Aguas Residuales",
            "PLC, HMI & SCADA Programming": "Programación de PLC, HMI y SCADA",
            "Industrial Motor Controls & VFDs": "Controles de Motores Industriales y VFD",
            "Wireless & Remote Monitoring": "Sistemas Inalámbricos y Monitoreo Remoto",
            "Instrumentation & Calibration": "Instrumentación y Calibración",
            "Other services": "Otros servicios",
            "Water & Wastewater System Controls in the Hudson Valley, NY": "Controles de Sistemas de Agua y Aguas Residuales en el Valle del Hudson, NY",
            "PLC, HMI & SCADA Programming in New York's Hudson Valley": "Programación de PLC, HMI y SCADA en el Valle del Hudson de Nueva York",
            "Industrial Motor Controls & VFD Repair in the Hudson Valley, NY": "Controles de Motores Industriales y Reparación de VFD en el Valle del Hudson, NY",
            "Wireless & Remote Monitoring Systems in the Hudson Valley, NY": "Sistemas Inalámbricos y de Monitoreo Remoto en el Valle del Hudson, NY",
            "Instrumentation & Calibration Services in the Hudson Valley, NY": "Servicios de Instrumentación y Calibración en el Valle del Hudson, NY",
            "ADP Automation troubleshoots, repairs, and upgrades control systems for municipal and private water and wastewater facilities across the Hudson Valley. From booster stations to wet wells, we keep your water infrastructure running.": "ADP Automation diagnostica, repara y actualiza sistemas de control para instalaciones municipales y privadas de agua y aguas residuales en todo el Valle del Hudson. Desde estaciones elevadoras de presión hasta pozos húmedos, mantenemos su infraestructura de agua en funcionamiento.",
            "We program and integrate PLCs, touchscreen HMIs, and SCADA systems for industrial plants and municipal facilities throughout the Hudson Valley. New builds, upgrades from outdated systems, and on-site troubleshooting.": "Programamos e integramos PLCs, HMIs de pantalla táctil y sistemas SCADA para plantas industriales e instalaciones municipales en todo el Valle del Hudson. Nuevas instalaciones, actualizaciones de sistemas obsoletos y diagnóstico de problemas en el sitio.",
            "ADP Automation services and repairs industrial motor controls for facilities across the Hudson Valley, including variable frequency drives, soft starters, and motor protection systems.": "ADP Automation da servicio y repara controles de motores industriales para instalaciones en todo el Valle del Hudson, incluidos variadores de frecuencia, arranques suaves y sistemas de protección de motores.",
            "We design and install wireless control and remote monitoring systems that let towns, municipalities, and private facilities watch and control equipment from anywhere across the Hudson Valley.": "Diseñamos e instalamos sistemas de control inalámbrico y monitoreo remoto que permiten a ciudades, municipios e instalaciones privadas supervisar y controlar equipos desde cualquier lugar en todo el Valle del Hudson.",
            "ADP Automation installs, calibrates, and maintains process instrumentation for water, wastewater, and industrial systems throughout the Hudson Valley.": "ADP Automation instala, calibra y mantiene instrumentación de proceso para sistemas de agua, aguas residuales e industriales en todo el Valle del Hudson.",
            "Water systems:": "Sistemas de agua:",
            "Wastewater systems:": "Sistemas de aguas residuales:",
            "We generally serve Orange, Ulster, Dutchess, Sullivan, and Putnam counties, with 24/7 on-call emergency support. Contact us for locations farther out.": "Generalmente atendemos los condados de Orange, Ulster, Dutchess, Sullivan y Putnam, con soporte de emergencia disponible 24/7. Contáctenos para ubicaciones más lejanas.",
            "Water level and tank level controls": "Controles de nivel de agua y de tanques",
            "Remote signals and alarms": "Señales remotas y alarmas",
            "Touchscreen PLCs for controls": "PLC de pantalla táctil para controles",
            "SCADA systems": "Sistemas SCADA",
            "Remote Terminal Units (RTUs)": "Unidades Terminales Remotas (RTU)",
            "Human Machine Interfaces (HMIs)": "Interfaces Hombre-Máquina (HMI)",
            "Variable Frequency Drives (VFDs)": "Variadores de Frecuencia (VFD)",
            "Soft starters": "Arranques de motores suaves",
            "Annual and on-demand calibrations": "Calibraciones anuales y requeridas",

            // "Learn more" service-page links (added)
            'Learn more about water & wastewater controls →': 'Más información sobre controles de agua y aguas residuales →',
            'Learn more about wireless & remote monitoring →': 'Más información sobre sistemas inalámbricos y monitoreo remoto →',
            'Learn more about PLC, HMI & SCADA programming →': 'Más información sobre programación de PLC, HMI y SCADA →',
            'Learn more about industrial motor controls & VFDs →': 'Más información sobre controles de motores industriales y VFD →',
            'Learn more about instrumentation & calibration →': 'Más información sobre instrumentación y calibración →',

            // Service Areas & FAQ accordion (added)
            'Service Areas & FAQ': 'Áreas de Servicio y Preguntas Frecuentes',
            'What areas do you serve?': '¿Qué áreas atienden?',
            'We are based in New Windsor, NY and regularly serve Orange, Ulster, Dutchess, Sullivan, and Putnam counties throughout the Hudson Valley. For projects farther out across New York and neighboring states, contact us and we will let you know if we can help.': 'Estamos ubicados en New Windsor, NY y atendemos regularmente los condados de Orange, Ulster, Dutchess, Sullivan y Putnam en todo el Valle del Hudson. Para proyectos más lejanos en Nueva York y estados vecinos, contáctenos y le informaremos si podemos ayudar.',
            'Do you offer 24/7 emergency service?': '¿Ofrecen servicio de emergencia 24/7?',
            'Yes. We provide 24/7 on-call emergency support for control systems, pump stations, motor controls, and alarms, so towns, municipalities, and private facilities can keep critical equipment running.': 'Sí. Ofrecemos soporte de emergencia 24/7 para sistemas de control, estaciones de bombeo, controles de motores y alarmas, para que ciudades, municipios e instalaciones privadas puedan mantener funcionando su equipo crítico.',
            'What systems and industries do you work on?': '¿En qué sistemas e industrias trabajan?',
            'We work on industrial and municipal systems, including water and wastewater controls, pump and booster stations, industrial motor controls and VFDs, instrumentation and calibration, and custom control panels.': 'Trabajamos en sistemas industriales y municipales, incluidos controles de agua y aguas residuales, estaciones de bombeo y elevadoras de presión, controles de motores industriales y VFD, instrumentación y calibración, y paneles de control personalizados.',
            'Do you program PLCs and SCADA systems?': '¿Programan PLCs y sistemas SCADA?',
            'Yes. We program PLCs, HMIs, and SCADA systems, and we set up remote monitoring using radio and cellular communications, tank level monitoring, and cell phone alarm notifications.': 'Sí. Programamos PLCs, HMIs y sistemas SCADA, y configuramos monitoreo remoto mediante comunicaciones por radio y celular, monitoreo de nivel de tanques y notificaciones de alarma por teléfono celular.',
            
            // Section titles and subsections
            'We troubleshoot and repair:': 'Diagnóstico de Problemas y Reparaciones:',
            'Water & Wastewater Systems': 'Sistemas de Producción de Agua Potable y Manejo de Aguas Residuales',
            'Wireless and Control Systems': 'Sistemas de Control Inalámbricos',
            'PLC / HMI Programming': 'Programación de PLC / HMI',
            'Industrial Motor Controls': 'Control de Motores Industriales',
            'Instrumentation': 'Instrumentación',
            'Services, Upgrades and Repairs': 'Servicios, Actualizaciones y Reparaciones',
            'Contact Us': 'Contáctenos',
            
            // Service card content
            'Water:': 'Agua:',
            'Wastewater:': 'Aguas Residuales:',
            'Booster stations': 'Estaciones elevadoras de presión',
            'Motor diagnostics': 'Diagnóstico de motores',
            'Filtration systems and plants': 'Sistemas y plantas de filtración',
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
            '3 Phase Motor Diagnostics': 'Diagnósticos de Motores eléctricos trifásicos',
            'Low-voltage and high-voltage motors': 'Motores de bajo y alto voltaje',
            'Soft staters': 'Arranques de motores suaves',
            'Motor protection systems': 'Sistemas de protección de motores',
            'Synchronous and induction motors': 'Motores síncronos y de inducción',
            'Flow meters': 'Medidores de flujo de agua',
            'pH level monitoring': 'Monitoreo de nivel de pH',
            'Turbidimeters': 'Turbidímetros',
            'Annual & on-demand calibrations': 'Calibraciones anuales y requeridas',
            'Field service troubleshooting for:': 'Servicio de diagnóstico de problemas en campo:',
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
            'ADP Automation Corp. Comenzó en 2008 especializándose en la construcción de paneles de control. Ahora ofrece una variedad de servicios, ADP Automation Corp ofrece servicios de alta calidad utilizando prácticas y procedimientos originales del fabricante de equipos.',
            
            "Providing on-site troubleshooting and maintenance to towns, municipalities, and private customers. The primary goal is to maintain the customer's priorities as our priorities. We maintain close functional customer relationships to keep your equipment running.": 
            'Ofrecemos soluciones a problemas y mantenimiento en el campo, ciudades, municipios y clientes privados. El objetivo principal nuestro es mantener las prioridades del cliente como nuestras prioridades. Mantenemos relaciones funcionales cercanas con los clientes para mantener su equipo en funcionamiento.',
            
            'We are based in New York. We generally service Orange, Sullivan, Ulster, Dutchess, Putnam. Contact for additional locations.': 
            'Estamos ubicados en Nueva York. Generalmente atendemos en los Condados de Orange, Sullivan, Ulster, Dutchess, y Putnam. Contáctenos para ubicaciones adicionales.',
            
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

        // Hero CTA, "Learn more" links, and FAQ accordion (added sections)
        document.querySelectorAll('.btn-hero, .service-link, .faq-item summary, .faq-item p').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });

        // Service pages: breadcrumb, related-services links, and footer nav
        document.querySelectorAll('.breadcrumb a, .breadcrumb span, .related-list a, .footer-nav a').forEach(el => {
            if (!el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', el.textContent.trim());
            }
        });
    }
});