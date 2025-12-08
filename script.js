// JavaScript pentru Landing Page cu PillNav și GSAP

// PillNav Variables
const circleRefs = [];
const tlRefs = [];
const activeTweenRefs = [];
let logoTweenRef = null;
const ease = 'power3.easeOut';

// Initialize PillNav
function initPillNav() {
  const pills = document.querySelectorAll('.pill');
  const logo = document.getElementById('pill-logo');
  const navItems = document.getElementById('pill-nav-items');

  // Setup circles for each pill
  pills.forEach((pill, i) => {
    const circle = pill.querySelector('.hover-circle');
    if (circle) {
      circleRefs[i] = circle;
      setupPillLayout(i);
      
      // Add event listeners
      pill.addEventListener('mouseenter', () => handleEnter(i));
      pill.addEventListener('mouseleave', () => handleLeave(i));
      
      // Prevent default and add smooth scroll
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const href = pill.getAttribute('href');
        if (href && href.startsWith('#')) {
          scrollToSection(href);
        }
      });
    }
  });

  // Logo animation
  if (logo) {
    logo.addEventListener('mouseenter', handleLogoEnter);
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('#home');
    });
    
    // Initial logo animation
    gsap.set(logo, { scale: 0 });
    gsap.to(logo, { scale: 1, duration: 0.6, ease });
  }

  // Nav items animation
  if (navItems) {
    gsap.set(navItems, { width: 0, overflow: 'hidden' });
    gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
  }


  // Resize handler
  window.addEventListener('resize', () => {
    pills.forEach((_, i) => setupPillLayout(i));
  });

  // Font load handler
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      pills.forEach((_, i) => setupPillLayout(i));
    }).catch(() => {});
  }
}

function setupPillLayout(index) {
  const circle = circleRefs[index];
  if (!circle?.parentElement) return;

  const pill = circle.parentElement;
  const rect = pill.getBoundingClientRect();
  const { width: w, height: h } = rect;
  
  const R = ((w * w) / 4 + h * h) / (2 * h);
  const D = Math.ceil(2 * R) + 2;
  const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
  const originY = D - delta;

  circle.style.width = `${D}px`;
  circle.style.height = `${D}px`;
  circle.style.bottom = `-${delta}px`;

  gsap.set(circle, {
    xPercent: -50,
    scale: 0,
    transformOrigin: `50% ${originY}px`
  });

  const label = pill.querySelector('.pill-label');
  const white = pill.querySelector('.pill-label-hover');

  if (label) gsap.set(label, { y: 0 });
  if (white) gsap.set(white, { y: h + 12, opacity: 0 });

  // Kill existing timeline
  if (tlRefs[index]) tlRefs[index].kill();

  const tl = gsap.timeline({ paused: true });
  tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
  
  if (label) {
    tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
  }
  
  if (white) {
    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
  }

  tlRefs[index] = tl;
}

function handleEnter(i) {
  const tl = tlRefs[i];
  if (!tl) return;

  activeTweenRefs[i]?.kill();
  activeTweenRefs[i] = tl.tweenTo(tl.duration(), {
    duration: 0.3,
    ease,
    overwrite: 'auto'
  });
}

function handleLeave(i) {
  const tl = tlRefs[i];
  if (!tl) return;

  activeTweenRefs[i]?.kill();
  activeTweenRefs[i] = tl.tweenTo(0, {
    duration: 0.2,
    ease,
    overwrite: 'auto'
  });
}

function handleLogoEnter() {
  const logo = document.getElementById('pill-logo');
  if (!logo) return;

  logoTweenRef?.kill();
  gsap.set(logo, { rotate: 0 });
  logoTweenRef = gsap.to(logo, {
    rotate: 360,
    duration: 0.2,
    ease,
    overwrite: 'auto'
  });
}


// Smooth Scroll Function
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// FAQ Accordion
let openFAQIndex = null;

