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

const LANG_KEY = 'itmitalles-lang';

const headTranslations = {
  de: {
    title: 'IT mit alles – IT-Service aus Giesing',
    description: 'IT mit alles: verständlicher IT-Service für kleine Firmen, Selbstständige und Privatpersonen in Giesing und München.',
    ogTitle: 'IT mit alles – IT-Service aus Giesing',
    ogDescription: 'Netzwerk, Geräte, Server, Cloud und Web. Persönlich, verständlich und ohne unnötiges Abo.',
    ld: {
      description: 'IT-Service für kleine Firmen, Selbstständige und Privatpersonen in Giesing und München.',
      areaServed: ['Giesing', 'München'],
      serviceType: ['IT-Service', 'Systemadministration', 'Netzwerk und WLAN', 'E-Commerce und Web', 'Automatisierung und individuelle Tools'],
    },
  },
  en: {
    title: 'IT mit alles – IT Service from Giesing, Munich',
    description: 'IT mit alles: plain-language IT service for small businesses, freelancers and individuals in Giesing and Munich.',
    ogTitle: 'IT mit alles – IT Service from Giesing',
    ogDescription: 'Network, devices, servers, cloud and web. Personal, understandable, and without unnecessary subscriptions.',
    ld: {
      description: 'IT service for small businesses, freelancers and individuals in Giesing and Munich.',
      areaServed: ['Giesing', 'Munich'],
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
