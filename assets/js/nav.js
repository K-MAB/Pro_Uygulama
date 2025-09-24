// public/js/nav.js
// Navbar'ı yükler + davranışları ayarlar (tam sürüm)
(async function mountNavbar() {
  const host = document.getElementById('navbar'); // sayfada <div id="navbar"></div> var
  if (!host) return;

  // --- HTML'i çek ve yerleştir ---
  const res = await fetch('partials/navbar.html');
  host.innerHTML = await res.text();

  // --- Google Fonts (Poppins) ekle ---
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // --- Stil: modern font + büyük yazı ---
  const style = document.createElement('style');
  style.textContent = `
    /* === Modern Font & Boyut === */
    #nav, #mobileMenu {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 1.1rem; /* ~18px mobil için */
    }
    @media (min-width:768px){
      #nav ul li a.nav-link {
        font-size: 1.25rem; /* ~20px masaüstü */
      }
    }

    /* Aktif link alt çizgisi */
    .nav-link{position:relative}
    .nav-link::after{
      content:"";
      position:absolute; left:0; bottom:-6px;
      width:64px; height:2px; border-radius:2px;
      background:linear-gradient(90deg,#13547a,#80d0c7);
      transform:scaleX(0);
      transform-origin:left;
      transition:transform .25s;
    }
    .nav-link:hover::after,
    .nav-link.active::after{ transform:scaleX(1); }
  `;
  document.head.appendChild(style);

  // --- Mobile toggle ---
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobileMenu');

  const toggleMobile = (open) => {
    mobile.classList.toggle('hidden', !open);
    mobile.classList.toggle('block', open);
    // Menü açıksa body scroll’u kilitle
    document.documentElement.classList.toggle('overflow-hidden', open);
  };

  burger?.addEventListener('click', () => {
    const isOpen = mobile.classList.contains('block');
    toggleMobile(!isOpen);
  });

  // Linke tıklanınca menüyü kapat
  mobile?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => toggleMobile(false))
  );

  // --- Aktif menü linkini işaretle ---
  const path = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      (path === 'index.html' && href.startsWith('index.html')) ||
      (path === 'about.html' && href.includes('about.html')) ||
      (path === 'services.html' && href.includes('services.html')) ||
      (path === 'contact.html' && href.includes('contact.html'))
    ) {
      a.classList.add('active');
    }
  });

  // --- Scroll davranışı ---
  const header = document.getElementById('site-header');
  const nav = document.getElementById('nav');

  const topStyle = () => {
    header.classList.remove('bg-white','shadow-lg');
    nav.classList.remove('text-neutral-900');
    nav.classList.add('text-white');
  };
  const stickyStyle = () => {
    header.classList.add('bg-white','shadow-lg');
    nav.classList.remove('text-white');
    nav.classList.add('text-neutral-900');
  };

  if (path === '' || path === 'index.html') {
    topStyle();
    const hero = document.getElementById('hero');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? topStyle() : stickyStyle());
    }, { threshold: 0, rootMargin: "-64px 0px 0px 0px" });
    if (hero) io.observe(hero);
  } else {
    stickyStyle();
  }
})();
