# Roadmap

Status: draft proposed by the strategist agent. A maintainer should edit the
direction below; the repository does not yet state what the site is for.

## Now: foundations (landed)

- Vite + React 19 + TypeScript + Carbon scaffold, routing, Carbon UI Shell.
- Home, About and Contact routes, plus a catch-all 404 page.
- Home states what Beehive is (hero copy and agent role tiles).
- Vitest with an 80% coverage threshold; TypeScript strict mode.
- README and AGENTS.md setup docs.

## Next: close the gaps

| Item                                            | Tracking | Needs                                 |
| ----------------------------------------------- | -------- | ------------------------------------- |
| CI workflow gating lint, format, test and build | #11, #16 | Human or merge-tier agent (workflows) |
| LICENSE and a stable default branch             | #25      | Maintainer decision                   |
| Close stale scaffold issue #4                   | #4       | Maintainer                            |

#11 and #16 describe the same missing workflow; keep one and close the other.

## Later: candidates, not commitments

- Accessibility pass (keyboard navigation, landmarks, contrast) using Carbon defaults.
- Deployment target for the static build (for example GitHub Pages) and a preview per PR.
- Carbon theme selection and light/dark support.
- CONTRIBUTING guide once there are outside contributors.

## Out of scope for now

- Server-side rendering or a backend.
