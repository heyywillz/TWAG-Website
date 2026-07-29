# True Worshippers Assemblies of God (TWAG) Website

> The official, modern, and responsive website for **True Worshippers Assemblies of God Church**, located in Old Tafo-Abono, Ghana.

---

## Features Overview

### 1. Home (`index.html`)
- **Dynamic Hero Slideshow**: Smooth full-screen hero slider with custom progress bar indicators and auto-play paused on hover (`js/hero.js`).
- **Church Board Carousel**: Interactive leadership card slider with smooth scroll, touch/mouse drag support, and autoplay (`js/board.js`).
- **Interactive Lightbox Gallery**: High-resolution photo showcase with category filtering, modal view, counter indicators, and keyboard navigation (`js/gallery.js`).

### 2. About Us (`about.html`)
- **Church Mission & Vision**: Core beliefs, leadership structure, and history.
- **Service Times Accordion**: Expandable interactive accordion showcasing Sunday Worship, Mid-week Deliverance, and Friday Prayer times (`js/about.js`).

### 3. Departments & Ministries (`departments.html`)
- **Category Filtering**: Filter department cards by category (Worship, Youth, Women, Men, Children, etc.).
- **Executive Leadership Modals**: Interactive modal popups displaying executive officers, titles, and photos for over 17 church departments (`js/departments.js`).

### 4. Devotions (`devotions.html`)
- **Spotify Audio Player Embed**: Listen to daily devotions and sermons directly inside the embedded player (`js/devotions.js`).
- **Share & Link Copy**: One-click sharing modal and direct clipboard copying.

### 5. Events & Live Stream (`events.html`)
- **Live Sunday Countdown**: Real-time automated countdown timer to the next Sunday 8:30 AM Service (`js/events.js`).
- **YouTube Embedded Stream**: Direct video player for live services and previous recorded sermons.
- **Upcoming Events Calendar**: Details on upcoming church conferences, revivals, and community outreach.

### 6. Online Giving (`give.html`)
- **Interactive Contribution Calculator**: Preset GH₵ amount pills + custom donation entry (`js/give.js`).
- **Payment Method Switcher**: Instructions and modals for MTN Mobile Money (MoMo) and Ecobank Direct Transfer.
- **Toast Notifications**: Feedback toasts for copy actions and contribution completion.

### 7. Contact Us (`contact.html`)
- **Interactive Contact Form**: Form validation with simulated submission toasts (`js/contact.js`).
- **Location & Directions**: Address, phone numbers, and map guidance to the main sanctuary in Old Tafo-Abono.

---

## Directory Structure

```text
TWAG/
├── about.html             # About Us & Service Times page
├── contact.html           # Contact Us & Location page
├── departments.html       # Church Departments & Leadership Executives page
├── devotions.html         # Daily Devotions & Audio Sermons page
├── events.html            # Events & Live Sunday Stream page
├── give.html              # Online Giving & Mobile Money page
├── index.html             # Main Homepage
├── package.json           # Project metadata
├── tailwind.config.js     # Root Tailwind CSS configuration
├── vercel.json            # Vercel static deployment configuration
│
├── js/                    # Modular JavaScript files
│   ├── about.js           # Service times accordion logic
│   ├── board.js           # Church board carousel controls
│   ├── contact.js         # Contact form & toast notification handling
│   ├── departments.js     # Department tabs & executive modal dataset
│   ├── devotions.js       # Spotify player embed & sharing modal
│   ├── events.js          # Live Sunday countdown & YouTube player
│   ├── gallery.js        # Photo gallery lightbox & see-more handler
│   ├── give.js           # Giving calculator & payment modal switcher
│   ├── hero.js            # Hero slideshow timer & progress bar
│   ├── navbar.js          # Sticky scroll navbar & mobile drawer menu
│   └── tailwind.config.js # Client-side Tailwind CDN design tokens
│
└── images/                # Categorized media assets
    ├── events/            # Service & event photos
    ├── hero/              # Hero background slides & landing video
    ├── leadership/        # Pastors, deacons & executive portraits
    ├── logos/             # Church logos & payment provider icons
    └── ministries/        # Department group & fellowship photos
```

---

## Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+ Modules)
- **Styling**: Tailwind CSS (v3 via CDN + custom configuration)
- **Typography**: Google Fonts (*Cinzel*, *Sora*, *Inter*)
- **Icons**: FontAwesome v6 (Free)
- **Deployment**: Vercel Static Hosting

---

## Running Locally

Because this project is a pure static web application, no complex installation or node server build steps are required.

### Method 1: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click [`index.html`](file:///c:/Users/Atabisa%20Williams/Desktop/TWAG/index.html) and select **Open with Live Server**.

### Method 2: Python HTTP Server
Open your terminal inside the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## Deployment

This repository is pre-configured for instant static deployment on **Vercel** with clean URLs (`cleanUrls: true` in `vercel.json`).

```json
{
  "version": 2,
  "outputDirectory": ".",
  "cleanUrls": true
}
```

To deploy via Vercel CLI:
```bash
npm i -g vercel
vercel
```

---

## License & Credits

© **True Worshippers Assemblies of God Church**, Old Tafo-Abono, Ghana. All rights reserved.
