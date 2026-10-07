'use client'

import React from 'react'
import { ArrowRight, Workflow } from 'lucide-react'

interface ModuleMapViewProps {
  rawMapText: string
  introText?: string
}

export function ModuleMapView({ rawMapText, introText }: ModuleMapViewProps) {
  const cleanMap = rawMapText
    .replace(/^.*?mapa del m[óo]dulo:?\s*/i, '')
    .replace(/^estaciones.*?:?\s*/i, '')
    .trim()

  const stations = cleanMap
    .split(/\s*→\s*|\s*➔\s*|\s*->\s*/)
    .map((s) => s.replace(/^[\*•\s]+|[\*•\s]+$/g, '').trim())
    .filter(Boolean)

  if (stations.length === 0) {
    return null
  }

  const total = stations.length

  const cleanIntro = introText
    ?.replace(/^estaciones.*?:?\s*$/i, '')
    .trim()

  return (
    <div className="space-y-3">
      {cleanIntro ? (
        <p className="text-sm text-foreground/80 leading-relaxed font-normal">
          {cleanIntro}
        </p>
      ) : null}

      <div className="rounded-xl border bg-card/60 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="h-5 w-5 text-primary shrink-0" />
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Ruta...
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {stations.map((station, index) => {
            const isFirst = index === 0
            const isLast = index === total - 1
            const stepNumber = index + 1

            return (
              <div key={index} className="inline-flex items-center gap-2 sm:gap-2.5">
                <div
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    isFirst
                      ? 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300'
                      : isLast
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'border-border bg-background text-foreground hover:border-primary/40'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isFirst
                        ? 'bg-blue-600 text-white'
                        : isLast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNumber}
                  </span>
                  <span>{station}</span>
                </div>

                {!isLast && (
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
