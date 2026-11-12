(function () {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');

  if (!header || !toggle) {
    return;
  }

  toggle.addEventListener('click', function () {
    const isOpen = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.rm-nav li').forEach(function (item) {
    const submenu = item.querySelector(':scope > .sub-menu');
    const link = item.querySelector(':scope > a');

    if (!submenu || !link) {
      return;
    }

    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    link.addEventListener('click', function (event) {
      event.preventDefault();
      const isOpen = item.classList.toggle('is-submenu-open');
      link.setAttribute('aria-expanded', String(isOpen));

      document.querySelectorAll('.rm-nav li.is-submenu-open').forEach(function (otherItem) {
        if (otherItem === item) {
          return;
        }
        otherItem.classList.remove('is-submenu-open');
        const otherLink = otherItem.querySelector(':scope > a');
        if (otherLink) {
          otherLink.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', function (event) {
    if (event.target.closest('.rm-nav')) {
      return;
    }

    document.querySelectorAll('.rm-nav li.is-submenu-open').forEach(function (item) {
      item.classList.remove('is-submenu-open');
      const link = item.querySelector(':scope > a');
      if (link) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const hero = document.querySelector('.rm-hero');
  const heroSlides = Array.isArray(window.RoMoCoHeroSlides) ? window.RoMoCoHeroSlides : [];

  if (hero && heroSlides.length > 1) {
    let activeSlide = 0;
    let autoplay = null;

    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'rm-hero-slides';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'rm-hero-dots';
    dotsWrap.setAttribute('aria-label', 'Hero image selector');

    const slideEls = heroSlides.map(function (src, index) {
      const slide = document.createElement('div');
      slide.className = 'rm-hero-slide';
      slide.style.backgroundImage = 'url("' + src + '")';

      if (index === 0) {
        slide.classList.add('is-active');
      }

      slidesWrap.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'rm-hero-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show hero image ' + (index + 1));

      if (index === 0) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-current', 'true');
      }

      dot.addEventListener('click', function () {
        showSlide(index);
        restartAutoplay();
      });

      dotsWrap.appendChild(dot);

      return slide;
    });

    const dotEls = Array.from(dotsWrap.querySelectorAll('.rm-hero-dot'));

    const showSlide = function (index) {
      activeSlide = index;

      slideEls.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === activeSlide);
      });

      dotEls.forEach(function (dot, dotIndex) {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle('is-active', isActive);

        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };

    const nextSlide = function () {
      showSlide((activeSlide + 1) % heroSlides.length);
    };

    const restartAutoplay = function () {
      if (autoplay) {
        window.clearInterval(autoplay);
      }

      autoplay = window.setInterval(nextSlide, 5500);
    };

    hero.prepend(slidesWrap);
    hero.appendChild(dotsWrap);
    restartAutoplay();
  }

  document.querySelectorAll('[data-cfp-lightbox]').forEach(function (trigger) {
    const openLightbox = function () {
      const image = trigger.querySelector('img');

      if (!image) {
        return;
      }

      const dialog = document.createElement('div');
      dialog.className = 'rm-lightbox';
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.innerHTML = '<button class="rm-lightbox-close" type="button" aria-label="Close preview">Close</button><img src="' + image.src + '" alt="' + image.alt + '">';
      document.body.appendChild(dialog);
      document.body.classList.add('rm-lightbox-open');

      const close = function () {
        dialog.remove();
        document.body.classList.remove('rm-lightbox-open');
        document.removeEventListener('keydown', onKeydown);
      };

      const onKeydown = function (event) {
        if (event.key === 'Escape') {
          close();
        }
      };

      dialog.addEventListener('click', function (event) {
        if (event.target === dialog || event.target.closest('.rm-lightbox-close')) {
          close();
        }
      });

      document.addEventListener('keydown', onKeydown);
    };

    trigger.addEventListener('click', openLightbox);
    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });
  });
}());
