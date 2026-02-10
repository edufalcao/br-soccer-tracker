# Visual Overhaul: Editorial/Magazine Aesthetic

## Context

The app's UI was assessed against the frontend-design skill guidelines and scored poorly on typography (2/10), spatial composition (2/10), memorable identity (2/10), backgrounds (3/10), and motion (4/10). The functional UX is strong (8/10) but the visual design uses Inter (explicitly banned), generic slate-gray cards, conventional grid layouts, no page-load animations, and no signature visual element. This plan brings every component in line with the skill's standards using an **Editorial/Magazine** aesthetic.

## Design Direction

**Tone**: Clean, refined, high-contrast editorial — ESPN, The Athletic, L'Équipe
**Fonts**: **DM Serif Display** (headings) + **Plus Jakarta Sans** (body) via Google Fonts CDN
**Signature Element**: "Pitch lines" motif — subtle field markings (center circle, sidelines, corner arcs) as decorative CSS pseudo-elements throughout the app
**Color Shift**: Replace all `slate-*` usage with `pitch-*` equivalents; tint the page background green (`#f4f7f2`); use pitch-green shadows on cards

---

## Phase 1: Foundation (Config + CSS Design System)

### `tailwind.config.ts`

- Replace `fontFamily.sans`: `'"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'`
- Add `fontFamily.display`: `'"DM Serif Display"', 'Georgia', 'serif'`
- Change `surface.muted`: `#f8fafc` → `#f4f7f2` (green-tinted off-white)
- Add custom `boxShadow`: `card` (pitch-green tint), `card-hover`, `editorial` (dramatic deep green)

### `nuxt.config.ts`

- Add Google Fonts `<link>` tags to `app.head.link` (preconnect + stylesheet for DM Serif Display + Plus Jakarta Sans with `display=swap`)
- Add `app.pageTransition: { name: 'page', mode: 'out-in' }`

### `app/assets/css/main.css` — Major expansion (~200 lines)

New utilities in `@layer utilities {}`:

- **Gradients**: `bg-gradient-editorial` (richer 3-stop dark green), `bg-gradient-card` (white → pitch-50)
- **Texture**: `texture-noise` (SVG data-URI noise overlay at 3% opacity via `::after`)
- **Pitch motifs**: `pitch-lines` (center circle + center line via pseudo-elements), `pitch-corner` (corner arc via `::before`), `pitch-sideline` (fading horizontal rule via `::after`)
- **Typography helpers**: `section-header` (`font-display text-2xl tracking-tight`), `section-label` (`text-xs font-bold uppercase tracking-[0.15em] text-pitch-600`)
- **Entrance animations**: `animate-fade-in`, `animate-slide-up`, `animate-slide-in-left` with corresponding `@keyframes`
- **Stagger delays**: `stagger-1` through `stagger-8` (0.05s increments)
- **Scroll reveal**: `.reveal` (opacity 0, translateY 20px) + `.reveal.visible` (transitions to visible)
- **Page transitions**: `.page-enter-active/.page-leave-active` (opacity + translateY)
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disabling all custom animations

### `app/composables/useScrollReveal.ts` — NEW FILE

- Lightweight composable using `IntersectionObserver` to add `visible` class to `.reveal` elements on scroll
- Client-only (runs inside `onMounted`), auto-disconnects on `onUnmounted`

---

## Phase 2: Layout Chrome

### `app/components/layout/AppHeader.vue`

- Header element: `bg-gradient-editorial texture-noise pitch-lines shadow-editorial`
- Brand name: `font-display text-xl tracking-tight`
- Nav links: `text-xs font-bold uppercase tracking-[0.12em]`; active gets thicker 3px accent bar
- Add 2px `bg-gradient-accent` strip below header

### `app/components/layout/AppFooter.vue`

- Background: `bg-gradient-editorial texture-noise pitch-lines`
- Brand: `font-display text-lg`
- Section labels: `section-label` class
- Add `pitch-corner` decoration to brand column

### `app/components/layout/MobileBottomNav.vue`

- Background: `bg-pitch-950` (darker)
- Replace `border-t` with 2px `bg-gradient-accent` div above nav
- Active item: add small accent dot indicator below icon
- Labels: `font-semibold tracking-wide`

