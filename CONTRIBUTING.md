# Contributing to TapTap

Thanks for your interest! TapTap is a simple, dependency-free toddler learning toy — contributions are welcome.

## Getting Started

```bash
git clone https://github.com/lukas-grigis/taptap.git
cd taptap
npm install
npm run dev
```

## Adding a New Mode

1. Create `src/modes/<name>.ts` — export a handler matching `(key?: string) => ModeResponse`
2. Add the mode name to the `Mode` union in `src/types.ts`
3. Register it in `src/main.ts` dispatch switch
4. Add a button to the parent menu in `index.html`
5. Add it to the Free Play rotation in `src/modes/freeplay.ts`
6. Update `CLAUDE.md`

See `src/modes/animals.ts` for a simple random-pick example, or `src/modes/bodyparts.ts` for sequential cycling.

## Guidelines

- **Zero runtime dependencies** — keep it that way
- **Language-aware** — all mode content must support EN and DE via `getState().language`
- **`npm run build` must pass** with zero TypeScript errors before opening a PR
- **One mode per PR** — keeps review focused
- **Child-safe** — no external links, no tracking, no ads, no inappropriate content

## Pull Requests

- Branch from `main`, name it `feat/<mode-name>` or `fix/<description>`
- Keep commits clean and descriptive
- PRs are merged as merge commits (not squashed)
