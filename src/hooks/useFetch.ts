import { useCallback, useEffect, useRef, useState } from 'react'

// Jednotný custom hook pro fetchování dat napříč celou aplikací.
// Vrací data, stav načítání, případnou chybu a funkci refetch pro ruční znovunačtení.

// Stav jednoho fetch požadavku
export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

// Volitelné nastavení – lze předat standardní fetch options a příznak, zda se má fetch spustit
export interface UseFetchOptions extends RequestInit {
  // Když je false, hook data automaticky nenačte (užitečné pro podmíněné dotazy)
  enabled?: boolean
}

export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {},
): FetchState<T> {
  const { enabled = true, ...requestInit } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Pomocí ref držíme aktuální options, aby nebyly nutné v závislostech efektu
  const optionsRef = useRef(requestInit)
  optionsRef.current = requestInit

  // Ruční přepínač pro refetch
  const [reloadIndex, setReloadIndex] = useState(0)
  const refetch = useCallback(() => setReloadIndex((i) => i + 1), [])

  useEffect(() => {
    // Bez URL nebo když je hook vypnutý, nic neděláme
    if (!url || !enabled) return

    // AbortController pro zrušení požadavku při odmontování / změně URL
    const controller = new AbortController()

    const run = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          ...optionsRef.current,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} – ${response.statusText}`)
        }

        const json = (await response.json()) as T
        setData(json)
      } catch (err) {
        // Zrušený požadavek nepovažujeme za chybu
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error('Neznámá chyba při fetchování'))
      } finally {
        setLoading(false)
      }
    }

    run()

    // Úklid – zruš probíhající požadavek
    return () => controller.abort()
  }, [url, enabled, reloadIndex])

  return { data, loading, error, refetch }
}

export default useFetch
