var typed = new Typed(".text", {
    strings: ["Web Developer", "Figma Designer", "YouTuber", "Content Writer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

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
            sections.forEach(section => {
                section.classList.add('hidden');
            });

            // Show the target section
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            document.querySelector('.navbar').classList.remove('active');
        });
    });
});

document.addEventListener('touchstart', function(event) {
    if (!event.target.closest('button') && !event.target.closest('.btn-box') && !event.target.closest('.control-btn') && !event.target.closest('.contact-button')) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const touch = event.touches[0];
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${touch.clientX}px`;
        ripple.style.top = `${touch.clientY}px`;
        ripple.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const wrappers = document.querySelectorAll('.certificate-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function showCertificate(index) {
        wrappers.forEach(wrapper => wrapper.classList.remove('active'));
        wrappers[index].classList.add('active');
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === wrappers.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showCertificate(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < wrappers.length - 1) {
            currentIndex++;
            showCertificate(currentIndex);
        }
    });

    function adjustCertificateSize() {
        const activeWrapper = document.querySelector('.certificate-wrapper.active');
        if (activeWrapper) {
            const img = activeWrapper.querySelector('img');
            if (img) {
                const card = activeWrapper.querySelector('.certificate-card');
                card.style.minHeight = `${img.naturalHeight + 30}px`;
            }
        }
    }

    window.addEventListener('resize', adjustCertificateSize);
    wrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (img.complete) {
            adjustCertificateSize();
        } else {
            img.addEventListener('load', adjustCertificateSize);
        }
    });

    showCertificate(currentIndex);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.querySelector('.contact-section');
    const contactContainer = document.querySelector('.contact-container');
    
    setTimeout(() => {
        contactContainer.classList.add('visible');
    }, 300);
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactContainer.classList.remove('visible');
                void contactContainer.offsetWidth;
                setTimeout(() => {
                    contactContainer.classList.add('visible');
                }, 50);
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
        
        setTimeout(() => {
            particlesContainer.remove();
        }, 3000);
    }
});

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