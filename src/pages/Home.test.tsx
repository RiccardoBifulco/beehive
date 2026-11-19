import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from './Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home', () => {
  it('renders the main heading', () => {
    renderHome()
    expect(
      screen.getByRole('heading', { name: 'Welcome to Beehive' }),
    ).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    renderHome()
    expect(
      screen.getByText(/autonomous multi-agent swarm/i),
    ).toBeInTheDocument()
  })

  it('renders the Meet the agents CTA link', () => {
    renderHome()
    expect(
      screen.getByRole('link', { name: /meet the agents/i }),
    ).toBeInTheDocument()
  })

  it('renders the Get in touch CTA link', () => {
    renderHome()
    expect(
      screen.getByRole('link', { name: /get in touch/i }),
    ).toBeInTheDocument()
  })

  it('renders the Agent roles section heading', () => {
    renderHome()
    expect(
      screen.getByRole('heading', { name: 'Agent roles' }),
    ).toBeInTheDocument()
  })

  it('renders all six agent feature tiles', () => {
    renderHome()
    for (const label of [
      'Scanner',
      'Architect',
      'CI Maintainer',
      'Supervisor',
      'Outreach',
      'Sec-Check',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })
})
