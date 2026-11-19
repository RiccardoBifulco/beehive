import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import NotFound from './NotFound'

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  )
}

describe('NotFound', () => {
  it('renders the page not found heading', () => {
    renderNotFound()
    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('explains that the requested page does not exist', () => {
    renderNotFound()
    expect(
      screen.getByText(/the page you requested does not exist/i),
    ).toBeInTheDocument()
  })

  it('renders a link back to the home page', () => {
    renderNotFound()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
