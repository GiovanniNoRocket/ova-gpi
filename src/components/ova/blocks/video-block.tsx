'use client'

import { CheckCircle2, Video } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { VideoBlockData } from '@/types/content-blocks'

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
    }
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${parsed.pathname}`
    }
    return url
  } catch {
    return url
  }
}

export function VideoBlock({
  data,
  completed,
  pending,
  onComplete,
}: {
  data: VideoBlockData
  completed: boolean
  pending: boolean
  onComplete: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
          <Video className="h-4 w-4" />
          Video
        </div>
        {data.title && <h2 className="text-xl font-semibold">{data.title}</h2>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
          <iframe
            src={toEmbedUrl(data.url)}
            title={data.title ?? 'Video de la lección'}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {data.transcript && (
          <p className="text-sm text-muted-foreground">{data.transcript}</p>
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
