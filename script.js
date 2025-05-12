document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state management
    const navLinks = document.querySelectorAll('.navbar-menu a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Intersection Observer for active navigation
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.7 // Trigger when 70% of section is visible
    });

    // Observe all sections
    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Play Video Functionality
    const playBtn = document.querySelector('.play-btn');
    const productionVideo = document.querySelector('.production-video');

    playBtn.addEventListener('click', () => {
        // In a real implementation, you would replace this with actual video embed
        alert('Video playback would start here. Implement your video embed logic.');
    });

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());

        // Basic form validation
        const requiredFields = ['Your Name', 'Your Email', 'Tell us more about your needs...'];
        const missingFields = requiredFields.filter(field => 
            !formValues[field.toLowerCase().replace(/ /g, '_')]
        );

        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            return;
        }

        // Simulate form submission (replace with actual form submission logic)
        console.log('Form Submitted:', formValues);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Values Section Hover Effects
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Product Card Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
            card.style.transform = 'translateY(0)';
        });
    });

    // WhatsApp Chat Integration
    const whatsappBtn = document.querySelector('.whatsapp-chat');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            // Replace with actual WhatsApp number
            const phoneNumber = '+62XXXXXXXXXX'; // Example Indonesian phone number
            const message = 'Hello, I am interested in your coconut products.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoadOptions = {
        threshold: 0.5,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, lazyLoadOptions);

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});