### `app/layouts/default.vue`

- No template changes needed (surface-muted color updated via tailwind config; page transition via nuxt config)

---

## Phase 3: Base Components

### `app/components/base/Card.vue`

- Background: `bg-gradient-card shadow-card ring-1 ring-pitch-100/50`
- Hover: `hover:shadow-card-hover hover:ring-pitch-200/50 hover:-translate-y-1` (slightly more lift)
- New optional `editorial` prop → applies `pitch-corner` decoration

### `app/components/base/Button.vue`

- Primary: `bg-pitch-800 hover:bg-pitch-900 shadow-sm shadow-pitch-900/20`
- Secondary: `text-pitch-900 ring-1 ring-pitch-200 hover:bg-pitch-50`
- Ghost: `text-pitch-700 hover:bg-pitch-50`
- All: `font-semibold tracking-wide`

### `app/components/base/Tabs.vue`

- Container: `bg-pitch-50/50 ring-1 ring-pitch-100`
- Active: `bg-white text-pitch-900 shadow-card ring-1 ring-pitch-100/50`
- Inactive: `text-pitch-600 hover:text-pitch-800`
- Font: `font-semibold text-xs uppercase tracking-wide`

### `app/components/base/EmptyState.vue`

- Background: `bg-pitch-50/50` with `pitch-sideline`
- Text: `text-pitch-600`
- Add `animate-fade-in`

### `app/components/base/ErrorState.vue`

- Add `animate-fade-in`
- Replace `text-slate-*` with pitch equivalents

---

## Phase 4: Domain Components

### `app/components/match/Card.vue`

- Score: `font-display` for editorial weight; live scores `text-2xl`
- Favorites: `ring-2 ring-accent/30 bg-accent/5` (full-card highlight replaces border-l-4)
- Team names: `font-semibold`; venue: `text-pitch-400`

### `app/components/match/List.vue`

- Date headers: `section-label` style
- Add stagger animation to match cards (`:class="'animate-slide-up stagger-' + (index % 8 + 1)"`)
- Skeletons: `bg-pitch-50/80 rounded-xl`

### `app/components/match/LiveTicker.vue`

- Live chips: `bg-gradient-to-r from-red-50 to-white ring-1 ring-red-200/60 shadow-sm`
- Score: `font-display font-bold`
- Team names: `font-semibold text-pitch-800`
- Add stagger animation (`animate-slide-in-left`)

### `app/components/match/StatusBadge.vue`

- Font: `font-bold uppercase tracking-wider text-[10px]`
- Live: `bg-red-600 text-white` (inverted for impact)
- Finished: `bg-pitch-100 text-pitch-700`
- Shape: `rounded-md` (crisper than rounded-full)

### `app/components/news/Card.vue`

- Title: `font-display text-base` (serif headline)
- Description/meta: pitch-tinted
- Image gradient: more dramatic `from-black/50`
- Add `pitch-corner` via `editorial` prop on BaseCard

### `app/components/news/List.vue`

- **Featured first article**: first item gets `lg:col-span-2 lg:row-span-2` for asymmetric grid
- Add stagger animation to all cards
- Editorial pagination styling

### `app/components/news/CompetitionBadge.vue`

- Shape: `rounded-md` (editorial crispness)
- Font: `font-bold text-[10px] uppercase tracking-wider`
- Serie A: `bg-pitch-100 text-pitch-800`; Copa: `bg-accent/20 text-accent-dark`

### `app/components/standings/Table.vue`

- Header row: `bg-pitch-900 text-pitch-100 font-bold uppercase tracking-wider text-[11px]`
- Points column: `font-display text-lg`
- Position column: `font-display font-bold`
- Zone rows: add subtle background tint (`bg-green-50/30`, `bg-red-50/30`)
- Add stagger animation to rows

### `app/components/standings/FormIndicator.vue`

- Replace circles with rectangles: `h-2 w-3 rounded-sm` (editorial infographic style)

### `app/components/favorite/TeamPicker.vue`

- Search input: pitch-tinted (`ring-pitch-100`, `bg-pitch-50/30`)
- Group headers: `section-label`
- Selected state: `ring-2 ring-accent` + `shadow-sm`
- Add stagger animation to team grid

### `app/components/competition/FilterBar.vue`

