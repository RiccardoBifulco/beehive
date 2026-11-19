import {
  Accordion,
  AccordionItem,
  Column,
  Grid,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
} from '@carbon/react'

const AGENTS = [
  {
    id: 'scanner',
    label: 'Scanner',
    tier: 'L5',
    summary: 'First-responder, triager, quick-fixer.',
    detail:
      'The Scanner is the first agent dispatched to any new issue. It triages bugs, applies surgical fixes, and opens hold-gated PRs. When a problem is too deep for a quick fix it files a structured finding and escalates to the Architect.',
  },
  {
    id: 'ci-maintainer',
    label: 'CI Maintainer',
    tier: 'L5',
    summary: 'Monitor pipelines, update workflows, fix tests.',
    detail:
      'The CI Maintainer owns the .github/workflows directory. It watches for failing runs, keeps action versions current, and ensures lint, format, test and build gates always pass on the default branch.',
  },
  {
    id: 'architect',
    label: 'Architect',
    tier: 'L7',
    summary: 'Large refactors, design work, RFCs.',
    detail:
      'The Architect handles work that is too large or structurally complex for the Scanner. It authors Request for Comment documents, leads multi-PR refactors, and owns the technical direction of the codebase.',
  },
  {
    id: 'supervisor',
    label: 'Supervisor',
    tier: 'L4',
    summary: 'Observation-and-report, status tracking.',
    detail:
      'The Supervisor has read access to all hive activity. It synthesises status reports, surfaces blocked work items, and keeps maintainers informed without making code changes itself.',
  },
  {
    id: 'outreach',
    label: 'Outreach',
    tier: 'L4',
    summary: 'Community engagement, documentation.',
    detail:
      'The Outreach agent writes and maintains external-facing documentation, responds to community questions, and authors release notes. It does not push code but its drafts are reviewed and merged by other agents.',
  },
  {
    id: 'sec-check',
    label: 'Sec-Check',
    tier: 'L5',
    summary: 'Vulnerability analysis, dependency audits.',
    detail:
      'The Sec-Check agent runs automated security scans, audits third-party dependencies for known CVEs, and files issues for any findings. It can open hold-gated PRs to bump vulnerable packages.',
  },
]

function About() {
  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <h1 className="cds--productive-heading-05">About Beehive</h1>
        <p className="cds--body-long-02 about-intro">
          Beehive is a multi-agent AI swarm built on the Hive orchestration
          platform. Each agent has a defined role, tier, and set of
          authorisations — they collaborate through GitHub issues and hold-gated
          pull requests, with every write requiring a human to lift the hold
          label before code ships.
        </p>
      </Column>

      {/* Summary table */}
      <Column sm={4} md={8} lg={16}>
        <h2 className="cds--productive-heading-03 about-section-heading">
          Agent roster
        </h2>
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Agent</StructuredListCell>
              <StructuredListCell head>Tier</StructuredListCell>
              <StructuredListCell head>Responsibility</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {AGENTS.map(({ id, label, tier, summary }) => (
              <StructuredListRow key={id}>
                <StructuredListCell noWrap>{label}</StructuredListCell>
                <StructuredListCell noWrap>{tier}</StructuredListCell>
                <StructuredListCell>{summary}</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </Column>

      {/* Detail accordion */}
      <Column sm={4} md={8} lg={16}>
        <h2 className="cds--productive-heading-03 about-section-heading">
          Role details
        </h2>
        <Accordion>
          {AGENTS.map(({ id, label, detail }) => (
            <AccordionItem key={id} title={label}>
              <p className="cds--body-long-01">{detail}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </Column>
    </Grid>
  )
}

export default About
