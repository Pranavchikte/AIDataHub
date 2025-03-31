// Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  // Create IntersectionObserver for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  // Observe all images
  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });

  // Optimize mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Debounced window resize handler
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 1024 && mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    }, 250);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Preload critical resources
window.addEventListener("load", function () {
  // Preload important images or resources
  const resourcesToPreload = [
    "./components/openai-operator.webp",
    "./components/transformer.avif",
  ];

  resourcesToPreload.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = resource;
    document.head.appendChild(link);
  });
});
