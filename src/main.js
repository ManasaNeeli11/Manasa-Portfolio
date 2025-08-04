var typed = new Typed(".text", {
    strings: ["Web Developer", "Figma Designer", "YouTuber", "Content Writer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


const certificates = document.querySelectorAll(".certificate-card");
let currentIndex = 0;
function showCertificate(index) {
  certificates.forEach((certificate, i) => {
      certificate.classList.remove("active");
      if (i === index) {
          certificate.classList.add("active");
      }
  });
}

document.getElementById("prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
  showCertificate(currentIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % certificates.length;
  showCertificate(currentIndex);
});

// Initialize first certificate as active
showCertificate(currentIndex);

// Toggle menu on button click
function toggleMenu() {
  var navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
}



// Toggle menu on button click
function toggleMenu() {
  var navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
}

// Close menu when an option is clicked
document.querySelectorAll(".navbar a").forEach(item => {
  item.addEventListener("click", () => {
      document.querySelector(".navbar").classList.remove("active"); // Close the menu
  });
});



    