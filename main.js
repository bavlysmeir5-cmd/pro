const revealItems = document.querySelectorAll(".animate-item");
const progressBars = document.querySelectorAll(".skill-bar");
const navLinks = document.querySelectorAll(".nav-links a");
const heroHeading = document.querySelector(".hero-copy h1");

const observerOptions = {
  threshold: 0.18,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("load", () => {
  progressBars.forEach((bar) => {
    const width = bar.dataset.width;
    bar.style.width = width;
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
});

const words = ["واجهات أنيقة", "تجربة استخدام سريعة", "تصميم متجاوب للهواتف"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const current = words[wordIndex];
  const updatedText = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  heroHeading.textContent = updatedText;

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWriter, 400);
  } else {
    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeWriter, isDeleting ? 80 : 120);
  }
}

if (heroHeading) {
  setTimeout(typeWriter, 800);
}
