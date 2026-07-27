# True Worshippers AG — Website Redesign

A fullstack rebuild of the True Worshippers AG (Assemblies of God, Old Tafo-Abono) church website, evolving it from a static site into a dynamic, admin-managed web application.

**Live reference (current site):** trueworshippersag.org

---

## 1. Project Goals

- Rebuild the public site with a consistent, polished design system
- Replace hardcoded content (events, sermons, departments, devotions) with database-driven content
- Add an admin dashboard so church staff can manage content without touching code
- Keep the stack simple, dependency-light, and maintainable long-term by non-specialist volunteers/staff

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS |
| Interactivity | Vanilla JavaScript (modular) |
| Animation | GSAP (+ ScrollTrigger) |
| Icons | Font Awesome |
| Font | Sora (primary), Inter as fallback body option |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| File uploads | Multer (local storage at launch; Cloudinary as growth option) |
| Auth | Session-based (`express-session` + Postgres session store) or JWT |
| Validation | `express-validator` or `zod` |

**Why this stack:** No frontend framework needed — the site is content-driven, not app-driven. Vanilla JS + GSAP keeps things fast and framework-agnostic. Server-rendered admin pages (EJS or plain Express views) avoid the overhead of a second SPA codebase.

---

## 3. Design System

### Color Palette

Pulled from the current Figma export, formalized as design tokens.

| Token | Hex | Usage |
|---|---|---|
| `--navy-primary` | `#01011E` | Header, footer, hero backgrounds |
| `--navy-secondary` | `#303181` | Secondary navy surfaces, accents |
| `--gold-primary` | `#FACC15` | Primary CTAs, active states |
| `--gold-secondary` | `#FFDB58` | Secondary accents, hover states |
| `--cream` | `#F7F6E4` | Page background |
| `--white` | `#FEFEFE` | Card surfaces |
| `--text-muted` | `#475467` | Body copy, secondary text |
| `--border-subtle` | `#D0D5DD` / `#CECECE` | Card borders, dividers |

> Recommendation: define these as CSS custom properties **and** extend them into `tailwind.config.js` under `theme.colors` (e.g. `navy`, `gold`, `cream`) so utility classes stay semantic (`bg-navy`, `text-gold`) instead of raw hex.

### Typography

