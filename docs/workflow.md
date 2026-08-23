# Claude Workflow

How to work efficiently with Claude on this project.

## Session pattern

1. Start a new task - Claude reads CLAUDE.md automatically
2. Reference docs with `@docs/structure.md` when Claude needs project context
3. Make changes, test with `npm run dev` at http://localhost:5173
4. Commit + push when happy
5. `/clear` to free context before the next task

Use `/compact` only when you genuinely need to carry context forward (e.g. mid-refactor).

## Task tracking

Use `[ ]` checkboxes in a markdown file (e.g. `docs/tasks.md`) for anything multi-step.
No memory bank, no complex systems.

## Commits

- Never add `Co-Authored-By` or any Claude credit
- Never use em dashes (—) or en dashes (–) in commit messages - use ` - `
- Keep messages short and descriptive

## Common tasks + what to tell Claude

**Add/move a critter:**
> "Add a Fox to the left side of the Work Stack section on About"
Reference: @docs/structure.md - critters section

**Fix hero spacing:**
The correct pattern is `padding: "140px 0 80px"` on the hero section.
NOT `height: "100vh"` - that causes dead space below the centered content.

**Update work stack / bio chips:**
- Home.jsx: bio chips array (inline spans)
- About.jsx: SKILLS array (4 categories) + CERTS array

**Add a new project:**
- Work.jsx: add to PROJECTS array
- Add images to public/work/
- Add logo to public/logos/ if needed

**Add a new experience role:**
- Experience.jsx: add to ROLES array
- Add logo to public/logos/

## Text rules

| Wrong | Right |
|-------|-------|
| em dash — | ` - ` |
| en dash – | ` - ` |
| middle dot · (structural) | `•` |
| middle dot · (inside chip label like `PCA · t-SNE`) | leave as is |
