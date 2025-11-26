# Landing Page Static - HTML, CSS, JavaScript

Site-ul a fost convertit într-un site static simplu cu **HTML**, **CSS** și **JavaScript vanilla** - fără framework-uri complexe!

## 📁 Structura Fișierelor

```
auralink-saa-s-landing-page/
├── index.html          # HTML-ul complet al site-ului
├── styles.css          # Stiluri custom și animații
├── script.js           # JavaScript pentru interactivitate
└── public/             # Imagini și resurse statice
    └── professional-female-psychiatrist-doctor-portrait-s.jpg
```

## 🚀 Cum să Rulezi Site-ul

### Opțiunea 1: Deschide direct în browser
Dublu-click pe `index.html` sau deschide-l în browser.

### Opțiunea 2: Cu un server local (recomandat)
```bash
# Python 3
python -m http.server 8000

# Sau cu Node.js (dacă ai http-server instalat)
npx http-server

# Apoi deschide: http://localhost:8000
```

## ✨ Funcționalități

- ✅ **Navigare smooth scroll** între secțiuni
- ✅ **Meniu mobil** responsive cu animații
- ✅ **Navbar** cu efect de blur la scroll
- ✅ **FAQ accordion** interactiv
- ✅ **Animații** fade-in la scroll
- ✅ **Design identic** cu versiunea React

## 🎨 Tehnologii Folosite

- **HTML5** - Structură semantică
- **Tailwind CSS** (via CDN) - Stiluri rapide
- **CSS3** - Animații și stiluri custom
- **JavaScript Vanilla** - Fără dependențe

## 📝 Editare Conținut

Tot conținutul este în `index.html`. Caută și modifică:
- Texte în secțiunile HTML
- Culori în clasele Tailwind sau în `styles.css`
- Imagini: schimbă path-ul în tag-ul `<img>`

## 🔧 Personalizare

### Schimbă culorile:
În `styles.css` sau direct în HTML, caută:
- `#2a5a4c` - Culoarea primară (verde)
- `#3a7a6c` - Culoarea hover
- `#f5f8f6` - Fundal deschis

### Adaugă animații:
În `styles.css`, adaugă în `@keyframes` sau folosește clasele existente:
- `.fade-in` - Fade in simplu
- `.fade-in-up` - Fade in cu mișcare în sus

## 📱 Responsive

Site-ul este complet responsive și funcționează pe:
- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

## 🌐 Deployment

Poți deploya acest site pe orice hosting static:
- **Netlify** - Drag & drop folder-ul
- **Vercel** - Drag & drop folder-ul
- **GitHub Pages** - Push în repo și activează Pages
- **Orice hosting static** - Upload fișierele

## ⚡ Performanță

Site-ul este extrem de rapid pentru că:
- ✅ Fără framework-uri mari
- ✅ Fără build process
- ✅ HTML static pur
- ✅ CSS și JS minime

## 🎯 Diferențe față de React

- **Mult mai simplu** - Doar 3 fișiere principale
- **Fără build** - Deschizi direct în browser
- **Fără dependențe** - Doar Tailwind CDN (opțional)
- **Ușor de editat** - Editezi direct HTML-ul
- **Design identic** - Același aspect vizual

---

**Gata de folosit!** 🎉

