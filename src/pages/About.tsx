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
import { AGENTS } from '../data/agents'

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