- Switch from pill buttons to underline style
- Active: `text-pitch-900 border-b-2 border-accent`
- Inactive: `text-pitch-400 hover:text-pitch-700`
- Font: `font-bold text-xs uppercase tracking-[0.12em]`

### `app/components/team/Badge.vue`

- Fallback initial: `font-display` (serif character)
- Add `ring-1 ring-pitch-100/50` to badge images

---

## Phase 5: Pages

### `app/pages/index.vue` (Flagship)

- **Hero**: `bg-gradient-editorial texture-noise pitch-lines`; taller (`py-12 sm:py-16 lg:py-20`); competition names in `font-display text-4xl sm:text-5xl lg:text-6xl`; faded large season year in background at ultra-low opacity for depth
- **Section headers**: Replace `border-l-4` pattern with `section-label` + `section-header` + accent underline div
- **Scroll reveal**: Call `useScrollReveal()` in setup; add `reveal` class to below-fold sections
- News grid: enable featured layout (first article large)
- Standings card: add `editorial` prop

### `app/pages/matches.vue`

- Title: `section-label` + `section-header`
- Add `animate-fade-in` to content

### `app/pages/standings.vue`

- Title: `section-label` + `section-header`
- Wrap table in BaseCard with `editorial` prop
- Add `pitch-sideline` under tabs

### `app/pages/news/index.vue`

- Title: `section-label` + `section-header`
- Enable featured layout in NewsList

### `app/pages/news/[id].vue`

- Article title: `font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight`
- Hero image: full-bleed with gradient overlay
- Metadata: `section-label` style
- Content: `text-base leading-relaxed text-pitch-800`
- Tagged teams: `bg-pitch-50 ring-1 ring-pitch-100`
- Add `animate-slide-up` to article content

### `app/pages/favorites.vue`

- Title: `section-label` + `section-header`
- Selection count: `text-pitch-600`

### `app/pages/settings.vue`

- Title: `section-header`; card titles: `font-display text-lg`
- Language buttons: pitch-styled
- Cards: `editorial` prop
- Add `animate-slide-up` stagger to cards

### Auth pages (5 files: login, register, confirm, forgot-password, reset-password)

Shared changes:

- Titles: `font-display text-2xl tracking-tight text-pitch-950`
- Form labels: `font-semibold text-pitch-700`
- Inputs: `ring-1 ring-pitch-200 focus:ring-2 focus:ring-pitch-500 rounded-lg`
- Submit buttons: `bg-pitch-800 hover:bg-pitch-900 shadow-sm`
- Links: `text-pitch-700 font-semibold`
- Error banners: add `ring-1 ring-red-200`
- Success banners: `bg-pitch-50 text-pitch-700 ring-1 ring-pitch-200` (pitch-green)
- Add `animate-fade-in` to card
- Add accent line (`bg-gradient-accent h-[2px] w-16 mx-auto`) below title

---

## Phase 6: Polish

- **Consistency sweep**: Replace all remaining `text-slate-*`, `bg-slate-*`, `shadow-slate-*` with pitch equivalents across all files
- **Accessibility**: Verify WCAG AA contrast ratios; ensure `prefers-reduced-motion` disables all animations; confirm focus indicators remain visible
- **Visual QA**: Run dev server, test every page on mobile and desktop, verify stagger timing feels natural, check font loading performance

---

## File Count

- **37 files modified** (3 config/CSS, 4 layout, 5 base components, 12 domain components, 12 pages, + consistency sweep)
- **1 new file** (`app/composables/useScrollReveal.ts`)
- **0 new npm packages** (CSS-only animations, Google Fonts via CDN)

## Verification

1. Run `npm run dev` and visually inspect every page
2. Check font loading: DM Serif Display on headings, Plus Jakarta Sans on body
3. Verify pitch-lines motif visible in header/footer/hero
4. Verify entrance animations on homepage (scroll down to trigger reveal)
5. Test page transitions by navigating between pages
6. Test on mobile viewport (check bottom nav, responsive grids)
7. Verify `prefers-reduced-motion` disables animations (browser dev tools)
8. Run `npm run lint` to catch any formatting issues
9. Run `npx vue-tsc --noEmit` to verify TypeScript (new `editorial` prop on BaseCard)
