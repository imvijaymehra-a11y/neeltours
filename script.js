// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// WhatsApp Booking Function
function openWhatsApp() {
    const phoneNumber = "9896037769";
    const message = encodeURIComponent("Hi! I'd like to book a cab with Neel Tour Travels.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Route Booking Function
function bookRoute(route) {
    const message = encodeURIComponent(
        `Hi! I'd like to book a cab for: ${route}\n\n` +
        `Please provide me with availability and pricing details.`
    );
    const whatsappUrl = `https://wa.me/9896037769?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Service Booking Function
function bookService(service) {
    const message = encodeURIComponent(
        `Hi! I'm interested in booking: ${service}\n\n` +
        `Please provide me with more details and availability.`
    );
    const whatsappUrl = `https://wa.me/9896037769?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Booking Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fromLocation = document.getElementById('fromLocation').value;
    const toLocation = document.getElementById('toLocation').value;
    const travelDate = document.getElementById('travelDate').value;
    const travelTime = document.getElementById('travelTime').value;
    const carType = document.getElementById('carType').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showAlert('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Create booking message
    const bookingMessage = encodeURIComponent(
        `🚗 New Booking Request!\n\n` +
        `📍 From: ${fromLocation.charAt(0).toUpperCase() + fromLocation.slice(1)}\n` +
        `🎯 To: ${toLocation}\n` +
        `📅 Date: ${travelDate}\n` +
        `⏰ Time: ${travelTime}\n` +
        `🚙 Car Type: ${carType.charAt(0).toUpperCase() + carType.slice(1)}\n` +
        `📞 Phone: ${phoneNumber}\n\n` +
        `Please confirm my booking. Thank you!`
    );
    
    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/9896037769?text=${bookingMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showAlert('Booking request sent! We will contact you soon.', 'success');
    
    // Reset form
    this.reset();
});

// Show Alert Function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-custom');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-custom alert-${type}-custom`;
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
            ${message}
        </div>
    `;
    
    // Insert after form
    const form = document.getElementById('bookingForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Phone number formatting
document.getElementById('phoneNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Set minimum date to today
document.getElementById('travelDate').min = new Date().toISOString().split('T')[0];

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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.form.checkValidity()) {
            return;
        }
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 3000);
    });
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

// Observe all counter elements
document.querySelectorAll('[data-counter]').forEach(counter => {
    counterObserver.observe(counter);
});

// Form field focus effects
document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Dynamic pricing based on distance (mock calculation)
function calculatePrice(from, to, carType) {
    const basePrices = {
        'sedan': 8,
        'suv': 12,
        'tempo': 15,
        'innova': 10
    };
    
    // Mock distance calculation (in real app, use Google Maps API)
    const distance = Math.floor(Math.random() * 500) + 50;
    const basePrice = basePrices[carType] || 10;
    const totalPrice = distance * basePrice;
    
    return {
        distance: distance,
        price: totalPrice
    };
}

// Add to cart functionality (for future enhancements)
function addToCart(service) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(service);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize cart count on page load
updateCartCount();

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Neel Tour Travels - Cab Booking Services',
            text: 'Book comfortable and affordable cab services from Ambala & Chandigarh to all over India',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showAlert('Link copied to clipboard!', 'success');
    }
}

// Emergency contact functionality
function emergencyCall() {
    if (confirm('Are you sure you want to call emergency contact?')) {
        window.location.href = 'tel:9896037769';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add floating WhatsApp button
    const whatsappFloat = document.createElement('div');
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappFloat.onclick = openWhatsApp;
    document.body.appendChild(whatsappFloat);
    
    // Add current year to footer
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    console.log('Neel Tour Travels website initialized successfully!');
});
