# CLAUDE.md

Quick-start for every session. Keep this minimal - full details live in docs/.

## Must-know rules

- NEVER add `Co-Authored-By` or any Claude credit to git commits
- NEVER use em dashes (—) anywhere - use ` - ` instead
- NEVER use en dashes (–) in content - use ` - ` instead
- Middle dots (·) as structural separators should be • - dots inside skill chip labels (e.g. `PCA · t-SNE`) are fine

## Stack

React 19 + Vite 8, React Router DOM 7, inline styles throughout (no CSS modules).
`npm run dev` to start. Deploys to Vercel automatically on push to main.

## Docs

- [@docs/structure.md](docs/structure.md) - file structure, pages, components
- [@docs/workflow.md](docs/workflow.md) - Claude workflow conventions
