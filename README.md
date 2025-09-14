```markdown
# AI Router Frontend (React + Vite + TypeScript)

Minimal UI to send questions or actions to the backend `/ai/route`.

---

## Key Configuration

**`src/components/HelpBar.tsx`**
- Input box + Ask button
- Calls backend at `http://localhost:8080/ai/route`
- Displays either:
  - `answer` (string)
  - `action` + `args` (JSON)

**`package.json`**
- Scripts: `dev`, `build`, `preview`, `lint`, `test`
- Dependencies: React 19, Vite, Vitest, ESLint

**`vite.config.ts`**
- Vite config for React + TypeScript

---

## Important Files

- **`src/components/HelpBar.tsx`** — main UI component.
- **`src/App.tsx`** — renders demo title and HelpBar.
- **`src/setupTests.ts`** — Vitest + RTL setup.
- **`.github/workflows/ci-ui.yml`** — CI: lint, test, build, upload dist.

---

## Running Locally

```bash
npm ci
npm run dev
Open UI at http://localhost:5173

Build
bash
Copy code
npm run build
npm run preview
Outputs production build in dist/.