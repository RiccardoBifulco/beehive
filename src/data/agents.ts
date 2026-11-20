export interface Agent {
  id: string
  label: string
  tier: string
  /** Short responsibility line shown in the About roster table. */
  summary: string
  /** Long copy shown in the About role-details accordion. */
  detail: string
  /** Card copy shown on the Home page. */
  description: string
}

export const AGENTS: Agent[] = [
  {
    id: 'scanner',
    label: 'Scanner',
    tier: 'L5',
    summary: 'First-responder, triager, quick-fixer.',
    detail:
      'The Scanner is the first agent dispatched to any new issue. It triages bugs, applies surgical fixes, and opens hold-gated PRs. When a problem is too deep for a quick fix it files a structured finding and escalates to the Architect.',
    description:
      'First-responder agent that triages issues, applies quick fixes, and escalates complex work to specialist agents.',
  },
  {
    id: 'architect',
    label: 'Architect',
    tier: 'L7',
    summary: 'Large refactors, design work, RFCs.',
    detail:
      'The Architect handles work that is too large or structurally complex for the Scanner. It authors Request for Comment documents, leads multi-PR refactors, and owns the technical direction of the codebase.',
    description:
      'Handles large refactors, designs system-level changes, and authors RFCs for multi-step work.',
  },
  {
    id: 'ci-maintainer',
    label: 'CI Maintainer',
    tier: 'L5',
    summary: 'Monitor pipelines, update workflows, fix tests.',
    detail:
      'The CI Maintainer owns the .github/workflows directory. It watches for failing runs, keeps action versions current, and ensures lint, format, test and build gates always pass on the default branch.',
    description:
      'Monitors pipelines, updates workflow files, and keeps test suites green across all branches.',
  },
  {
    id: 'supervisor',
    label: 'Supervisor',
    tier: 'L4',
    summary: 'Observation-and-report, status tracking.',
    detail:
      'The Supervisor has read access to all hive activity. It synthesises status reports, surfaces blocked work items, and keeps maintainers informed without making code changes itself.',
    description:
      'Observes agent activity, tracks hive-wide status, and reports progress to maintainers.',
  },
  {
    id: 'outreach',
    label: 'Outreach',
    tier: 'L4',
    summary: 'Community engagement, documentation.',
    detail:
      'The Outreach agent writes and maintains external-facing documentation, responds to community questions, and authors release notes. It does not push code but its drafts are reviewed and merged by other agents.',
    description:
      'Handles community engagement, writes external-facing documentation, and manages release notes.',
  },
  {
    id: 'sec-check',
    label: 'Sec-Check',
    tier: 'L5',
    summary: 'Vulnerability analysis, dependency audits.',
    detail:
      'The Sec-Check agent runs automated security scans, audits third-party dependencies for known CVEs, and files issues for any findings. It can open hold-gated PRs to bump vulnerable packages.',
    description:
      'Runs vulnerability scans, audits dependencies, and flags security issues before they reach production.',
  },
]
