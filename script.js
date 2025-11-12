
// Calimatbloc Main JavaScript
class CalimatblocApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('Calimatbloc App Loaded');
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupImageLoading();
        this.setupFormHandling();
        this.setupTrustSignals();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Animate stats counting
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .grid > div, img, .trust-badge').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace('%', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, 16);
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupImageLoading() {
        // Lazy loading enhancement
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src') || img.getAttribute('src');
                    img.src = src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                // Add data-src for lazy loading
                if (!img.hasAttribute('data-src')) {
                    img.setAttribute('data-src', img.getAttribute('src'));
                    img.removeAttribute('src');
                }
                imageObserver.observe(img);
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }

    setupFormHandling() {
        // Contact form handling
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }

        // Add form validation
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'tel':
                isValid = /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\D/g, ''));
                message = isValid ? '' : 'Please enter a valid phone number';
                break;
            default:
                isValid = value.length > 0;
                message = isValid ? '' : 'This field is required';
        }

        // Show/hide error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        field.classList.toggle('error', !isValid);

        return isValid;
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate all fields
        let isValid = true;
        form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-yellow text-black'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    setupTrustSignals() {
        // Add trust signal animations
        const trustBadges = document.querySelectorAll('.trust-badge');
        trustBadges.forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Utility functions
const Utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatPhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalimatblocApp();
    feather.replace();
});

// Export for global access
window.CalimatblocApp = CalimatblocApp;
window.Utils = Utils;

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ef4444 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    input, select, textarea {
        transition: border-color 0.3s ease;
    }
    
    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #e5d708;
        box-shadow: 0 0 0 3px rgba(229, 215, 8, 0.1);
    }
`;
document.head.appendChild(style);
