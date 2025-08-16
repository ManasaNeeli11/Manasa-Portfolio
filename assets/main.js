// Typed.js animation
var typed = new Typed(".text", {
    strings: ["Web Developer", "Figma Designer", "YouTuber", "Content Writer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Toggle mobile menu
function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
}

// Section navigation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const contactContainer = document.querySelector('.contact-container');

    // Show Home section by default
    sections.forEach(section => {
        if (section.classList.contains('home')) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = targetId ? document.getElementById(targetId) : document.querySelector('.home');

            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));

            // Show target section
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Add .visible class for Contact section
                if (targetId === 'Contact' && contactContainer) {
                    contactContainer.classList.remove('visible');
                    void contactContainer.offsetWidth; // Trigger reflow
                    setTimeout(() => contactContainer.classList.add('visible'), 50);
                }

                // Trigger timeline animations for Education section
                if (targetId === 'education') {
                    const timelineItems = document.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }
            }

            // Update active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            document.querySelector('.navbar').classList.remove('active');
        });
    });
});

// Touch ripple effect
document.addEventListener('touchstart', function(event) {
    if (!event.target.closest('button') &&
        !event.target.closest('.btn-box') &&
        !event.target.closest('.control-btn') &&
        !event.target.closest('.contact-button')) {
        
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const touch = event.touches[0];
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${touch.clientX}px`;
        ripple.style.top = `${touch.clientY}px`;
        ripple.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
});

// Certificates slider
document.addEventListener('DOMContentLoaded', function() {
    const wrappers = document.querySelectorAll('.certificate-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function showCertificate(index) {
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
            wrapper.style.transform = 'rotateY(-90deg)';
            wrapper.style.opacity = '0';
        });
        wrappers[index].classList.add('active');
        wrappers[index].style.transform = 'rotateY(0deg)';
        wrappers[index].style.opacity = '1';
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === wrappers.length - 1;
    }

    // Event listener for clicking certificate image to show the next certificate
    wrappers.forEach(wrapper => {
        const img = wrapper.querySelector('.certificate-img');
        img.addEventListener('click', () => {
            currentIndex = (currentIndex < wrappers.length - 1) ? currentIndex + 1 : 0;
            showCertificate(currentIndex);
        });
    });

    // Previous and Next button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showCertificate(currentIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < wrappers.length - 1) {
                currentIndex++;
                showCertificate(currentIndex);
            }
        });
    }

    // Adjust certificate size
    function adjustCertificateSize() {
        const activeWrapper = document.querySelector('.certificate-wrapper.active');
        if (activeWrapper) {
            const img = activeWrapper.querySelector('.certificate-img');
            if (img && img.complete) {
                const card = activeWrapper.querySelector('.certificate-card');
                card.style.height = 'auto';
                card.style.minHeight = `${img.clientHeight + 30}px`;
            }
        }
    }

    window.addEventListener('resize', adjustCertificateSize);
    wrappers.forEach(wrapper => {
        const img = wrapper.querySelector('.certificate-img');
        if (img.complete) {
            adjustCertificateSize();
        } else {
            img.addEventListener('load', adjustCertificateSize);
        }
    });

    showCertificate(currentIndex);
});

// Contact section animations
document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.querySelector('.contact-section');
    const contactContainer = document.querySelector('.contact-container');
    
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactContainer.classList.remove('visible');
                void contactContainer.offsetWidth; // Trigger reflow
                setTimeout(() => contactContainer.classList.add('visible'), 50);
                createBorderParticles();
            }
        });
    }, observerOptions);
    
    observer.observe(contactSection);
    
    function createBorderParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'border-particles';
        contactContainer.appendChild(particlesContainer);
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.backgroundColor = i % 2 === 0 ? '#0ef' : '#ff00ff';
            particlesContainer.appendChild(particle);
        }
        
        setTimeout(() => particlesContainer.remove(), 3000);
    }
});

// Education section animations
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.querySelector('.education');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    observer.observe(educationSection);
});

// Navbar hover colors
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('mouseover', () => {
        const colors = ['#0ef', '#ff00ff', '#00ffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        link.style.color = randomColor;
        link.style.textShadow = `0 0 10px ${randomColor}`;
    });
    link.addEventListener('mouseout', () => {
        link.style.color = '#fff';
        link.style.textShadow = 'none';
    });
});

// EmailJS integration
(function(){
    emailjs.init("Il0mbepftRu7ZWlax");
})();

function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !message) {
        formMessage.textContent = '⚠️ Please fill out all fields.';
        formMessage.classList.add('error');
        return;
    }

    const serviceID = 'service_jjhl60g';
    const templateID = 'template_zn5aci3';

    emailjs.send(serviceID, templateID, {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        formMessage.textContent = '✅ Message sent successfully!';
        formMessage.classList.remove('error');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }, (error) => {
        formMessage.textContent = '❌ Failed to send message. Please try again.';
        formMessage.classList.add('error');
        console.error('EmailJS error:', error);
    });
}