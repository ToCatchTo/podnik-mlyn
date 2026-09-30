import { useEffect } from 'react'

// Strukturovaná data schema.org jako <script type="application/ld+json"> v <head>.
// Skript se vloží při zobrazení stránky a při odchodu z ní zase odstraní. Nic nevykresluje.
interface JsonLdProps {
  data: Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
  // Escapování "<" zabrání předčasnému ukončení script tagu hodnotou obsahující </script>
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
