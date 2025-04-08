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

  // Mobile menu functionality
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  console.log("Menu elements:", { menuBtn, mobileMenu });

  if (menuBtn && mobileMenu) {
    // Toggle menu on button click
    menuBtn.addEventListener("click", function (e) {
      console.log("Menu button clicked");
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        console.log("Clicked outside menu");
        mobileMenu.classList.add("hidden");
      }
    });

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        console.log("Menu link clicked");
        mobileMenu.classList.add("hidden");
      });
    });

    // Close menu on window resize
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 1024) {
          console.log("Window resized to desktop width");
          mobileMenu.classList.add("hidden");
        }
      }, 250);
    });
  } else {
    console.error("Menu elements not found:", { menuBtn, mobileMenu });
  }

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
