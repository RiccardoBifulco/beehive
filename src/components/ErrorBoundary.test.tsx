import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary'
import Layout from './Layout'

function BrokenComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test render failure')
  }
  return <div>Recovered content</div>
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  const suppressError = (event: ErrorEvent) => {
    event.preventDefault()
  }

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    window.addEventListener('error', suppressError)
  })

  afterEach(() => {
    window.removeEventListener('error', suppressError)
    consoleErrorSpy.mockRestore()
  })

  it('renders children when there is no error', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Healthy content</div>
        </ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByText('Healthy content')).toBeInTheDocument()
  })

  it('catches child render errors and displays fallback UI with recovery actions', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <BrokenComponent />
        </ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test render failure')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Reload page' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to Home' })).toBeInTheDocument()
  })

  it('keeps the Layout header mounted when a route throws and recovers on Go to Home', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/broken']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Home page</div>} />
            <Route path="broken" element={<BrokenComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    // Header navigation remains mounted
    expect(screen.getByRole('banner', { name: 'Beehive' })).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Clicking Go to Home resets the boundary and renders Home page
    await user.click(screen.getByRole('link', { name: 'Go to Home' }))
    expect(screen.getByText('Home page')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})
