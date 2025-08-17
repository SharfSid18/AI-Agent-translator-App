# Base44 Translator Project

AI-powered Arabic → Urdu translation UI exported from Base44 (manual export).

## What this contains
- Pages: `Translator.jsx`, `History.jsx`
- Components: `TranslationArea.jsx`, `QuickPhrases.jsx`, `TranslationCard.jsx`
- Entities stub: in-browser localStorage for saves
- Minimal UI stubs for Button/Input/Card/Textarea (so imports resolve)
- Placeholder `Layout.js`

> Note: This is a **code export**. Hook your real InvokeLLM function and UI kit as needed.

## How to view quickly
This repo is framework-agnostic snippets. To run in React:
1. `npm create vite@latest my-app -- --template react`
2. Copy `Pages`, `Components`, `Entities`, `utils.js` into `src/`.
3. Install icons: `npm i lucide-react`
4. Replace imports starting with `@/` to `./` or configure aliases.
5. Start: `npm run dev`

## License
Your code.
