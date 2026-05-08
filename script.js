// Loading animation
window.addEventListener('load', function() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 1000); // Show loading for at least 1 second
  }
});

let currentSlide = 0;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');

  if (n >= slides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = n;
  }

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Remove active class from all indicators
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });

  // Show current slide and activate indicator
  slides[currentSlide].classList.add('active');
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add('active');
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Auto slide functionality
function autoSlide() {
  nextSlide();
}

// Start auto slide every 5 seconds
let slideInterval = setInterval(autoSlide, 5000);

// Pause auto slide on hover
const slider = document.querySelector('.slider');
if (slider) {
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

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

// Image optimization and gallery features
document.addEventListener('DOMContentLoaded', function() {
  // Image lazy loading and error handling
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading class initially
    img.classList.add('loading');

    img.addEventListener('load', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
    });

    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      this.classList.remove('loading');
      this.classList.add('error');

      // Create fallback content
      const fallback = document.createElement('div');
      fallback.className = 'image-fallback';
      fallback.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px;">🖼️</div>
          <div>Gambar tidak dapat dimuat</div>
          <small style="color: #888;">${this.alt || 'Image'}</small>
        </div>
      `;

      // Replace image with fallback
      this.parentNode.replaceChild(fallback, this);
    });

    // Trigger load event for cached images
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.remove('loading');
      img.classList.add('loaded');
    } else if (img.complete) {
      // Image failed to load (cached error)
      img.dispatchEvent(new Event('error'));
    }
  });

  // Gallery enhancement - click to enlarge (optional)
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => {
    slide.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        // Could add lightbox functionality here
        console.log('Gallery image clicked:', this.querySelector('img').alt);
      }
    });
  });

  // Video optimization
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('error', function() {
      console.warn('Video failed to load:', this.currentSrc);
      // Fallback to a static image or message
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e293b, #0f172a);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #38bdf8;
        font-size: 1.5rem;
        text-align: center;
      `;
      fallback.innerHTML = '🎥 Video tidak dapat dimuat';
      this.parentNode.replaceChild(fallback, this);
    });
  });
});

// Image preloading for better performance
function preloadImages() {
  const imageSources = [
    'image/WhatsApp Image 2026-05-06 at 10.49.48 (1).jpeg',
    'image/WhatsApp Image 2026-05-06 at 10.49.48 (2).jpeg',
    'image/WhatsApp Image 2026-05-06 at 10.49.48 (3).jpeg',
    'image/WhatsApp Image 2026-05-06 at 10.49.48 (4).jpeg'
  ];

  const videoSource = 'image/WhatsApp Video 2026-05-06 at 12.52.22.mp4';

  // Preload images
  imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Preload video metadata
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = videoSource;
}

// Gallery navigation improvements
function enhanceGallery() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  // Add touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide(); // Swipe left - next slide
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide(); // Swipe right - previous slide
    }
  }
}

// Initialize enhancements
document.addEventListener('DOMContentLoaded', function() {
  preloadImages();
  enhanceGallery();
});
