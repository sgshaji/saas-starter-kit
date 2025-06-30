# 🤝 Contributing Guidelines

Thanks for taking the time to contribute! 🧑‍💻

## Workflow
1. **Fork & clone** – keep your fork in sync with `main`.
2. **Branch naming** – use `feat/<area>-<short-desc>` or `fix/<bug>`.
3. **Commits** – follow [Conventional Commits](https://www.conventionalcommits.org) (Commitlint will enforce).
4. **PRs** – open against `main` with a clear title & description; add `Fixes #123` if applicable.

## Checklist before opening a PR
- [ ] `pnpm lint` passes with no errors.
- [ ] `pnpm test` & `pnpm test:e2e` green.
- [ ] Updated/added docs if behaviour changes.

### Running the full test matrix
```bash
pnpm test && pnpm test:e2e
```

### Adding a dependency
1. Explain why the package is needed.
2. Add exact semver & regenerate lockfile.
3. If it ships types, remove `@types/*` equivalent.

## Coding conventions
- Prefer **functional, pure** utils; avoid side-effects in helpers.
- Use `type` aliases over `interface` (TS rule enforced).
- Co-locate tests (`*.test.ts(x)`) next to implementation.

## Docs & Changelog
This repo uses **semantic-release**; each merged PR auto-publishes a GitHub Release and updates `CHANGELOG.md`.

Happy hacking! 🎉
