'use client'

import React from 'react'
import { ArrowRight, CheckCircle2, Compass, Flag, MapPin, Sparkles } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface ModuleMapViewProps {
  rawMapText: string
  introText?: string
}

export function ModuleMapView({ rawMapText, introText }: ModuleMapViewProps) {
  // Extract steps from text separated by arrows
  const cleanMap = rawMapText
    .replace(/^.*?mapa del m[óo]dulo:?\s*/i, '')
    .replace(/^estaciones del m[óo]dulo:?\s*/i, '')
    .trim()

  const rawStations = cleanMap.split(/\s*→\s*|\s*➔\s*|\s*->\s*/)
    .map((s) => s.replace(/^\*+|\*+$/g, '').trim())
    .filter(Boolean)

  if (rawStations.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {introText && (
        <p className="text-sm text-foreground/80 leading-relaxed font-normal">
          {introText}
        </p>
      )}

      {/* Module Map Banner */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-background to-emerald-500/10 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
              <Compass className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                Mapa de Ruta del Módulo
                <Sparkles className="h-4 w-4 text-amber-500" />
              </h3>
              <p className="text-xs text-muted-foreground">
                Recorrido estructurado de actividades y estaciones de aprendizaje
              </p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 text-xs font-semibold px-2.5 py-1 text-primary">
            <MapPin className="mr-1 h-3.5 w-3.5 text-primary" />
            {rawStations.length} estaciones
          </span>
        </div>

        {/* Visual Roadmap Nodes */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rawStations.map((station, index) => {
            const isFirst = index === 0
            const isLast = index === rawStations.length - 1
            const stepNumber = String(index + 1).padStart(2, '0')

            return (
              <Card
                key={index}
                className="relative overflow-hidden border transition-all duration-200 hover:shadow-md hover:border-primary/40 bg-card/60 backdrop-blur-xs group"
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full ${
                    isFirst
                      ? 'bg-blue-500'
                      : isLast
                        ? 'bg-emerald-500'
                        : 'bg-primary/40 group-hover:bg-primary'
                  }`}
                />

                <CardContent className="p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-muted text-[11px] font-black text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {stepNumber}
                    </span>

                    <div className="flex items-center gap-1">
                      {isFirst && (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                          Inicio
                        </span>
                      )}
                      {isLast && (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Flag className="h-3 w-3" />
                          Meta
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-foreground/95 leading-snug line-clamp-2">
                    {station}
                  </p>

                  {!isLast && (
                    <div className="mt-2.5 flex items-center justify-end text-[11px] font-medium text-muted-foreground/60 group-hover:text-primary transition-colors">
                      <span className="text-[10px] mr-1">Siguiente</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                  {isLast && (
                    <div className="mt-2.5 flex items-center justify-end text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      <span className="text-[10px]">Cierre</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Legend footer */}
        <div className="mt-4 flex items-center justify-between border-t border-muted/60 pt-3 text-[11px] text-muted-foreground">
          <span>Avance progresivo por lecciones interactivas</span>
          <span className="font-semibold text-foreground/80">
            Completa cada estación para desbloquear tu bitácora
          </span>
        </div>
      </div>
    </div>
  )
}
