import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the main heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: 'About Beehive' }),
    ).toBeInTheDocument()
  })

  it('renders the Agent roster heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: 'Agent roster' }),
    ).toBeInTheDocument()
  })

  it('renders all six agents in the structured list', () => {
    render(<About />)
    for (const label of [
      'Scanner',
      'CI Maintainer',
      'Architect',
      'Supervisor',
      'Outreach',
      'Sec-Check',
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('renders Role details accordion heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: 'Role details' }),
    ).toBeInTheDocument()
  })

  it('expands an accordion item to show detail text', async () => {
    render(<About />)
    const scannerButton = screen.getByRole('button', { name: /scanner/i })
    await userEvent.click(scannerButton)
    expect(screen.getByText(/first agent dispatched/i)).toBeInTheDocument()
  })
})
