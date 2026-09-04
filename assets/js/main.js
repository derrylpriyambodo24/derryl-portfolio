/**
 * Main JavaScript logic for Derryl Priyambodo's Portfolio Website
 * Warm Creative Developer Guidelines Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollReveal();
  initActiveNavHighlight();
  initMobileMenu();
  initProjectModals();
  initContactForm();
});

/* ==========================================================================
   1. Dark / Light Mode Toggle with Persistence (Warm Dark Scheme)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const html = document.documentElement;

  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
}

/* ==========================================================================
   2. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to prevent re-animating
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. Active Section Navigation Highlighter
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Menu Drawer Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    if (open) {
      mobileMenu.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    } else {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    }
  };

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   5. Interactive Project Detail Modals
   ========================================================================== */
const projectData = {
  thesis: {
    title: "Comparative Analysis of CNN Architectures for Lung Cancer Classification",
    badge: "Thesis Research • 2025–2026",
    summary: "Comprehensive comparative evaluation of 3 transfer-learning-based Convolutional Neural Network architectures (VGG16, ResNet50, DenseNet121) for histopathology lung cancer classification.",
    image: "assets/images/thesis-preview.jpg",
    details: [
      "Objective: Determine the most accurate CNN architecture for automated multi-class lung histopathology diagnosis.",
      "Classes: Adenocarcinoma, Benign tissue, Squamous cell carcinoma.",
      "Workflows: Advanced image preprocessing, transfer learning fine-tuning, cross-architecture precision/recall & F1-score evaluation.",
      "Results: ResNet50 & DenseNet121 achieved >96% validation accuracy with fast inference times suitable for clinical decision support."
    ],
    tech: ["Python", "TensorFlow", "Keras", "ResNet50", "DenseNet121", "VGG16", "OpenCV", "Jupyter Notebook"]
  },
  learningBuddy: {
    title: "Learning Buddy — AI Capstone Platform",
    badge: "Capstone Project • Oct–Dec 2025",
    summary: "AI-powered web chatbot platform built by a 5-member team that delivers personalized learning paths, interactive study assistance, and adaptive skill assessments.",
    image: "assets/images/learning-buddy.jpg",
    details: [
      "Role: Machine Learning Lead & Integration Specialist.",
      "Implemented NLP models using Word2Vec and fine-tuned LLMs for contextual question answering.",
      "Designed dynamic assessment algorithm determining user proficiency levels (Beginner, Intermediate, Advanced).",
      "Embedded seamless web UI widgets and responsive chat interface."
    ],
    tech: ["Python", "Natural Language Processing", "Word2Vec", "LLM Fine-tuning", "JavaScript", "Flask", "Tailwind CSS"]
  },
  labAssistant: {
    title: "Intermediate Accounting Lab System & Web Identity",
    badge: "Gunadarma University • Jul 2025",
    summary: "Comprehensive IT support, accounting software management, and visual/web asset design for Gunadarma University's Intermediate Accounting Laboratory.",
    image: "assets/images/lab-project.jpg",
    details: [
      "Administered laboratory network infrastructure and specialized accounting suites (Zahir Accounting & Zahir ERP).",
      "Designed visual identity materials, official assistant ID cards, event posters, and laboratory portal layout.",
      "Provided ongoing technical support for hundreds of student lab sessions."
    ],
    tech: ["Zahir ERP", "Zahir Accounting", "IT Support", "Figma", "HTML5/CSS3", "Visual Design"]
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalSummary = document.getElementById('modal-summary');
  const modalImage = document.getElementById('modal-image');
  const modalDetails = document.getElementById('modal-details-list');
  const modalTech = document.getElementById('modal-tech-pills');

  if (!modal) return;

  window.openProjectModal = function(key) {
    const data = projectData[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalSummary.textContent = data.summary;
    modalImage.src = data.image;

    // Render detail points
    modalDetails.innerHTML = data.details.map(item => `<li class="flex items-start gap-2"><span class="text-[#E98973] font-bold">•</span> <span>${item}</span></li>`).join('');

    // Render tech pills
    modalTech.innerHTML = data.tech.map(t => `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-[#F1EDE5] dark:bg-[#36322D] text-[#292725] dark:text-[#F5F0E8] border border-[rgba(41,39,37,0.08)]">${t}</span>`).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   6. Contact Form Submission Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show toast notification
      if (toast) {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }, 4000);
      }
    }, 1000);
  });
}

