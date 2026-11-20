export interface ServiceStatus {
  cugaApi: { configured: boolean; reachable: boolean }
  hiveApi: { configured: boolean; reachable: boolean }
}

export type StatusState =
  | { phase: 'loading' }
  | { phase: 'unavailable' }
  | { phase: 'ready'; status: ServiceStatus }

const ERROR_MESSAGES: Record<string, string> = {
  cuga_not_configured: 'CUGA is not configured on this site.',
  cuga_unreachable: 'CUGA could not be reached. Check that it is running.',
  cuga_error: 'CUGA returned an error. Try again in a moment.',
  cuga_run_failed: 'CUGA could not complete that request.',
  hive_not_configured: 'Hive is not configured on this site.',
  hive_unreachable: 'Hive could not be reached. Check that it is running.',
  hive_auth_failed: 'Hive rejected the configured credential.',
  hive_error: 'Hive returned an unexpected response.',
  rate_limited: 'Too many requests. Wait a minute and try again.',
  unauthorized: 'This site requires an access token for live services.',
}

/** Maps a backend error code to text that is safe to show a visitor. */
export function describeError(code: string | undefined): string {
  return (
    (code && ERROR_MESSAGES[code]) ?? 'Something went wrong. Try again later.'
  )
}

export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const payload = (await res.json().catch(() => ({}))) as {
    error?: string
  } & T
  if (!res.ok) throw new Error(describeError(payload.error))
  return payload
}

export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  const payload = (await res.json().catch(() => ({}))) as {
    error?: string
  } & T
  if (!res.ok) throw new Error(describeError(payload.error))
  return payload
}