- **Font:** Sora, loaded via Google Fonts or self-hosted
- **Headings:** Sora 600/700, tight letter-spacing, clear scale jump between H1/H2 (current site's H1/H2 sizes are too close)
- **Body:** Sora 400, or Inter 400 for long-form paragraphs if Sora feels heavy at body size
- **Kicker labels** (e.g. "OUR LEAD PASTOR", "GENEROSITY"): 11–12px, uppercase, wide letter-spacing, gold color — keep this pattern, it works well

### Icons

- Replace all emoji icons (department cards currently use 🎤🎹🎵, 👩👦✨, etc.) with **Font Awesome** (`fa-light` or `fa-regular` weight)
- Use gold accent color for icon fills/strokes to tie into the palette

### Card Patterns

Standardize on **two** card types max (currently three inconsistent styles exist):
1. **Photo cards** — image background + dark gradient overlay, for people/ministries/departments
2. **Flat surface cards** — white/cream background, gold border, for info/data (service times, FAQ, executives)

---

## 4. Known Issues / Fix List

Carried over from UI audit of the current live site:

- [ ] **Devotions page:** Spotify embed title text is clipped ("G Devotion | Isaiah 42:6-7 | 22nd June, 20...") — fix container width/truncation
- [ ] **Devotions page:** only shows the latest episode — needs a full episode list/archive
- [ ] **About page:** photo gallery carousel has ~24 pagination dots wrapping across the page — replace with arrow nav + "1 / 24" counter
- [ ] **Departments page:** 15 department cards with no filtering — add category filters or grouped subheadings (Worship, Youth, Women/Men, Outreach, Operations)
- [ ] **Give page:** "Copy" buttons on MoMo/bank cards are low-contrast — needs clearer affordance + hover state
- [ ] **Departments page:** all emoji icons → Font Awesome
- [ ] **Contact page:** no visible client-side validation feedback on form
- [ ] Card style consolidation across all pages (see Section 3)
- [ ] Heading hierarchy inconsistency across pages

---

## 5. Data Model (PostgreSQL)

### Public content tables

```
events
  id, title, description, event_date, event_time, location, is_featured, image_url, created_at, updated_at

sermons
  id, title, youtube_video_id, description, published_at, is_featured, created_at

devotions
  id, title, spotify_episode_url, scripture_reference, published_at, created_at

departments
  id, name, description, meeting_schedule, image_url, icon_class, display_order, created_at

department_executives
  id, department_id (FK), name, role, photo_url, display_order

leadership
  id, name, role, bio, photo_url, display_order   -- pastor + board carousel

gallery_images
  id, page_context (home | about), image_url, caption, display_order, created_at

giving_accounts
  id, provider_name (e.g. "MTN Mobile Money", "Ecobank"), account_name, account_number, branch, network, is_active

contribution_submissions
  id, amount, category, donor_name, donor_email, status, created_at

contact_submissions
  id, full_name, email, phone, enquiry_type, message, is_read, created_at

site_settings
  key, value   -- office hours, service times, address, phone, email etc.
```

### Admin tables

```
admin_users
  id, email, password_hash, role (admin | editor), last_login, created_at

sessions
  -- managed by connect-pg-simple or similar
```

> All content tables include `created_by` / `updated_at` for basic audit trail once the admin dashboard is live.

---

## 6. Admin Dashboard

### Scope

| Module | Function |
|---|---|
| Events | CRUD upcoming events, toggle featured |
| Sermons / Live | Add YouTube video IDs + metadata |
| Devotions | Add/manage Spotify episodes |
| Departments | Edit ministry cards + manage executives per department |
| Leadership | Edit pastor/board carousel |
| Gallery | Upload/reorder photos (Home + About) |
| Giving | Update MoMo/bank details, view contribution submissions |
| Messages | Inbox for contact form submissions, mark read/replied |
| Settings | Service times, office hours, contact info |

### Structure

```
/admin/login
/admin/dashboard              → overview stats, recent submissions
/admin/events
/admin/sermons
/admin/devotions
/admin/departments
/admin/departments/:id/executives
/admin/gallery
/admin/giving
/admin/messages
/admin/settings
```

### Auth

- Session-based login, `bcrypt` password hashing
- Rate-limited login attempts (`express-rate-limit`)
- Start with single `admin` role; add `editor` role later if needed
- Admin UI is visually distinct from the public site — neutral dashboard aesthetic (sidebar nav, data tables, modals), not the navy/gold/cream branding, to avoid confusing "editing" with "browsing"

---

## 7. Design Direction & UI Inspirations

Redesign is being executed in **Antigravity**, using external UI inspiration references for visual direction (black-and-white / editorial aesthetic in the spirit of Aesop, COS, SSENSE, and Linear.app — per the earlier UI/UX design prompt for the social commerce project, adapted here for a warmer navy/gold church brand instead of pure black-and-white).

All Antigravity generations should be checked against:
- The color tokens in Section 3
- The Sora typography scale
- The card pattern rules (max 2 card types)
- Font Awesome for all iconography (no emoji)

---

## 8. Project Structure (proposed)

```
/public
  /css
  /js
    carousel.js
    countdown.js
    form-validation.js
    animations.js
  /images
/views                  (public-facing pages)
/admin
  /views                (admin dashboard pages)
  /routes
/routes
  events.js
  sermons.js
  devotions.js
  departments.js
  gallery.js
  giving.js
  contact.js
/models
/db
  schema.sql
  migrations/
/middleware
  auth.js
  validation.js
server.js
package.json
tailwind.config.js
```

---

## 9. Getting Started (once scaffolded)

```bash
# install dependencies
npm install

# set up environment variables
cp .env.example .env
# fill in DATABASE_URL, SESSION_SECRET, etc.

# run database migrations
npm run migrate

# start dev server
npm run dev
```

---

## 10. Roadmap

- [ ] Finalize design tokens + Tailwind config
- [ ] Build public-facing pages in Antigravity against inspiration refs
- [ ] Scaffold Express + PostgreSQL backend
- [ ] Build admin dashboard (auth first, then modules in priority order: Events → Sermons → Departments → Gallery → Giving → Messages → Settings)
- [ ] Migrate hardcoded content into database
- [ ] QA pass against Known Issues list (Section 4)
- [ ] Deploy

---

*Maintained by Williams · Designed by TWAG Media*
