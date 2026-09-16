# Agent rules

## Plan and architecture documents

Any planning, architecture, or design document you write as a file (e.g. `ARCHITECTURE.md`, plan write-ups, design notes) must be placed in `.plans/` at the repository root, not committed to git, and not scattered into `backend/`, `frontend/`, or other project folders.

- Path: `C:\Users\govno\Desktop\prodject\persona\.plans\`
- This folder is git-ignored (see root `.gitignore`), so files here stay local and easy to find but never end up in the repo history or PRs.
- If such a file already exists elsewhere in the repo, move it into `.plans/` rather than leaving a copy behind.
