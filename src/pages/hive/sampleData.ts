// Illustrative sample data for the Hive guided preview. None of this comes from
// a running Hive. Stage labels and ACMM levels are taken from the Hive docs
// (src/docs/labels-and-control-signals/stage-labels.md and what-is-hive.md);
// the task, agents and audit lines are invented for the walkthrough.

export interface Stage {
  label: string
  appliesTo: 'issue' | 'PR'
  actor: 'agent' | 'human' | 'hive'
  summary: string
  audit: string
}

export const SAMPLE_STAGES: Stage[] = [
  {
    label: 'stage/010-actionable',
    appliesTo: 'issue',
    actor: 'hive',
    summary:
      'The issue is triaged and eligible. The governor filters the queue and only offers work you have allowed.',
    audit: 'Governor listed the issue as eligible for the scanner lane.',
  },
  {
    label: 'stage/020-claimed',
    appliesTo: 'issue',
    actor: 'agent',
    summary:
      'A short-lived agent claims the issue so no other agent duplicates the work.',
    audit: 'scanner claimed the issue with hive-open-issue claim.',
  },
  {
    label: 'stage/030-pr-in-progress',
    appliesTo: 'issue',
    actor: 'agent',
    summary:
      'The agent works in a branch and signs its commits. At the holdgated level it can open PRs but never merge.',
    audit: 'scanner pushed a branch with DCO-signed commits.',
  },
  {
    label: 'stage/040-covered-by-pr',
    appliesTo: 'issue',
    actor: 'hive',
    summary: 'An open PR now covers the issue. The issue waits on the PR.',
    audit: 'PR opened through the hive relay and labelled hold.',
  },
  {
    label: 'stage/050-review-pending',
    appliesTo: 'PR',
    actor: 'hive',
    summary:
      'The review swarm is dispatched. Checks run. The PR carries the hold label.',
    audit: 'Review requested for the current head commit.',
  },
  {
    label: 'stage/060-reviewed',
    appliesTo: 'PR',
    actor: 'hive',
    summary:
      'The review verdict is an approval, but a gate such as CI is still pending.',
    audit: 'Reviewer verdict recorded: approve. CI still running.',
  },
  {
    label: 'stage/090-ready-for-human-merge',
    appliesTo: 'PR',
    actor: 'human',
    summary:
      'Checks are green and the review approves, but trust blocks an automatic merge. A person removes hold and merges.',
    audit: 'Waiting on a maintainer. Agent cannot remove hold or merge.',
  },
]

export interface TrustLevel {
  level: string
  name: string
  summary: string
}

export const TRUST_LEVELS: TrustLevel[] = [
  {
    level: 'L1',
    name: 'Inception',
    summary: 'Interactive advisor. Advisory beads only.',
  },
  {
    level: 'L2',
    name: 'Advisory',
    summary: 'Observe and report findings. No GitHub interaction.',
  },
  {
    level: 'L3',
    name: 'Quality-Gated',
    summary:
      'Quality agent opens issues and PRs gated by hold. Others stay advisory.',
  },
  {
    level: 'L4',
    name: 'Security-Aware',
    summary:
      'All agents file issues. Quality, sec-check and CI open PRs gated by hold.',
  },
  {
    level: 'L5',
    name: 'Semi-Autonomous',
    summary:
      'All agents open PRs gated by hold. Humans batch-review and approve.',
  },
  {
    level: 'L6',
    name: 'Autonomous',
    summary:
      'Agents open PRs and auto-merge when checks pass. Outreach PRs stay held.',
  },
]

export interface SampleLane {
  role: string
  status: 'working' | 'idle' | 'waiting on human'
  doing: string
}

export const SAMPLE_LANES: SampleLane[] = [
  {
    role: 'scanner',
    status: 'working',
    doing: 'Implementing sample issue #12',
  },
  { role: 'ci-maintainer', status: 'idle', doing: 'No eligible work' },
  {
    role: 'reviewer',
    status: 'waiting on human',
    doing: 'Approved sample PR #13, hold in place',
  },
]

export const SAMPLE_REPO = 'example-org/sample-repo'
export const SAMPLE_TASK_TITLE = 'Sample issue #12: Add a catch-all 404 route'
