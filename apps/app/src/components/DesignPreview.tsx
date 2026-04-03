import { useState, useEffect, useRef } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { getApiBaseUrl, getAuthHeaders } from '@/lib/apiBase'

type Finding = {
  id: string
  severity: string
  title: string
}

type PreviewResult = {
  description: string
  fix_prompt: string
}

type Props = {
  open: boolean
  onClose: () => void
  scanId: string
  finding: Finding | null
}

export default function DesignPreview({ open, onClose, scanId, finding }: Props) {
  const [state, setState] = useState<'loading' | 'result' | 'error'>('loading')
  const [result, setResult] = useState<PreviewResult | null>(null)
  const generating = useRef(false)

  useEffect(() => {
    if (!open || !finding) return
    if (generating.current) return
    generating.current = true
    setState('loading')
    setResult(null)

    const generate = async () => {
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${getApiBaseUrl()}/v1/scans/${scanId}/preview`, {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ finding_id: finding.id }),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data: PreviewResult = await res.json()
        setResult(data)
        setState('result')
      } catch {
        setState('error')
        toast.error('Preview generation failed. Please try again.')
      } finally {
        generating.current = false
      }
    }

    generate()
  }, [open, finding, scanId])

  const handleClose = () => {
    generating.current = false
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Fix preview</SheetTitle>
          {finding && (
            <p className="text-sm text-muted-foreground truncate">{finding.title}</p>
          )}
        </SheetHeader>

        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground text-center">
              Generating fix…<br />This takes about 10–15 seconds.
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="py-12 text-center">
            <p className="text-sm text-destructive">Generation failed. Close and try again.</p>
          </div>
        )}

        {state === 'result' && result && (
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">What to change</p>
              <p className="text-sm">{result.description}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Fix prompt</p>
                <button
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                  onClick={() => { navigator.clipboard.writeText(result.fix_prompt); toast.success('Prompt copied') }}
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <pre className="text-xs bg-muted p-3 rounded whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
                {result.fix_prompt}
              </pre>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
