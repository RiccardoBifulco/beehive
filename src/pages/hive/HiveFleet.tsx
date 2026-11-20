import {
  Button,
  InlineLoading,
  InlineNotification,
  ProgressIndicator,
  ProgressStep,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
  Tag,
  Tile,
} from '@carbon/react'
import { useEffect, useState } from 'react'
import { getJson, useServiceStatus } from '../../lib/api'
import {
  SAMPLE_LANES,
  SAMPLE_REPO,
  SAMPLE_STAGES,
  SAMPLE_TASK_TITLE,
  TRUST_LEVELS,
} from './sampleData'

interface LiveRun {
  key: string
  title: string
  repo: string
  stage: string
  waitingOn: string
  assignee: string | null
}

type LiveState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'ready'; runs: LiveRun[] }

function LiveRuns() {
  const [state, setState] = useState<LiveState>({ phase: 'loading' })

  useEffect(() => {
    let active = true
    getJson<{ runs: LiveRun[] }>('/api/hive/runs')
      .then(({ runs }) => active && setState({ phase: 'ready', runs }))
      .catch(
        (e: unknown) =>
          active &&
          setState({
            phase: 'error',
            message: e instanceof Error ? e.message : 'Something went wrong.',
          }),
      )
    return () => {
      active = false
    }
  }, [])

  return (
    <section aria-labelledby="hive-live-heading" className="studio__section">
      <h2 id="hive-live-heading" className="cds--productive-heading-03">
        Live runs <Tag type="green">Live: Hive</Tag>
      </h2>
      {state.phase === 'loading' && (
        <InlineLoading description="Loading runs from Hive" />
      )}
      {state.phase === 'error' && (
        <InlineNotification
          kind="error"
          lowContrast
          hideCloseButton
          title="Could not load Hive runs."
          subtitle={state.message}
        />
      )}
      {state.phase === 'ready' && state.runs.length === 0 && (
        <p className="studio__empty">Hive reports no active runs.</p>
      )}
      {state.phase === 'ready' && state.runs.length > 0 && (
        <StructuredListWrapper aria-label="Live Hive runs">
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Run</StructuredListCell>
              <StructuredListCell head>Stage</StructuredListCell>
              <StructuredListCell head>Waiting on</StructuredListCell>
              <StructuredListCell head>Assignee</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {state.runs.map((run) => (
              <StructuredListRow key={run.key}>
                <StructuredListCell>
                  {run.title}
                  <br />
                  <small>{run.key}</small>
                </StructuredListCell>
                <StructuredListCell>{run.stage}</StructuredListCell>
                <StructuredListCell>{run.waitingOn}</StructuredListCell>
                <StructuredListCell>
                  {run.assignee ?? 'unassigned'}
                </StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      )}
    </section>
  )
}

function HiveFleet() {
  const status = useServiceStatus()
  const live =
    status.phase === 'ready' &&
    status.status.hiveApi.configured &&
    status.status.hiveApi.reachable
  const [step, setStep] = useState(0)
  const stage = SAMPLE_STAGES[step]

  return (
    <div className="studio studio--hive">
      <header className="studio__header">
        <Tag type="purple">Hive</Tag>
        <h1 className="cds--productive-heading-05">Hive Agent Fleet</h1>
        <p className="cds--body-long-01">
          Hive is a work-governance plane for AI coding agents that maintain
          repositories. It connects the work queue, the rules and the review
          history. It is not a chat agent. This experience is independent of the
          CUGA tab.
        </p>
      </header>

      {status.phase === 'loading' && (
        <InlineLoading description="Checking for a Hive connection" />
      )}
      {status.phase !== 'loading' && !live && (
        <InlineNotification
          kind="info"
          lowContrast
          hideCloseButton
          title="Hive is not connected. Showing a guided preview."
          subtitle={
            status.phase === 'unavailable'
              ? 'The site server is not running. Everything below is sample data.'
              : status.status.hiveApi.configured
                ? 'The configured Hive dashboard did not answer. Everything below is sample data.'
                : 'No Hive dashboard is configured. Everything below is sample data.'
          }
        />
      )}

      {live && <LiveRuns />}

      <section
        aria-labelledby="hive-scenario-heading"
        className="studio__section"
      >
        <h2 id="hive-scenario-heading" className="cds--productive-heading-03">
          Guided scenario <Tag type="purple">Sample data, not live</Tag>
        </h2>
        <Tile className="studio__panel">
          <p>
            <strong>{SAMPLE_TASK_TITLE}</strong> in <code>{SAMPLE_REPO}</code>
          </p>
          <ProgressIndicator
            currentIndex={step}
            spaceEqually
            onChange={(index: number) => setStep(index)}
          >
            {SAMPLE_STAGES.map((s) => (
              <ProgressStep
                key={s.label}
                label={s.label}
                secondaryLabel={s.appliesTo}
              />
            ))}
          </ProgressIndicator>
          <div aria-live="polite" className="studio__stage">
            <div className="studio__stage-tags">
              <Tag type="blue">{stage.appliesTo}</Tag>{' '}
              <Tag type={stage.actor === 'human' ? 'red' : 'gray'}>
                acts: {stage.actor}
              </Tag>
            </div>
            <p>{stage.summary}</p>
            <p>
              <strong>Audit note (sample):</strong> {stage.audit}
            </p>
          </div>
          <div className="studio__controls">
            <Button
              kind="secondary"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              Previous stage
            </Button>
            <Button
              size="sm"
              disabled={step === SAMPLE_STAGES.length - 1}
              onClick={() => setStep(step + 1)}
            >
              Advance stage
            </Button>
          </div>
        </Tile>
      </section>

      <section aria-labelledby="hive-lanes-heading" className="studio__section">
        <h2 id="hive-lanes-heading" className="cds--productive-heading-03">
          Agent lanes <Tag type="purple">Sample data, not live</Tag>
        </h2>
        <div className="studio__lanes">
          {SAMPLE_LANES.map((lane) => (
            <Tile key={lane.role}>
              <strong>{lane.role}</strong>
              <div className="studio__lane-status">
                <Tag
                  type={lane.status === 'working' ? 'green' : 'gray'}
                  size="sm"
                >
                  {lane.status}
                </Tag>
              </div>
              <p>{lane.doing}</p>
            </Tile>
          ))}
        </div>
      </section>

      <section aria-labelledby="hive-trust-heading" className="studio__section">
        <h2 id="hive-trust-heading" className="cds--productive-heading-03">
          Trust levels (ACMM)
        </h2>
        <p className="cds--body-long-01">
          From the Hive documentation. The level decides which agents run and
          what they may do. Holdgated PRs carry a hold label that only a person
          removes.
        </p>
        <StructuredListWrapper aria-label="ACMM trust levels">
          <StructuredListBody>
            {TRUST_LEVELS.map((t) => (
              <StructuredListRow key={t.level}>
                <StructuredListCell noWrap>
                  {t.level} {t.name}
                </StructuredListCell>
                <StructuredListCell>{t.summary}</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </section>
    </div>
  )
}

export default HiveFleet
