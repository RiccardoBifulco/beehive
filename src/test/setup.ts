import '@testing-library/jest-dom/vitest'

// jsdom does not implement matchMedia, which Carbon's UI Shell relies on.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})

// jsdom does not implement ResizeObserver, which Carbon's TextArea relies on.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

;(window as unknown as Record<string, unknown>).ResizeObserver =
  ResizeObserverStub
