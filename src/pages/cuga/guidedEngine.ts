// Guided-demo engine for the CUGA Page Studio.
//
// Everything here is local and deterministic. It never talks to CUGA, so its
// results must always be labelled as guided-demo output, never as live.

export type SectionId = 'retention' | 'cancellation' | 'retention-repeat'
export type HighlightId = SectionId | 'primary-button'

export interface PageSection {
  id: SectionId
  title: string
  body: string
}

export interface PageState {
  heading: string
  sections: PageSection[]
  explanation: string | null
  prominentButton: boolean
  calmTheme: boolean
}

export const BASELINE_PAGE: PageState = {
  heading: 'Terms stuff',
  sections: [
    {
      id: 'retention',
      title: 'Data retention',
      body: 'We keep your files for 30 days after you delete them. After that they are permanently removed from our systems.',
    },
    {
      id: 'cancellation',
      title: 'Cancellation policy',
      body: 'You can cancel at any time from Settings. Your plan stays active until the end of the billing period, and we do not issue partial refunds.',
    },
    {
      id: 'retention-repeat',
      title: 'Retention (again)',
      body: 'As said above, deleted files are kept for 30 days and then permanently removed.',
    },
  ],
  explanation: null,
  prominentButton: false,
  calmTheme: false,
}

export const PRIMARY_BUTTON_LABEL = 'Accept terms'

export interface TimelineStep {
  label: string
  detail: string
}

export interface DemoResult {
  kind: 'answer' | 'edit' | 'unknown'
  reply: string
  highlight: HighlightId | null
  next: PageState
  steps: TimelineStep[]
}

const RETENTION_EXPLANATION =
  'In short: deleted files stay recoverable for 30 days, then they are gone for good.'

/** Plain text of the page, as sent to CUGA for a live grounded answer. */
export function pageText(page: PageState): string {
  const parts = [page.heading]
  for (const section of page.sections) {
    parts.push(`${section.title}: ${section.body}`)
    if (section.id === 'retention' && page.explanation) {
      parts.push(page.explanation)
    }
  }
  parts.push(`Main button: ${PRIMARY_BUTTON_LABEL}`)
  return parts.join('\n')
}

export function runGuidedCommand(message: string, page: PageState): DemoResult {
  const text = message.toLowerCase()
  const unchanged = (
    kind: DemoResult['kind'],
    reply: string,
    highlight: HighlightId | null,
    steps: TimelineStep[],
  ): DemoResult => ({ kind, reply, highlight, next: page, steps })

  if (
    /\b(rewrite|reword|clearer)\b.*\bheading\b|\bheading\b.*\b(rewrite|clearer)\b/.test(
      text,
    )
  ) {
    return {
      kind: 'edit',
      reply:
        'Rewrote the heading. This is a temporary change to the preview only.',
      highlight: null,
      next: { ...page, heading: 'How we handle your data and your plan' },
      steps: [
        { label: 'Read page', detail: 'Found the h1 heading' },
        { label: 'Edit text', detail: 'Replaced heading text in the preview' },
      ],
    }
  }
  if (/\bprominent\b|\bstand out\b/.test(text) && /\bbutton\b/.test(text)) {
    return {
      kind: 'edit',
      reply: 'Made the primary button larger and bolder in the preview.',
      highlight: 'primary-button',
      next: { ...page, prominentButton: true },
      steps: [
        { label: 'Find element', detail: 'Located the primary button' },
        {
          label: 'Edit style',
          detail: 'Applied a prominent style to the preview',
        },
      ],
    }
  }
  if (/\badd\b.*\b(explanation|summary)\b/.test(text)) {
    return {
      kind: 'edit',
      reply: 'Added a short explanation under the retention section.',
      highlight: 'retention',
      next: { ...page, explanation: RETENTION_EXPLANATION },
      steps: [
        { label: 'Find section', detail: 'Located the data retention section' },
        {
          label: 'Insert text',
          detail: 'Added one sentence under it in the preview',
        },
      ],
    }
  }
  if (/\bblue\b.*\btheme\b|\bcalm/.test(text)) {
    return {
      kind: 'edit',
      reply: 'Switched the preview to a calmer blue theme.',
      highlight: null,
      next: { ...page, calmTheme: true },
      steps: [
        { label: 'Read page', detail: 'Found the preview colour scheme' },
        {
          label: 'Edit style',
          detail: 'Applied the calm blue theme to the preview',
        },
      ],
    }
  }
  if (/\bremove\b.*\b(redundant|duplicate|repeat)/.test(text)) {
    if (!page.sections.some((s) => s.id === 'retention-repeat')) {
      return unchanged(
        'unknown',
        'There is no redundant paragraph left to remove.',
        null,
        [{ label: 'Read page', detail: 'No repeated paragraph found' }],
      )
    }
    return {
      kind: 'edit',
      reply: 'Removed the paragraph that repeats the retention section.',
      highlight: null,
      next: {
        ...page,
        sections: page.sections.filter((s) => s.id !== 'retention-repeat'),
      },
      steps: [
        {
          label: 'Compare paragraphs',
          detail: 'Matched the repeat against Data retention',
        },
        { label: 'Remove element', detail: 'Removed it from the preview' },
      ],
    }
  }
  if (/\bretention\b|\bretain\b|\bhow long\b/.test(text)) {
    const section = page.sections.find((s) => s.id === 'retention')
    return unchanged(
      'answer',
      section ? section.body : 'The page does not mention data retention.',
      section ? 'retention' : null,
      [
        { label: 'Read page', detail: 'Searched page text for retention' },
        {
          label: 'Highlight',
          detail: 'Highlighted the Data retention section',
        },
      ],
    )
  }
  if (/\bcancel/.test(text)) {
    const section = page.sections.find((s) => s.id === 'cancellation')
    return unchanged(
      'answer',
      section ? section.body : 'The page does not mention cancellation.',
      section ? 'cancellation' : null,
      [
        { label: 'Read page', detail: 'Searched page text for cancellation' },
        {
          label: 'Highlight',
          detail: 'Highlighted the Cancellation policy section',
        },
      ],
    )
  }
  if (/\b(main|primary)\b.*\b(action|button)\b/.test(text)) {
    return unchanged(
      'answer',
      `The main action is the "${PRIMARY_BUTTON_LABEL}" button.`,
      'primary-button',
      [
        { label: 'Read page', detail: 'Listed the buttons on the page' },
        { label: 'Highlight', detail: 'Highlighted the primary button' },
      ],
    )
  }
  return unchanged(
    'unknown',
    'The guided demo understands the example requests shown above. Connect CUGA to ask anything about the page.',
    null,
    [{ label: 'Read request', detail: 'No guided demo matches this request' }],
  )
}
