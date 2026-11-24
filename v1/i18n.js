/* =========================================================
   BEL AI Consulting — language switcher (en / fa / de)

   - English (en) is the default and lives in index.html.
   - Persian (fa) and German (de) live below, keyed by the data-i18n
     attribute of each element in index.html. A key that is missing
     here falls back to the English text in index.html.
   - Brand-guide originals: the Persian text (adapted to the "we" voice),
     the tagline "Turn AI into Value", the job title, and the English
     Mission / Vision. The other English text and all German text are
     translations that are NOT in the brand guide; have them reviewed.
   ========================================================= */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var LANGS = ['en', 'fa', 'de'];
  var DIR = { en: 'ltr', fa: 'rtl', de: 'ltr' };
  var STORAGE_KEY = 'bel-site-lang';

  // LinkedIn page language per site language. www.linkedin.com follows the
  // visitor's browser language, but these country subdomains always show
  // LinkedIn's guest pages in one language (tested 2026-11-23):
  // uk = English, de = German, ir = Persian. Logged-in visitors still see
  // LinkedIn in their own account language.
  var LINKEDIN_HOST = { en: 'uk.linkedin.com', de: 'de.linkedin.com', fa: 'ir.linkedin.com' };

  var T = {
    fa: {
      'meta.description': 'مشاوره هوش مصنوعی برای مدیران و کسب‌وکارها — BEL AI Consulting',
      'skip': 'رفتن به محتوا',
      'logo.alt': 'لوگوی BEL AI Consulting',
      'nav.label': 'منوی اصلی',
      'menu.label': 'منو',
      'lang.label': 'زبان',
      'nav.services': 'خدمات',
      'nav.about': 'درباره‌ی ما',
      'nav.contact': 'تماس',

      'hero.lead': 'به جای تمرکز بر تئوری و هیاهوی پیرامون AI، روی پیاده‌سازی عملی و نتایج واقعی تمرکز می‌کنیم.',
      'cta': 'درخواست مشاوره',

      'statement.label': 'جایگاه ما',
      'statement': 'ما درباره آخرین ابزارهای AI صحبت نمی‌کنیم؛ نشان می‌دهیم چگونه می‌توان <mark>با AI بهتر کار کرد، سریع‌تر تصمیم گرفت و زمان بیشتری برای کارهای ارزشمند داشت.</mark>',

      'audience.title': 'مخاطبان ما',
      'audience.1': 'متخصصان و کارمندان دانشی',
      'audience.2': 'مدیران میانی',
      'audience.3': 'صاحبان کسب‌وکارهای کوچک و متوسط',
      'audience.4': 'تیم‌های IT و تحول دیجیتال',

      // پیش‌نویس موقت خدمات
      'services.title': 'خدمات',
      'services.1.title': 'مشاوره‌ی پذیرش هوش مصنوعی',
      'services.1.text': 'شناسایی مسئله‌ی درست و مسیر درست برای استفاده از AI در کار روزمره‌ی افراد و تیم‌ها.',
      'services.2.title': 'همراهی در تحول دیجیتال',
      'services.2.text': 'پیاده‌سازی عملی AI با تمرکز بر نتایج واقعی کسب‌وکار.',
      'services.3.title': 'آموزش کاربردی هوش مصنوعی',
      'services.3.text': 'ساده و گام‌به‌گام برای مدیران و تیم‌ها، بدون نیاز به تخصص فنی عمیق.',
      'services.4.title': 'افزایش بهره‌وری و کاهش کارهای تکراری',
      'services.4.text': 'راهکارهای ساده و عملی برای صرفه‌جویی در زمان و تصمیم‌گیری سریع‌تر و بهتر.',

      'messages.title': 'پیام ما',
      'messages.1': 'هوش مصنوعی زمانی ارزشمند است که به نتایج واقعی کسب‌وکار منجر شود.',
      'messages.2': 'برای استفاده از هوش مصنوعی، نیازی نیست متخصص فناوری باشید؛ کافی است مسیر درست را بشناسید.',
      'messages.3': 'هر کسب‌وکار می‌تواند از هوش مصنوعی بهره ببرد، اگر از مسئله درست شروع کند.',
      'messages.1.num': '۱',
      'messages.2.num': '۲',
      'messages.3.num': '۳',

      'about.title': 'درباره‌ی ما',
      'about.pitch': 'به افراد و سازمان‌ها کمک می‌کنیم هوش مصنوعی را از یک موضوع پیچیده و پر از هیاهو به ابزاری عملی برای افزایش بهره‌وری، بهبود تصمیم‌گیری و خلق ارزش واقعی تبدیل کنند. با تکیه بر تجربه‌مان در فناوری، تحول دیجیتال و محیط‌های سازمانی، به افراد نشان می‌دهیم چگونه از AI در کار روزمره خود به شکلی ساده، مؤثر و نتیجه‌محور استفاده کنند.',
      'about.mission.title': 'مأموریت',
      'about.vision.title': 'چشم‌انداز',
      // Mission / Vision text stays in the original English on the Persian page

      'values.title': 'ارزش‌ها',
      'values.1.title': 'عمل‌گرایی',
      'values.1.text': 'روی نتیجه و خروجی تمرکز می‌کنیم، نه صرفاً دانش تئوری.',
      'values.2.title': 'سادگی',
      'values.2.text': 'پیچیده کردن موضوعات نشانه تخصص نیست؛ ساده توضیح دادن آن‌هاست.',
      'values.3.title': 'یادگیری مستمر',
      'values.3.text': 'رشد فردی و حرفه‌ای یک مسیر دائمی است.',
      'values.4.title': 'صداقت',
      'values.4.text': 'اعتماد مهم‌ترین دارایی ماست.',

      'contact.kicker': 'تماس',
      'contact.title': 'تبدیل ایده‌ها به ارزش با AI',
      'contact.text': 'مشاوره هوش مصنوعی برای مدیران و کسب‌وکارها'
    },

    de: {
      'meta.description': 'KI-Beratung für Führungskräfte und Unternehmen — BEL AI Consulting',
      'skip': 'Zum Inhalt springen',
      'logo.alt': 'Logo von BEL AI Consulting',
      'nav.label': 'Hauptnavigation',
      'menu.label': 'Menü',
      'lang.label': 'Sprache',
      'nav.services': 'Leistungen',
      'nav.about': 'Über uns',
      'nav.contact': 'Kontakt',

      'hero.lead': 'Statt uns auf Theorie und den Hype rund um KI zu konzentrieren, setzen wir auf praktische Umsetzung und echte Ergebnisse.',
      'cta': 'Beratung anfragen',

      'statement.label': 'Unsere Positionierung',
      'statement': 'Wir sprechen nicht über die neuesten KI-Tools – wir zeigen, wie man <mark>mit KI besser arbeitet, schneller entscheidet und mehr Zeit für wertvolle Aufgaben gewinnt.</mark>',

      'audience.title': 'Unsere Zielgruppe',
      'audience.1': 'Fachkräfte und Wissensarbeitende',
      'audience.2': 'Mittleres Management',
      'audience.3': 'Inhaber kleiner und mittlerer Unternehmen',
      'audience.4': 'IT- und Digitalisierungsteams',

      'services.title': 'Leistungen',
      'services.1.title': 'Beratung zur KI-Einführung',
      'services.1.text': 'Das richtige Problem und den richtigen Weg finden, um KI im Arbeitsalltag von Menschen und Teams einzusetzen.',
      'services.2.title': 'Begleitung der digitalen Transformation',
      'services.2.text': 'Praktische Umsetzung von KI mit Fokus auf echte Geschäftsergebnisse.',
      'services.3.title': 'Praxisnahe KI-Schulungen',
      'services.3.text': 'Einfach und Schritt für Schritt für Führungskräfte und Teams – ohne tiefes technisches Fachwissen.',
      'services.4.title': 'Mehr Produktivität, weniger Routinearbeit',
      'services.4.text': 'Einfache, praktische Lösungen, um Zeit zu sparen und schneller und besser zu entscheiden.',

      'messages.title': 'Unsere Botschaft',
      'messages.1': 'KI ist dann wertvoll, wenn sie zu echten Geschäftsergebnissen führt.',
      'messages.2': 'Um KI zu nutzen, müssen Sie kein Technologieexperte sein – es genügt, den richtigen Weg zu kennen.',
      'messages.3': 'Jedes Unternehmen kann von KI profitieren, wenn es beim richtigen Problem ansetzt.',

      'about.title': 'Über uns',
      'about.pitch': 'Wir helfen Menschen und Organisationen, KI von einem komplexen, von Hype geprägten Thema in ein praktisches Werkzeug zu verwandeln – für mehr Produktivität, bessere Entscheidungen und echten Mehrwert. Gestützt auf unsere Erfahrung in Technologie, digitaler Transformation und Unternehmensumfeldern zeigen wir, wie man KI einfach, wirksam und ergebnisorientiert im Arbeitsalltag einsetzt.',
      'about.mission.title': 'Mission',
      'about.mission.text': 'Fachkräfte, Führungskräfte und Organisationen dabei unterstützen, KI in ihrer täglichen Arbeit zu nutzen, um ihre Produktivität zu steigern und durch einfache, praktische und umsetzbare Lösungen nachhaltige Wettbewerbsvorteile zu schaffen.',
      'about.vision.title': 'Vision',
      'about.vision.text': 'Eine führende Stimme für KI-Einführung und KI-Beratung zu werden und Fachkräfte, Führungskräfte und Organisationen zu befähigen, das volle Potenzial von KI durch praktische, menschenzentrierte und ergebnisorientierte Lösungen zu nutzen.',

      'values.title': 'Werte',
      'values.1.title': 'Pragmatismus',
      'values.1.text': 'Wir konzentrieren uns auf Ergebnisse und Wirkung, nicht nur auf theoretisches Wissen.',
      'values.2.title': 'Einfachheit',
      'values.2.text': 'Themen kompliziert zu machen, ist kein Zeichen von Expertise – sie einfach zu erklären schon.',
      'values.3.title': 'Kontinuierliches Lernen',
      'values.3.text': 'Persönliches und berufliches Wachstum ist ein fortlaufender Weg.',
      'values.4.title': 'Ehrlichkeit',
      'values.4.text': 'Vertrauen ist unser wichtigstes Kapital.',

      'contact.kicker': 'Kontakt',
      'contact.title': 'Ideen mit KI in Wert verwandeln',
      'contact.text': 'KI-Beratung für Führungskräfte und Unternehmen'
    }
  };

  var root = document.documentElement;
  var metaDesc = document.querySelector('meta[name="description"]');
  var textEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var attrEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-attr]'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.lang-switch [data-lang]'));
  var linkedinLinks = Array.prototype.slice.call(document.querySelectorAll('a[href*="linkedin.com/in/"]'));

  function parseAttrMap(el) {
    return el.getAttribute('data-i18n-attr').split(';').map(function (part) {
      var bits = part.split(':');
      return { attr: bits[0].trim(), key: (bits[1] || '').trim() };
    });
  }

  // Capture the English defaults from the page so English lives in one place.
  var base = { 'meta.description': metaDesc ? metaDesc.content : '' };
  textEls.forEach(function (el) { base[el.getAttribute('data-i18n')] = el.innerHTML; });
  attrEls.forEach(function (el) {
    parseAttrMap(el).forEach(function (pair) { base[pair.key] = el.getAttribute(pair.attr); });
  });

  function lookup(lang, key) {
    var dict = T[lang];
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return base[key];
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;

    root.lang = lang;
    root.dir = DIR[lang];
    if (metaDesc) metaDesc.content = lookup(lang, 'meta.description');

    textEls.forEach(function (el) {
      el.innerHTML = lookup(lang, el.getAttribute('data-i18n'));
      // Mission/Vision: original English is kept on the Persian page
      var faLang = el.getAttribute('data-fa-lang');
      if (faLang) el.lang = (lang === 'fa') ? faLang : lang;
    });

    attrEls.forEach(function (el) {
      parseAttrMap(el).forEach(function (pair) {
        el.setAttribute(pair.attr, lookup(lang, pair.key));
      });
    });

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    linkedinLinks.forEach(function (a) {
      try {
        var url = new URL(a.href);
        url.hostname = LINKEDIN_HOST[lang] || LINKEDIN_HOST[DEFAULT_LANG];
        url.searchParams.delete('locale');
        a.href = url.toString();
      } catch (e) { /* leave link as is */ }
    });
  }

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    try {
      var url = new URL(window.location.href);
      if (lang === DEFAULT_LANG) url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    } catch (e) { /* e.g. some browsers block this on file:// */ }
  }

  function initialLang() {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (fromUrl && LANGS.indexOf(fromUrl) !== -1) return fromUrl;
    } catch (e) { /* ignore */ }
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) { /* ignore */ }
    return DEFAULT_LANG;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      apply(lang);
      save(lang);
    });
  });

  var start = initialLang();
  if (start !== DEFAULT_LANG) apply(start);
})();
