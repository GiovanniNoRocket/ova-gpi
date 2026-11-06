'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export type Flashcard = { id: string; kind: 'concept' | 'question'; front: string; back: string }

export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (cards.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Todavía no hay tarjetas de repaso. Avanza en las lecciones y responde las preguntas para generarlas.
      </p>
    )
  }

  const card = cards[index]

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(cards.length - 1, next)))
    setFlipped(false)
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-bold tracking-tight">Tarjetas de repaso</h2>
        <p className="text-sm text-muted-foreground">
          Repasa los conceptos clave y las preguntas que ya respondiste. Toca la tarjeta para ver la respuesta.
        </p>
      </div>

      <div className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Tarjeta {index + 1} de {cards.length}
      </div>

      <Card
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-64 cursor-pointer items-center justify-center p-8 text-center transition-colors hover:bg-muted/30"
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 p-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {card.kind === 'question'
              ? flipped
                ? 'Respuesta'
                : 'Pregunta'
              : flipped
                ? 'Repaso'
                : 'Concepto'}
          </span>
          <p className="whitespace-pre-line text-lg font-medium leading-relaxed">
            {flipped ? card.back : card.front}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
          <RotateCw className="mr-1 h-4 w-4" />
          Voltear
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Anterior
        </Button>
        <Button onClick={() => goTo(index + 1)} disabled={index === cards.length - 1}>
          Siguiente
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
