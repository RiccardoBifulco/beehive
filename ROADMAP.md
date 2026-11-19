# Roadmap

Status: draft proposed by the strategist agent. A maintainer should edit the
direction below; the repository does not yet state what the site is for.

## Now: foundations (landed)

- Vite + React 19 + TypeScript + Carbon scaffold, routing, Carbon UI Shell.
- Home, About and Contact routes.
- Vitest with an 80% coverage threshold; TypeScript strict mode.
- README and AGENTS.md setup docs.

## Next: close the gaps

| Item                                             | Tracking | Needs                                  |
| ------------------------------------------------ | -------- | -------------------------------------- |
| CI workflow gating lint, format, test and build  | #11, #16 | Human or merge-tier agent (workflows)  |
| Catch-all 404 route                              | #23      | Contributor                            |
| LICENSE and a stable default branch              | #25      | Maintainer decision                    |
| Real content for Home (purpose, calls to action) | -        | Maintainer to state the site's purpose |
| Close stale scaffold issue #4                    | #4       | Maintainer                             |

#11 and #16 describe the same missing workflow; keep one and close the other.

## Later: candidates, not commitments

- Accessibility pass (keyboard navigation, landmarks, contrast) using Carbon defaults.
- Deployment target for the static build (for example GitHub Pages) and a preview per PR.
- Carbon theme selection and light/dark support.
- CONTRIBUTING guide once there are outside contributors.

## Out of scope for now

- Server-side rendering or a backend.
