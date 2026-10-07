'use client'

import { BookOpen, CheckCircle2, Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { TextBlockData } from '@/types/content-blocks'
import { FormattedText } from '../formatted-text'
import { ModuleMapView } from './module-map-view'

function cleanContentTitle(content: string, heading?: string): string {
  if (!heading) return content
  const trimmedHeading = heading.trim().toLowerCase()
  const lines = content.split('\n')
  if (lines.length > 0) {
    const firstLine = lines[0].replace(/^#+\s*|\*+|\.+$/g, '').trim().toLowerCase()
    if (firstLine === trimmedHeading || firstLine.startsWith(trimmedHeading)) {
      return lines.slice(1).join('\n').trim()
    }
  }
  return content
}

export function TextBlock({
  data,
  completed,
  pending,
  onComplete,
}: {
  data: TextBlockData
  completed: boolean
  pending: boolean
  onComplete: () => void
}) {
  const isModuleMap =
    Boolean(data.heading?.toLowerCase().includes('mapa')) ||
    (data.content.includes('→') && data.content.split('→').length >= 3) ||
    data.content.toLowerCase().includes('mapa del módulo')

  // Clean duplicate heading in body if present
  const cleanedContent = cleanContentTitle(data.content, data.heading)

  // For module maps, separate text before arrows and the arrow chain
  let mapIntro = ''
  let mapChain = ''
  if (isModuleMap) {
    const parts = cleanedContent.split(/\n\n+/)
    const chainPart = parts.find((p) => p.includes('→') && p.split('→').length >= 3)
    if (chainPart) {
      mapChain = chainPart
      mapIntro = parts.filter((p) => p !== chainPart).join('\n\n')
    } else {
      mapChain = cleanedContent
    }
  }

  return (
    <Card className="transition-all duration-200">
      <CardHeader>
        <div
          className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${
            isModuleMap
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-blue-600 dark:text-blue-400'
          }`}
        >
          {isModuleMap ? (
            <>
              <Compass className="h-4 w-4" />
              Mapa del Módulo
            </>
          ) : (
            <>
              <BookOpen className="h-4 w-4" />
              Lectura
            </>
          )}
        </div>
        {data.heading && <h2 className="text-xl font-semibold">{data.heading}</h2>}
      </CardHeader>
      <CardContent className="space-y-6">
        {isModuleMap && mapChain ? (
          <ModuleMapView rawMapText={mapChain} introText={mapIntro} />
        ) : (
          <FormattedText content={cleanedContent} />
        )}

        {completed ? (
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Lección completada
          </div>
        ) : (
          <Button onClick={onComplete} disabled={pending}>
            {pending ? 'Guardando…' : 'Marcar como completado'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
