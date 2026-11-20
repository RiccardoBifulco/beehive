import { useEffect, useState } from 'react'
import { type ServiceStatus, type StatusState } from './http'

/**
 * Asks the site's own backend which services are reachable. If the backend is
 * not running, both tabs fall back to their guided preview.
 */
export function useServiceStatus(): StatusState {
  const [state, setState] = useState<StatusState>({ phase: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/status', { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ServiceStatus>) : null))
      .then((status) => {
        setState(status ? { phase: 'ready', status } : { phase: 'unavailable' })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ phase: 'unavailable' })
      })
    return () => controller.abort()
  }, [])

  return state
}
