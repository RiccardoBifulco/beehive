import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it.each([
    ['/', 'Welcome to Beehive'],
    ['/about', 'About Beehive'],
    ['/contact', 'Contact'],
    ['/no-such-page', 'Page not found'],
  ])('renders the page for %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })

  it('renders the shell with a skip link and the main navigation', () => {
    renderAt('/')
    expect(
      screen.getByRole('link', { name: /skip to main content/i }),
    ).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const label of ['Home', 'About', 'Contact']) {
      expect(nav).toHaveTextContent(label)
    }
  })

  it('navigates client-side when a nav link is clicked', async () => {
    renderAt('/')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    await userEvent.click(nav.querySelector('a[href="/about"]')!)
    expect(
      screen.getByRole('heading', { name: 'About Beehive' }),
    ).toBeInTheDocument()
  })

  it.each([
    ['Meet the agents', 'About Beehive'],
    ['Get in touch', 'Contact'],
  ])('navigates client-side from the %s CTA', async (name, heading) => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name }))
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })

  it('navigates client-side from the 404 back to home CTA', async () => {
    renderAt('/no-such-page')
    await userEvent.click(screen.getByRole('link', { name: /back to home/i }))
    expect(
      screen.getByRole('heading', { name: 'Welcome to Beehive' }),
    ).toBeInTheDocument()
  })

  it('toggles the side navigation from the menu button', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(
      screen.getByRole('button', { name: 'Close menu' }),
    ).toBeInTheDocument()
  })
})
