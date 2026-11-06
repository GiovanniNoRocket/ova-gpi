import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { parseBlockData, type BlockType } from '../../src/types/content-blocks.ts'
import { MODULE_INTROS } from './module-intros.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Permite apuntar a una copia del seed (p. ej. para pruebas) con SEED_FILE_PATH=...
export const SEED_FILE_PATH =
  process.env.SEED_FILE_PATH ?? path.join(__dirname, '../../content/seeds/ia-gestion-proyectos.json')

export const COURSE = {
  title: 'Fundamentos de Gestión de Proyectos e Inteligencia Artificial',
  slug: 'ia-gestion-proyectos',
  description:
    'Curso Completo (Niveles 1 a 5) · Integración de la Inteligencia Artificial Generativa en la Gestión de Proyectos Informáticos (PMBOK® 8va Edición, Formulación, Ejecución, Laboratorio de Prompts y Gobernanza de IA).',
}

export type BlockSeed = {
  type: BlockType
  order: number
  blockData: Record<string, unknown>
}

export type IntroBlockSeed = Omit<BlockSeed, 'order'>

export type ModuleSeed = {
  title: string
  order: number
  level: number
  levelTitle: string
  blocks: BlockSeed[]
}

type CourseSeed = {
  course: typeof COURSE
  modules: ModuleSeed[]
}

/**
 * Construye un módulo anteponiendo sus bloques de introducción (MODULE_INTROS)
 * y renumerando `order` de forma consecutiva (1..n) según la posición en el array.
 * Los valores `order` escritos en los generadores se ignoran.
 */
export function buildModule(meta: Omit<ModuleSeed, 'blocks'>, blocks: BlockSeed[]): ModuleSeed {
  const intro = MODULE_INTROS[meta.order] ?? []
  const all = [...intro, ...blocks]
  return {
    ...meta,
    blocks: all.map((b, i) => ({ type: b.type, order: i + 1, blockData: b.blockData })),
  }
}

/**
 * Fusiona los módulos generados con el seed existente: reemplaza solo los módulos
 * con el mismo `order`, conserva el resto intacto, ordena por `order` y valida todo.
 */
export async function mergeModulesIntoSeed(generated: ModuleSeed[], label: string) {
  console.log(`Reading course seed from ${SEED_FILE_PATH}...`)
  const currentSeed: CourseSeed = existsSync(SEED_FILE_PATH)
    ? JSON.parse(await readFile(SEED_FILE_PATH, 'utf-8'))
    : { course: COURSE, modules: [] }

  const generatedOrders = new Set(generated.map((m) => m.order))
  if (generatedOrders.size !== generated.length) {
    throw new Error(`${label}: hay módulos generados con el mismo order`)
  }

  const preserved = currentSeed.modules.filter((m) => !generatedOrders.has(m.order))
  const allModules = [...preserved, ...generated].sort((a, b) => a.order - b.order)

  console.log(`Validating all blocks across ${allModules.length} modules with Zod...`)
  let totalBlocks = 0
  for (const mod of allModules) {
    const orders = new Set<number>()
    for (const b of mod.blocks) {
      if (orders.has(b.order)) {
        throw new Error(`Módulo ${mod.order}: order de bloque duplicado (${b.order})`)
      }
      orders.add(b.order)
      parseBlockData(b.type, b.blockData)
      totalBlocks++
    }
  }
  console.log(`✓ All ${totalBlocks} blocks validated successfully against Zod schemas!`)

  const updated: CourseSeed = { course: COURSE, modules: allModules }
  await writeFile(SEED_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8')
  console.log(`✓ Successfully updated ${SEED_FILE_PATH} with ${label}!`)
}
