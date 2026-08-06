const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const THEME_KEY = 'itmitalles-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-switch]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-theme-switch') === theme));
  });
}

applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

document.querySelectorAll('[data-theme-switch]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme-switch');
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  });
});

const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
});

const LANG_KEY = 'itmitalles-lang';

const headTranslations = {
  de: {
    title: 'IT mit alles – IT-Service in München',
    description: 'IT mit alles: verständlicher IT-Service für kleine Firmen, Selbstständige und Privatpersonen in München.',
    ogTitle: 'IT mit alles – IT-Service in München',
    ogDescription: 'Netzwerk, Geräte, Server, Cloud und Web. Persönlich, verständlich und ohne unnötiges Abo.',
    ld: {
      description: 'IT-Service für kleine Firmen, Selbstständige und Privatpersonen in München.',
      areaServed: ['München'],
      serviceType: ['IT-Service', 'Systemadministration', 'Netzwerk und WLAN', 'E-Commerce und Web', 'Automatisierung und individuelle Tools'],
    },
  },
  en: {
    title: 'IT mit alles – IT Service in Munich',
    description: 'IT mit alles: plain-language IT service for small businesses, freelancers and individuals in Munich.',
    ogTitle: 'IT mit alles – IT Service in Munich',
    ogDescription: 'Network, devices, servers, cloud and web. Personal, understandable, and without unnecessary subscriptions.',
    ld: {
      description: 'IT service for small businesses, freelancers and individuals in Munich.',
      areaServed: ['Munich'],
      serviceType: ['IT Service', 'System Administration', 'Network and WiFi', 'E-Commerce and Web', 'Automation and Custom Tools'],
    },
  },
};

function applyLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;

  const head = headTranslations[lang];
  if (head) {
    document.title = head.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', head.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', head.ogTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', head.ogDescription);

    const ldScript = document.querySelector('#ld-json');
    if (ldScript) {
      try {
        const data = JSON.parse(ldScript.textContent);
        Object.assign(data, head.ld);
        ldScript.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        // leave JSON-LD untouched if it can't be parsed
      }
    }
  }

  document.querySelectorAll('[data-label-de]').forEach((el) => {
    const label = el.getAttribute(lang === 'en' ? 'data-label-en' : 'data-label-de');
    if (label) el.setAttribute('aria-label', label);
  });

  document.querySelectorAll('[data-placeholder-de]').forEach((el) => {
    const placeholder = el.getAttribute(lang === 'en' ? 'data-placeholder-en' : 'data-placeholder-de');
    if (placeholder) el.setAttribute('placeholder', placeholder);
  });

  const emailLink = document.querySelector('#contact-email');
  if (emailLink) {
    const subject = emailLink.getAttribute(lang === 'en' ? 'data-subject-en' : 'data-subject-de');
    if (subject) emailLink.href = `mailto:tim@itmitalles.de?subject=${encodeURIComponent(subject)}`;
  }

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-switch') === lang));
  });

  localStorage.setItem(LANG_KEY, lang);
}

function initialLanguage() {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'de' || stored === 'en') return stored;
  return navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
  btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang-switch')));
});

applyLanguage(initialLanguage());

const contactForm = document.querySelector('#contact-form');
const contactFormStatus = document.querySelector('#contact-form-status');

const formStatusText = {
  sending: { de: 'Wird gesendet …', en: 'Sending …' },
  success: { de: 'Danke! Nachricht ist raus, ich melde mich.', en: 'Thanks! Message sent, I\'ll get back to you.' },
  error: { de: 'Hat nicht geklappt. Bitte direkt per Mail schreiben.', en: 'Something went wrong. Please email me directly instead.' },
};

function setFormStatus(state) {
  if (!contactFormStatus) return;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  contactFormStatus.textContent = formStatusText[state][lang];
  contactFormStatus.dataset.state = state;
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (contactForm.querySelector('.contact-form-honeypot')?.checked) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setFormStatus('sending');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus('success');
        contactForm.reset();
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    } finally {
      submitButton.disabled = false;
    }
  });
}
