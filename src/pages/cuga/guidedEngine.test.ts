import { describe, expect, it } from 'vitest'
import { BASELINE_PAGE, pageText, runGuidedCommand } from './guidedEngine'

describe('runGuidedCommand', () => {
  it('answers a retention question from the page and highlights it', () => {
    const result = runGuidedCommand(
      'What does this page say about data retention?',
      BASELINE_PAGE,
    )
    expect(result.kind).toBe('answer')
    expect(result.reply).toContain('30 days')
    expect(result.highlight).toBe('retention')
    expect(result.next).toBe(BASELINE_PAGE)
  })

  it('finds and highlights the cancellation policy', () => {
    const result = runGuidedCommand(
      'Find the cancellation policy and highlight it.',
      BASELINE_PAGE,
    )
    expect(result.highlight).toBe('cancellation')
  })

  it('identifies the main button', () => {
    const result = runGuidedCommand(
      'Which button is the main action?',
      BASELINE_PAGE,
    )
    expect(result.highlight).toBe('primary-button')
    expect(result.reply).toContain('Accept terms')
  })

  it('rewrites the heading without mutating the original page', () => {
    const result = runGuidedCommand(
      'Rewrite this heading to be clearer.',
      BASELINE_PAGE,
    )
    expect(result.next.heading).not.toBe(BASELINE_PAGE.heading)
    expect(BASELINE_PAGE.heading).toBe('Terms stuff')
  })

  it('makes the button prominent, adds an explanation and applies a theme', () => {
    const button = runGuidedCommand(
      'Make the primary button more prominent.',
      BASELINE_PAGE,
    )
    expect(button.next.prominentButton).toBe(true)
    const explain = runGuidedCommand(
      'Add a short explanation under this section.',
      BASELINE_PAGE,
    )
    expect(explain.next.explanation).toContain('30 days')
    const theme = runGuidedCommand(
      'Change the page to a calmer blue theme.',
      BASELINE_PAGE,
    )
    expect(theme.next.calmTheme).toBe(true)
  })

  it('removes the redundant paragraph once, then reports nothing to remove', () => {
    const first = runGuidedCommand(
      'Remove the redundant paragraph.',
      BASELINE_PAGE,
    )
    expect(first.next.sections.map((s) => s.id)).not.toContain(
      'retention-repeat',
    )
    const second = runGuidedCommand(
      'Remove the redundant paragraph.',
      first.next,
    )
    expect(second.kind).toBe('unknown')
    expect(second.next).toBe(first.next)
  })

  it('says so when a request is not one of the guided examples', () => {
    const result = runGuidedCommand('Order me a pizza', BASELINE_PAGE)
    expect(result.kind).toBe('unknown')
    expect(result.reply).toMatch(/connect cuga/i)
  })

  it('reports a missing section instead of inventing an answer', () => {
    const page = {
      ...BASELINE_PAGE,
      sections: BASELINE_PAGE.sections.filter(
        (s) => s.id !== 'retention' && s.id !== 'cancellation',
      ),
    }
    expect(runGuidedCommand('data retention?', page).reply).toMatch(/does not/)
    expect(runGuidedCommand('cancellation?', page).reply).toMatch(/does not/)
  })
})

describe('pageText', () => {
  it('includes the heading, sections, button and any added explanation', () => {
    const text = pageText({ ...BASELINE_PAGE, explanation: 'Extra line.' })
    expect(text).toContain('Terms stuff')
    expect(text).toContain('Cancellation policy')
    expect(text).toContain('Accept terms')
    expect(text).toContain('Extra line.')
  })
})
