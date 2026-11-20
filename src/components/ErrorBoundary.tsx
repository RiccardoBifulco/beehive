import { Button, InlineNotification, Stack, Tile } from '@carbon/react'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught rendering error:', error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Tile role="alert">
          <Stack gap={5}>
            <InlineNotification
              kind="error"
              title="Something went wrong"
              subtitle={
                this.state.error?.message ||
                'An unexpected error occurred while rendering this page.'
              }
              lowContrast
              hideCloseButton
            />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button kind="primary" onClick={this.handleReload}>
                Reload page
              </Button>
              <Button
                kind="secondary"
                as={Link}
                to="/"
                onClick={this.handleReset}
              >
                Go to Home
              </Button>
            </div>
          </Stack>
        </Tile>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
