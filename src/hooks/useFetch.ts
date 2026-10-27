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

// Volitelné nastavení – lze předat standardní fetch options a příznaky chování hooku
export interface UseFetchOptions extends RequestInit {
  // Když je false, hook data automaticky nenačte (užitečné pro podmíněné dotazy)
  enabled?: boolean
  // Když je true, úspěšná odpověď se uloží do modulové cache (klíč = URL) a sdílí mezi všemi
  // instancemi hooku po dobu života stránky; souběžné požadavky na stejnou URL se slučují.
  // refetch() cache pro danou URL zahodí a stáhne znovu. (Název `shared`, protože `cache`
  // už má RequestInit pro HTTP cache prohlížeče.)
  shared?: boolean
}

// Modulová cache: hotová data a probíhající požadavky podle URL
const dataCache = new Map<string, unknown>()
const inflight = new Map<string, Promise<unknown>>()

async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} – ${response.statusText}`)
  }
  return (await response.json()) as T
}

// Načtení přes cache: první volající spustí fetch, ostatní čekají na stejný promise
function fetchCached<T>(url: string, init: RequestInit): Promise<T> {
  if (dataCache.has(url)) return Promise.resolve(dataCache.get(url) as T)
  const pending = inflight.get(url) as Promise<T> | undefined
  if (pending) return pending

  const request = fetchJson<T>(url, init)
    .then((json) => {
      dataCache.set(url, json)
      return json
    })
    .finally(() => inflight.delete(url))
  inflight.set(url, request)
  return request
}

export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {},
): FetchState<T> {
  const { enabled = true, shared = false, ...requestInit } = options

  // Data z cache jsou k dispozici hned při prvním renderu (bez probliknutí prázdného stavu)
  const cached = shared && url && dataCache.has(url) ? (dataCache.get(url) as T) : null
  const [data, setData] = useState<T | null>(cached)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Pomocí ref držíme aktuální options, aby nebyly nutné v závislostech efektu
  const optionsRef = useRef(requestInit)
  optionsRef.current = requestInit

  // Ruční přepínač pro refetch
  const [reloadIndex, setReloadIndex] = useState(0)
  const refetch = useCallback(() => {
    if (url) dataCache.delete(url)
    setReloadIndex((i) => i + 1)
  }, [url])

  useEffect(() => {
    // Bez URL nebo když je hook vypnutý, nic neděláme
    if (!url || !enabled) return

    // AbortController pro zrušení požadavku při odmontování / změně URL.
    // Sdílený (cachovaný) požadavek nerušíme – mohl by na něj čekat jiný odběratel.
    const controller = new AbortController()
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)

      try {
        const json = shared
          ? await fetchCached<T>(url, optionsRef.current)
          : await fetchJson<T>(url, { ...optionsRef.current, signal: controller.signal })
        if (!cancelled) setData(json)
      } catch (err) {
        if (cancelled) return
        // Zrušený požadavek nepovažujeme za chybu
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error('Neznámá chyba při fetchování'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    // Úklid – zruš probíhající požadavek
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [url, enabled, shared, reloadIndex])

  return { data, loading, error, refetch }
}

export default useFetch
