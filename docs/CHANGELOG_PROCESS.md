# 🔄 Changelog & Release Process

We rely on **semantic-release** to fully automate versioning and changelog generation.

## How it works
1. Each merged PR is squashed into `main` with a Conventional Commit message (e.g. `feat(billing): add invoice PDF`).
2. GitHub Actions run `semantic-release` after tests pass.
3. The plugin analyses commit history since last tag, determines the next semantic version (major / minor / patch) and:
   * Creates/updates `CHANGELOG.md` with human-readable entries.
   * Publishes a GitHub Release with notes.
   * Updates `package.json` version (without publishing to npm).
4. If a `vX.Y.Z` tag exists, CI/CD picks it up and deploys to production.

## Manual steps
Occasionally you may want to trigger a release manually (e.g. security fix):
```bash
git commit --allow-empty -m "chore(release): 1.2.3"
```

This empty commit will make semantic-release cut a new version. 