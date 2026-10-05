# Agent rules

## Plan and architecture documents

Any planning, architecture, or design document you write as a file (e.g. `ARCHITECTURE.md`, plan write-ups, design notes) must be placed in `.plans/` at the repository root, not committed to git, and not scattered into `backend/`, `frontend/`, or other project folders.

- Path: `C:\Users\govno\Desktop\prodject\persona\.plans\`
- This folder is git-ignored (see root `.gitignore`), so files here stay local and easy to find but never end up in the repo history or PRs.
- If such a file already exists elsewhere in the repo, move it into `.plans/` rather than leaving a copy behind.

## Don't break the running dev server

Never run anything that touches `frontend/.next/` — deleting it, running `npm run build`, running `npm run dev`, anything — while the user's own `next dev` (Turbopack) process might be running. `next dev` and `next build` both read/write `.next` continuously and are NOT safe to run concurrently against the same `.next` directory: they will corrupt each other's Turbopack cache/manifests (Rust panics like `Failed to lookup task ids... Unable to open static sorted file`, or dev crashing with `ENOENT ... build-manifest.json`, `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`, `Compaction failed: Another write batch or compaction is already active`). This has happened twice — do not repeat it.

- **Always ask the user first** whether a dev server is currently running before running `npm run build`, `npm run dev`, or deleting `.next` in `frontend/`. Do not just check `tasklist` — a live node process doesn't tell you which of several is the dev server, and the absence of a process doesn't prove none is about to start. Ask.
- If the user has a dev server running, don't run `npm run build` either — it is not a safe "read-only" alternative, it writes to the same `.next` and will corrupt the dev server's cache just the same. Wait until they stop it, or use `tsc --noEmit` / `eslint` for verification instead, which don't touch `.next`.
- If `.next` deletion is truly necessary, confirm the dev server is stopped first (ask, don't assume), then delete, then let the user restart their own dev server — don't start one yourself.
