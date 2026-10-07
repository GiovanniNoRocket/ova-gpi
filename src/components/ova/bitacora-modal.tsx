'use client'

import { useMemo, useState } from 'react'
import { Activity, BookMarked, Bot, CheckCircle2, Clock, FileText, Layers, Printer, Shield, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProjectStepBlockData } from '@/types/content-blocks'

import type { CourseBlock, CourseModule } from './types'

export function BitacoraModal({
  open,
  onClose,
  courseTitle,
  modules,
  blocks,
  defaultLevel = 1,
}: {
  open: boolean
  onClose: () => void
  courseTitle: string
  modules?: CourseModule[]
  blocks: CourseBlock[]
  defaultLevel?: number
}) {
  const [activeTab, setActiveTab] = useState<'nivel1' | 'nivel2' | 'nivel3' | 'nivel4' | 'nivel5'>(
    defaultLevel === 5
      ? 'nivel5'
      : defaultLevel === 4
        ? 'nivel4'
        : defaultLevel === 3
          ? 'nivel3'
          : defaultLevel === 2
            ? 'nivel2'
            : 'nivel1',
  )

  // Extract all PROJECT_STEP blocks
  const stepBlocks = useMemo(
    () =>
      blocks
        .filter((b) => b.type === 'PROJECT_STEP')
        .sort((a, b) => {
          const stepA = (a.blockData as ProjectStepBlockData).stepNumber ?? a.order
          const stepB = (b.blockData as ProjectStepBlockData).stepNumber ?? b.order
          return stepA - stepB
        }),
    [blocks],
  )

  const blockLevelMap = useMemo(() => {
    const map = new Map<string, number>()
    if (modules) {
      for (const m of modules) {
        for (const b of m.blocks) {
          map.set(b.id, m.level ?? 1)
        }
      }
    }
    return map
  }, [modules])

  const level1Steps = useMemo(
    () => stepBlocks.filter((b) => (blockLevelMap.get(b.id) ?? 1) === 1),
    [stepBlocks, blockLevelMap],
  )

  const level2Steps = useMemo(
    () => stepBlocks.filter((b) => blockLevelMap.get(b.id) === 2),
    [stepBlocks, blockLevelMap],
  )

  const level3Steps = useMemo(
    () => stepBlocks.filter((b) => blockLevelMap.get(b.id) === 3),
    [stepBlocks, blockLevelMap],
  )

  const level4Steps = useMemo(
    () => stepBlocks.filter((b) => blockLevelMap.get(b.id) === 4),
    [stepBlocks, blockLevelMap],
  )

  const level5Steps = useMemo(
    () => stepBlocks.filter((b) => blockLevelMap.get(b.id) === 5),
    [stepBlocks, blockLevelMap],
  )

  // Find project selection data from step 0
  const projectSelectionStep = stepBlocks.find(
    (b) => (b.blockData as ProjectStepBlockData).stepType === 'SELECT_PROJECT',
  )
  const projectSelectionData = (
    projectSelectionStep?.progress?.data as { stepData?: Record<string, unknown> }
  )?.stepData

  const selectedProjectName =
    (projectSelectionData?.['selectedProject'] as string) ?? 'Aún no seleccionado'
  const customDescription =
    (projectSelectionData?.['customProjectDescription'] as string) ?? ''

  function handlePrint() {
    window.print()
  }

  if (!open) return null

  const currentSteps =
    activeTab === 'nivel1'
      ? level1Steps
      : activeTab === 'nivel2'
        ? level2Steps
        : activeTab === 'nivel3'
          ? level3Steps
          : activeTab === 'nivel4'
            ? level4Steps
            : level5Steps
  const completedCurrentSteps = currentSteps.filter((b) => b.progress?.status === 'COMPLETED')
  const completedAllSteps = stepBlocks.filter((b) => b.progress?.status === 'COMPLETED')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 bg-muted/40">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <BookMarked className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {activeTab === 'nivel1'
                  ? 'Bitácora del Proyecto TIC'
                  : activeTab === 'nivel2'
                    ? 'Plan Inicial / Backlog Integral'
                    : activeTab === 'nivel3'
                      ? 'Simulación de Ejecución (Producto 1)'
                      : activeTab === 'nivel4'
                        ? 'Portafolio de Aplicaciones de IA Validadas'
                        : 'Proyecto TIC Integral con IA y Gobernanza'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {activeTab === 'nivel1'
                  ? `Documento 1 · Caracterización Inicial del Proyecto (${courseTitle})`
                  : activeTab === 'nivel2'
                    ? `Documento 2 · Formulación y Planeación del Proyecto (${courseTitle})`
                    : activeTab === 'nivel3'
                      ? `Documento 3 · Registro de Decisiones y Balance de Ejecución (${courseTitle})`
                      : activeTab === 'nivel4'
                        ? `Documento 4 · Ficha, Registro, Informe y Reto Integral SIGA-TI (${courseTitle})`
                        : `Documento 5 · Proyecto Final, Ética, Regulación y Sustentación (${courseTitle})`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 gap-1.5 text-xs"
            >
              <Printer className="h-3.5 w-3.5" /> Imprimir / PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* TABS SELECTOR (Nivel 1 al Nivel 5) */}
        <div className="flex border-b bg-muted/15 px-6 pt-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('nivel1')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-bold transition-all shrink-0',
              activeTab === 'nivel1'
                ? 'border-primary text-primary bg-background/80 rounded-t-lg'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>N1: Bitácora del Proyecto</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {level1Steps.filter((b) => b.progress?.status === 'COMPLETED').length}/{level1Steps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nivel2')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-bold transition-all shrink-0',
              activeTab === 'nivel2'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 bg-background/80 rounded-t-lg'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>N2: Plan / Backlog</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              {level2Steps.filter((b) => b.progress?.status === 'COMPLETED').length}/{level2Steps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nivel3')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-bold transition-all shrink-0',
              activeTab === 'nivel3'
                ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 bg-background/80 rounded-t-lg'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>N3: Simulación de Ejecución</span>
            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
              {level3Steps.filter((b) => b.progress?.status === 'COMPLETED').length}/{level3Steps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nivel4')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-bold transition-all shrink-0',
              activeTab === 'nivel4'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-background/80 rounded-t-lg'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <Bot className="h-3.5 w-3.5" />
            <span>N4: Portafolio de IA</span>
            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
              {level4Steps.filter((b) => b.progress?.status === 'COMPLETED').length}/{level4Steps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('nivel5')}
            className={cn(
              'flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-bold transition-all shrink-0',
              activeTab === 'nivel5'
                ? 'border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 bg-background/80 rounded-t-lg'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>N5: Proyecto Integrador</span>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
              {level5Steps.filter((b) => b.progress?.status === 'COMPLETED').length}/{level5Steps.length}
            </span>
          </button>
        </div>

        {/* METADATA STRIP */}
        <div className="grid grid-cols-2 gap-4 border-b bg-muted/20 px-6 py-3 sm:grid-cols-4 text-xs">
          <div>
            <span className="text-muted-foreground">Proyecto Seleccionado:</span>
            <p className="font-bold text-foreground truncate">{selectedProjectName}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Pasos del Documento:</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">
              {completedCurrentSteps.length} de {currentSteps.length} registrados
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Documento Activo:</span>
            <p className="font-bold text-foreground">
              {activeTab === 'nivel1'
                ? 'Doc 1: Caracterización TIC'
                : activeTab === 'nivel2'
                  ? 'Doc 2: Plan y Backlog'
                  : activeTab === 'nivel3'
                    ? 'Doc 3: Simulación de Ejecución'
                    : activeTab === 'nivel4'
                      ? 'Doc 4: Portafolio de IA'
                      : 'Doc 5: Proyecto Integrador Final'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Progreso Global:</span>
            <p className="font-bold text-amber-600 dark:text-amber-400">
              {completedAllSteps.length} / {stepBlocks.length} pasos ({Math.round(
                (completedAllSteps.length / (stepBlocks.length || 1)) * 100,
              )}%)
            </p>
          </div>
        </div>

        {/* CONTENIDO SCROLLABLE DE LA BITÁCORA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 print:p-0">
          {activeTab === 'nivel1' && customDescription && (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm">
              <span className="font-bold text-foreground">Idea inicial de proyecto propio: </span>
              <p className="mt-1 text-muted-foreground leading-relaxed">{customDescription}</p>
            </div>
          )}

          {activeTab === 'nivel2' && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Estructura del Plan Inicial / Backlog Integral del Nivel 2
              </p>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Este documento consolida la formulación del problema, árbol causal, objetivos, justificación, matriz de viabilidad 5D, registro y poder de stakeholders, requisitos MoSCoW, límites del alcance, entregables con criterios de aceptación, EDT/WBS, cronograma, recursos y presupuesto inicial.
              </p>
            </div>
          )}

          {activeTab === 'nivel3' && (
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-xs">
              <p className="font-bold text-purple-800 dark:text-purple-300">
                Estructura del Producto 1: Simulación de Ejecución (Nivel 3)
              </p>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Este documento consolida la trazabilidad de las decisiones operativas del gestor durante la ejecución: preparación ante requisitos ambiguos, coordinación de incidentes multievento (ausencias, proveedores, conflictos y defectos de calidad), y balance consolidado de equipo, entregables y lecciones aprendidas.
              </p>
            </div>
          )}

          {currentSteps.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No hay pasos registrados para este nivel.
            </div>
          ) : (
            currentSteps.map((block) => {
              const bData = block.blockData as ProjectStepBlockData
              const progressData = (block.progress?.data as { stepData?: Record<string, unknown> })
                ?.stepData
              const isDone = block.progress?.status === 'COMPLETED'

              return (
                <div
                  key={block.id}
                  className="rounded-xl border bg-background p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <h3 className="text-sm font-bold text-foreground">
                        Paso {bData.stepNumber}: {bData.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        'text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full',
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {isDone ? 'Registrado' : 'Pendiente'}
                    </span>
                  </div>

                  {!isDone && (
                    <p className="text-xs italic text-muted-foreground">
                      Este paso aún no ha sido completado en el curso.
                    </p>
                  )}

                  {isDone && progressData && (
                    <div className="space-y-3 text-sm">
                      {Object.entries(progressData).map(([key, val]) => {
                        if (!val) return null
                        if (key === 'selectedProject' || key === 'customProjectDescription')
                          return null

                        const isArray = Array.isArray(val)
                        return (
                          <div key={key} className="space-y-1">
                            <span className="text-xs font-semibold text-muted-foreground capitalize">
                              {key.replace(/_/g, ' ')}:
                            </span>
                            {isArray ? (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {(val as string[]).map((v, i) => (
                                  <span
                                    key={i}
                                    className="rounded bg-muted px-2 py-0.5 text-xs font-medium"
                                  >
                                    {v}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="rounded-md bg-muted/40 p-2.5 text-xs leading-relaxed text-foreground whitespace-pre-line">
                                {String(val)}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-3 bg-muted/20 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {activeTab === 'nivel1' ? 'Documento 1 de 2' : 'Documento 2 de 2'} · OVA Gestión de
            Proyectos de Tecnología
          </p>
          <Button onClick={onClose}>Cerrar Bitácora</Button>
        </div>
      </div>
    </div>
  )
}
