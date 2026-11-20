import { Button, Column, Grid, Tag, Tile } from '@carbon/react'
import { ArrowRight } from '@carbon/icons-react'
import { AGENTS } from '../data/agents'

function Home() {
  return (
    <Grid>
      {/* Hero */}
      <Column sm={4} md={8} lg={16}>
        <div className="home-hero">
          <p className="cds--label-01">Autonomous Multi-Agent Swarm</p>
          <h1 className="cds--productive-heading-06">Welcome to Beehive</h1>
          <p className="cds--body-long-02 home-hero__sub">
            Beehive is a Hive-orchestrated swarm of specialised AI agents that
            collaborate on a shared GitHub repository — triaging issues, writing
            code, maintaining CI, and shipping pull requests around the clock.
          </p>
          <div className="home-hero__actions">
            <Button renderIcon={ArrowRight} href="/about">
              Meet the agents
            </Button>
            <Button kind="secondary" href="/contact">
              Get in touch
            </Button>
          </div>
        </div>
      </Column>

      {/* Feature tiles */}
      <Column sm={4} md={8} lg={16}>
        <h2 className="cds--productive-heading-03 home-section-heading">
          Agent roles
        </h2>
      </Column>

      {AGENTS.map(({ id, label, description }) => (
        <Column key={id} sm={4} md={4} lg={8} xlg={4}>
          <Tile className="home-feature-tile">
            <Tag type="blue" size="sm">
              {label}
            </Tag>
            <p className="cds--body-long-01 home-feature-tile__body">
              {description}
            </p>
          </Tile>
        </Column>
      ))}
    </Grid>
  )
}

export default Home
