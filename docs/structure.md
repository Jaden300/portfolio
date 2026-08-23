# Project Structure

Portfolio site for Jaden Wong - React 19 + Vite 8, deployed on Vercel.
Live at: https://jadenwong.ca (or similar - check vercel.json for domain)

## File tree

```
Portfolio/
  CLAUDE.md               # minimal per-session rules
  docs/                   # project knowledge (reference with @docs/filename.md)
  index.html
  vite.config.js
  vercel.json
  public/
    favicon.svg
    banner.svg
    icons.svg
    profile.jpg
    logos/                # org/company logos used in Experience and Research
    screenshots/          # app screenshots
    work/                 # project images used in Work (projects) page
  src/
    main.jsx              # router, Shell (Navbar + Routes + Footer)
    index.css             # global styles, CSS variables, critter animations
    pages/
      Home.jsx            # landing page - bio chips, stats, experience preview
      About.jsx           # hero, statement + facts, work stack, certifications, passions
      Work.jsx            # projects (MyMurry, Quant-Trading, myojam, ML Series)
      Experience.jsx      # all roles / volunteer / co-op
      Research.jsx        # articles, educational resources
      Contact.jsx         # contact form / links
    components/
      Navbar.jsx          # top nav
      Footer.jsx          # site footer
      Reveal.jsx          # scroll-reveal animation wrapper
      ScrollToTop.jsx     # resets scroll on route change
      Critters.jsx        # 14 CSS animal figurines (Bunny, Chick, Bear, Cat, Frog, Panda, Fox, Dog, Sheep, Penguin, Mouse, Hamster, Dino, Owl)
      Icons.jsx           # SVG icon components (GitHubIcon, LinkedInIcon, etc.)
      Charts.jsx          # chart components
      ChessHero.jsx / ChessLazySusan.jsx / ChessShowcase.jsx  # chess-related 3D/display
      HelixScene.jsx / HeroCanvas3D.jsx / ResearchCanvas3D.jsx / RoyalCanvas3D.jsx  # Three.js scenes
      PageBanner.jsx
      ParticleWarp.jsx
      ProjectRotunda.jsx
```

## Pages - what's on each

### Home.jsx
- Hero with animated name, bio chips (tech stack chips as inline spans)
- Stats row, experience preview cards, featured project cards
- Bio chips array: Python, React, Next.js, TypeScript, FastAPI, PostgreSQL, Prisma, Supabase, GPT-4o, scikit-learn, PyQt6, Three.js, Signal Processing, NumPy, Pine Script v6, Puppeteer

### About.jsx
- Hero: `padding: "140px 0 80px"` (NOT height: 100vh)
- Statement + facts grid (2-col)
- Work Stack: SKILLS array (4 categories) + CERTS array
- Passions: Gaming, Chess (Leonardis Variation), Downtown walks
- Critters: Bear (top left), Owl (top right), Penguin (lower left) in Work Stack section

### Work.jsx (Projects)
- 5 projects: MyMurry, Quant-Trading, myojam, Pip, Machine Learning Series
- Each has image stack, bullets, metrics, tags
- Critters: Cat (top left), Frog (right), Panda (lower left), Dog (lower right)
- Note: Sheep critter was removed - its .puff divs rendered as white circles (bug)

### Experience.jsx
- Hero: `padding: "140px 0 80px"` (NOT height: 100vh)
- 7 roles: One Community, The Volunteer Well, Elevation Athletics, Beading Divas, Youth Improvement Services, LGBT Voice Tanzania, Asenion
- Critters: Fox, Bunny, Bear, Owl, Penguin spread through roles section

### Research.jsx
- Hero: `padding: "140px 0 80px"` (NOT height: 100vh)
- Featured articles (3) + Educational resources (3)
- Critters: Chick, Mouse, Hamster, Dino spread through articles section

### Contact.jsx
- Contact links / form

## Design conventions

- CSS variables: `var(--bg)`, `var(--bg-2)`, `var(--text)`, `var(--text-secondary)`, `var(--text-tertiary)`, `var(--accent)`, `var(--gold)`, `var(--border)`, `var(--border-dark)`, `var(--serif)`, `var(--font)`
- All styles are inline (no CSS modules)
- Hero spacing pattern: `padding: "140px 0 80px"` on hero section (NOT `height: 100vh`) - About, Experience, Research all use this
- Critters are `position: absolute` inside a `position: relative, overflow: visible` section, with `z-index: 0`
- `<Reveal>` wraps animated content; `<Reveal grand>` for larger entrance animations
- Separators: use ` - ` (not em/en dashes), use `•` (not `·`) for structural separators

## GitHub profile

Jaden300 on GitHub. The portfolio links to https://github.com/Jaden300.
Repo: https://github.com/Jaden300/Portfolio (may redirect from /portfolio lowercase)