function toggleFAQ(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqAnswer = faqItems[index].querySelector('.faq-answer');
  const faqIcon = faqItems[index].querySelector('.faq-icon');
  
  faqItems.forEach((item, i) => {
    if (i !== index) {
      item.classList.remove('active');
      item.querySelector('.faq-answer').classList.remove('show');
      item.querySelector('.faq-answer').classList.add('hidden');
    }
  });
  
  if (openFAQIndex === index) {
    faqItems[index].classList.remove('active');
    faqAnswer.classList.remove('show');
    faqAnswer.classList.add('hidden');
    openFAQIndex = null;
  } else {
    faqItems[index].classList.add('active');
    faqAnswer.classList.remove('hidden');
    faqAnswer.classList.add('show');
    openFAQIndex = index;
  }
}

// Intersection Observer pentru animații la scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '-100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize PillNav
  initPillNav();
  
  // Animații pentru elemente fade-in-up
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
  
  // Setează anul curent în footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
  
  // Add event listener for servicii button
  const serviciiBtn = document.getElementById('servicii-more-btn');
  if (serviciiBtn) {
    serviciiBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal('servicii');
    });
  }
});

// Smooth scroll pentru link-urile din navigare
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Modal/Popup Functions
const modalContent = {
  experienta: {
    title: 'Experiența mea',
    content: `
      <div class="space-y-4">
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Am absolvit Facultatea de Medicină a Universității Transilvania din Brașov în <strong>2013</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Am efectuat perioada de rezidențiat la <strong>Spitalul de Psihiatrie și Neurologie Brașov</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Am efectuat gărzi în cadrul Spitalului de Psihiatrie și Neurologie Brașov precum și în cadrul <strong>Spitalului Județean de Urgență "Dr. Fogolyan Kristof" Sfântu Gheorghe</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Lucrez ca <strong>Medic psihiatru din 2018</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Activez în cadrul <strong>Ambulatoriului Spitalului Clinic Militar de Urgență "Regina Maria" Brașov</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Acord consultații în cadrul <strong>clinicii Neuromedica din Brașov</strong></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Am la activ numeroase <strong>cursuri de specialitate</strong> legate de patologia psihiatrică, precum și comunicare medic-pacient, gestionarea situațiilor de criză, bunăstarea emoțională și descoperirea potențialului interior</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#3d7a5f] mt-1 text-lg"></span>
            <span class="text-[#5a8a6c] text-base leading-7">Am competențe de <strong>limba engleză nivel C1 (avansat)</strong></span>
          </li>
        </ul>
      </div>
    `
  },
  filosofie: {
    title: 'Despre mine',
    content: `
      <div class="space-y-6">
        <div>
          <h4 class="text-xl font-semibold text-[#2a5a4c] mb-3">Misiunea mea</h4>
          <p class="text-[#5a7a6c] text-base leading-7 mb-4">
            Atingerea <strong>echilibrului emoțional</strong> prin oferirea unei abordări <strong>personalizate</strong> și <strong>integrate</strong> unde tratamentul se concentrează pe persoana în ansamblul ei. Pun accentul pe crearea unei <strong>relații terapeutice solide</strong> bazate pe <strong>comunicare deschisă</strong> pentru a descoperi și a fortifica <strong>resursele interioare</strong> unice ale fiecărui pacient.
          </p>
        </div>
        
        <div>
          <h4 class="text-xl font-semibold text-[#2a5a4c] mb-3">Viziunea mea</h4>
          <p class="text-[#5a7a6c] text-base leading-7 mb-4">
            Să stabilesc un <strong>nou standard</strong> în psihiatrie prin îmbinarea <strong>rigorii științifice</strong> cu <strong>empatia profundă</strong>, considerând actul medical ca o <strong>întâlnire esențială</strong> între știință și umanitate. Vizez <strong>creșterea calității vieții</strong> pacienților ajutându-i să-și regăsească pe deplin <strong>echilibrul emoțional</strong>.
          </p>
        </div>
      </div>
    `
  },
  servicii: {
    title: 'Servicii',
    content: `
      <div class="space-y-6">
        <div>
          <h4 class="text-lg font-semibold text-[#3d7a5f] mb-4">Consultații, consiliere psihiatrică și psihoeducație în:</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">dificultăți de adaptare la stres și diverse probleme psihoemotionale (ex. schimbarea locului de muncă, divorț, pierderea unei persoane dragi, maternitate, probleme de sănătate)</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări ale dispoziției: depresie, tulburare bipolară</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări anxioase: anxietate generalizată, tulburare de panică, anxietate socială, fobii, tulburare obsesiv-compulsivă</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări psihotice: schizofrenia și alte psihoze</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări neurocognitive: demența Alzheimer sau vasculară</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări ale consumului de substanțe: alcool, tutun, alte substanțe</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">tulburări de somn</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold text-[#3d7a5f] mb-4">Elaborarea unui plan de tratament individualizat</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">prescrierea tratamentului medicamentos și monitorizarea acestuia</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">recomandarea psihoterapiei</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold text-[#3d7a5f] mb-4">Eliberare de documente medicale</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">scrisori medicale</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">rețete</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">concedii medicale</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">bilete de trimitere către specialist</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">bilete de trimitere către investigații</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">referate medicale</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">aviz pentru concurs/angajare/înscriere</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">aviz pentru obținerea permisului de conducere</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg"></span>
              <span class="text-[#5a8a6c] text-base leading-7">aviz pentru permis de port-armă</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold text-[#3d7a5f] mb-4">Suport continuu</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-[#3d7a5f] mt-1 text-lg">•</span>
              <span class="text-[#5a8a6c] text-base leading-7">posibilitatea de a comunica cu mine telefonic între consultații</span>
            </li>
          </ul>
        </div>
      </div>
    `
  },
  consultatie: {
    title: 'Cum se desfășoară o consultație?',
    content: `
      <p class="text-[#5a7a6c] text-base leading-7 mb-4">
        În data și la ora <strong>programată</strong>, ajuns la cabinet, vei prezenta un <strong>document de identitate</strong> și după caz alte documente. Am să îți adresez câteva întrebări pentru a te <strong>cunoaște mai bine</strong> și apoi îți voi acorda <strong>timpul necesar</strong> pentru a-mi spune povestea ta.
      </p>
      <p class="text-[#5a7a6c] text-base leading-7 mb-4">
        Îți voi adresa întrebări prin care să obțin informații legate de <strong>starea ta psihică și fizică</strong>. Îți voi comunica cele constatate de mine și dacă este cazul, <strong>diagnosticul</strong> pe care l-am stabilit.
      </p>
      <p class="text-[#5a7a6c] text-base leading-7 mb-4">
        Apoi vom discuta despre <strong>opțiunile de tratament</strong>, având o abordare <strong>holistică</strong> și <strong>colaborativă</strong>. Vei afla informații despre medicamentele propuse, efectele medicației, durata tratamentului, precum și alte sfaturi.
      </p>
      <p class="text-[#5a7a6c] text-base leading-7 mb-4">
        Vom căuta și <strong>soluții alternative</strong> și <strong>terapii complementare</strong>. Am să îți eliberez <strong>documentele medicale necesare</strong>.
      </p>
      <p class="text-[#5a7a6c] text-base leading-7">
        Vom stabili data <strong>următorului consult</strong> pentru a evalua <strong>îndeplinirea planului terapeutic</strong> și <strong>evoluția simptomatologiei</strong>. Îți voi oferi <strong>modalități de a mă contacta</strong> între consultații.
      </p>
    `
  }
};

function openModal(type) {
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const content = modalContent[type];
  
  if (!content) {
    console.error('Modal content not found for type:', type);
    return;
  }
  
  if (!overlay || !modalBody) {
    console.error('Modal elements not found');
    return;
  }
  
  modalBody.innerHTML = `
    <h3 class="text-2xl font-medium text-[#3d7a5f] mb-4">${content.title}</h3>
    ${content.content}
  `;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Make function globally accessible
window.openModal = openModal;

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

