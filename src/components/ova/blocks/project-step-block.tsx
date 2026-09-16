'use client'

import { useState } from 'react'
import { BookMarked, CheckCircle2, FileSpreadsheet, FileText, Info, Lightbulb } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ProjectStepBlockData } from '@/types/content-blocks'

export function ProjectStepBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
  onOpenBitacora,
}: {
  data: ProjectStepBlockData
  progress: { stepData?: Record<string, unknown> } | null
  completed: boolean
  pending: boolean
  onSubmit: (stepData: Record<string, unknown>) => void
  onOpenBitacora?: () => void
}) {
  const [formData, setFormData] = useState<Record<string, unknown>>(
    progress?.stepData ?? {},
  )

  function updateField(key: string, value: unknown) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid = (() => {
    if (data.stepType === 'SELECT_PROJECT') {
      const selected = formData['selectedProject'] as string | undefined
      if (!selected) return false
      if (selected === 'Proyecto propio') {
        const desc = (formData['customProjectDescription'] as string) ?? ''
        return desc.trim().length > 10
      }
      return true
    }

    if (data.fields && data.fields.length > 0) {
      return data.fields.some((f) => {
        const val = formData[f.key]
        return typeof val === 'string' ? val.trim().length > 0 : val != null
      })
    }

    if (data.matrixRows && data.matrixRows.length > 0) {
      return data.matrixRows.some((row) => {
        const val = (formData[row] as string) ?? ''
        return val.trim().length > 0
      })
    }

    return Object.keys(formData).length > 0
  })()

  return (
    <Card className="border-emerald-500/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            <BookMarked className="h-4 w-4" />
            Proyecto Integrador · Paso {data.stepNumber}
          </div>
          <div className="flex items-center gap-2">
            {data.pointsAwarded && (
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                +{data.pointsAwarded} XP
              </span>
            )}
            {onOpenBitacora && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpenBitacora}
                className="h-7 gap-1 text-xs"
              >
                <FileText className="h-3.5 w-3.5" />
                Ver Bitácora
              </Button>
            )}
          </div>
        </div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground">{data.instruction}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. SELECCIÓN DE PROYECTO */}
          {data.stepType === 'SELECT_PROJECT' && data.projectOptions && (
            <div className="space-y-4">
              <label className="text-sm font-semibold">Selecciona el tipo de proyecto tecnológico:</label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {data.projectOptions.map((opt) => {
                  const isSelected = formData['selectedProject'] === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={completed || pending}
                      onClick={() => updateField('selectedProject', opt)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-all',
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 font-medium text-foreground dark:border-emerald-400'
                          : 'hover:bg-muted/40',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-900'
                            : 'border-muted-foreground/40',
                        )}
                      >
                        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                      </div>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {formData['selectedProject'] === 'Proyecto propio' && (
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium">
                    Describe brevemente tu idea de proyecto (máximo 100 palabras):
                  </label>
                  <textarea
                    rows={3}
                    disabled={completed || pending}
                    value={(formData['customProjectDescription'] as string) ?? ''}
                    onChange={(e) => updateField('customProjectDescription', e.target.value)}
                    placeholder="Escribe el objetivo principal y problema que busca resolver..."
                    className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* 2. CAMPOS DE TEXTO NORMALES */}
          {data.fields && data.fields.length > 0 && (
            <div className="space-y-4">
              {data.fields.map((field) => {
                const value = (formData[field.key] as string) ?? ''
                const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

                return (
                  <div key={field.key} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold">{field.label}</label>
                      {field.maxWords && (
                        <span
                          className={cn(
                            'text-xs',
                            wordCount > field.maxWords
                              ? 'font-bold text-destructive'
                              : 'text-muted-foreground',
                          )}
                        >
                          {wordCount}/{field.maxWords} palabras
                        </span>
                      )}
                    </div>

                    {field.fieldType === 'textarea' ? (
                      <textarea
                        rows={4}
                        disabled={completed || pending}
                        value={value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={field.placeholder ?? 'Escribe tu respuesta aquí...'}
                        className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      />
                    ) : field.fieldType === 'checkbox_group' && field.options ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {field.options.map((opt) => {
                          const currentArr = (formData[field.key] as string[]) ?? []
                          const isChecked = currentArr.includes(opt)
                          return (
                            <button
                              key={opt}
                              type="button"
                              disabled={completed || pending}
                              onClick={() => {
                                const next = isChecked
                                  ? currentArr.filter((item) => item !== opt)
                                  : [...currentArr, opt]
                                updateField(field.key, next)
                              }}
                              className={cn(
                                'flex items-center gap-2 rounded-md border p-2 text-xs transition-colors',
                                isChecked
                                  ? 'border-emerald-500 bg-emerald-500/10 font-medium'
                                  : 'hover:bg-muted/40',
                              )}
                            >
                              <div
                                className={cn(
                                  'flex h-3.5 w-3.5 items-center justify-center rounded border',
                                  isChecked
                                    ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-900'
                                    : 'border-muted-foreground/40',
                                )}
                              >
                                {isChecked && <CheckCircle2 className="h-3 w-3" />}
                              </div>
                              <span className="truncate">{opt}</span>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <input
                        type="text"
                        disabled={completed || pending}
                        value={value}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* 3. MATRIZ / TABLA INTERACTIVA */}
          {data.matrixRows && data.matrixRows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Matriz de Caracterización
              </div>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-xs font-semibold uppercase text-muted-foreground">
                    <tr>
                      <th className="w-1/3 px-4 py-3">Aspecto</th>
                      <th className="px-4 py-3">Tu Respuesta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.matrixRows.map((row) => (
                      <tr key={row} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{row}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            disabled={completed || pending}
                            value={(formData[row] as string) ?? ''}
                            onChange={(e) => updateField(row, e.target.value)}
                            placeholder="Completa este aspecto..."
                            className="w-full rounded border border-transparent bg-transparent px-2.5 py-1.5 text-sm transition-colors hover:border-input focus:border-emerald-500 focus:bg-background focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONSEJO / RECOMENDACIÓN PEDAGÓGICA */}
          {data.advice && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-foreground/90">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <span className="font-semibold text-amber-600 dark:text-amber-400">Consejo clave: </span>
                <span>{data.advice}</span>
              </div>
            </div>
          )}

          {/* BOTÓN DE GUARDADO */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 text-emerald-500" />
              Los cambios se integran automáticamente en tu Bitácora consolidada.
            </div>

            {completed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                Paso registrado en la Bitácora
              </div>
            ) : (
              <Button type="submit" disabled={!isFormValid || pending}>
                {pending ? 'Guardando…' : 'Guardar en mi Bitácora'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
