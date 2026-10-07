import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { hash } from 'bcryptjs'

import { enableNonInteractiveMode } from '../scripts/non-interactive.ts'
import { prisma } from '../src/lib/prisma'
import { blockTypeSchema, parseBlockData } from '../src/types/content-blocks'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COURSE_SEED_PATH = path.join(
  __dirname,
  '../content/seeds/ia-gestion-proyectos.json',
)

const PASSWORD = 'password123'

type SeedBlock = {
  type: string
  order: number
  blockData: unknown
}

type SeedModule = {
  title: string
  order: number
  level?: number
  levelTitle?: string
  blocks: SeedBlock[]
}

type CourseSeed = {
  course: {
    title: string
    slug: string
    description: string
  }
  modules: SeedModule[]
}

async function seedPrismaUsers(courseSlug: string) {
  const passwordHash = await hash(PASSWORD, 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ova.test' },
    update: {
      name: 'Administrador OVA',
      role: 'ADMIN',
      passwordHash,
    },
    create: {
      email: 'admin@ova.test',
      name: 'Administrador OVA',
      role: 'ADMIN',
      passwordHash,
    },
  })

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@ova.test' },
    update: {
      name: 'Profesor OVA',
      role: 'TEACHER',
      passwordHash,
    },
    create: {
      email: 'teacher@ova.test',
      name: 'Profesor OVA',
      role: 'TEACHER',
      passwordHash,
    },
  })

  const students = await Promise.all(
    [
      { email: 'student1@ova.test', name: 'Ana Estudiante' },
      { email: 'student2@ova.test', name: 'Bruno Estudiante' },
      { email: 'student3@ova.test', name: 'Carla Estudiante' },
    ].map((student) =>
      prisma.user.upsert({
        where: { email: student.email },
        update: {
          name: student.name,
          role: 'STUDENT',
          passwordHash,
        },
        create: {
          email: student.email,
          name: student.name,
          role: 'STUDENT',
          passwordHash,
        },
      }),
    ),
  )

  const achievementsList = [
    {
      key: 'first-module',
      title: 'Primer módulo completado',
      description: 'Completaste tu primer módulo en un curso OVA.',
      icon: 'trophy',
      points: 50,
    },
    {
      key: 'course-complete',
      title: 'Curso completado',
      description: 'Finalizaste todos los módulos de un curso.',
      icon: 'star',
      points: 200,
    },
    {
      key: 'explorador-ova',
      title: 'Explorador del OVA',
      description: 'Completaste la orientación, diagnóstico y selección del reto integrador (Módulo 1).',
      icon: 'compass',
      points: 100,
    },
    {
      key: 'arquitecto-proyecto',
      title: 'Arquitecto del Proyecto',
      description: 'Definiste producto, servicio, resultado, valor y contexto organizacional (Módulo 2).',
      icon: 'layers',
      points: 250,
    },
    {
      key: 'arquitecto-tic',
      title: 'Arquitecto de Soluciones TIC',
      description: 'Clasificaste proyectos TIC, programas, portafolios y el rol de la PMO (Módulo 3).',
      icon: 'cpu',
      points: 300,
    },
    {
      key: 'estratega-proyecto',
      title: 'Estratega del Proyecto',
      description: 'Elegiste el ciclo de vida, enfoque predictivo/ágil/híbrido y dominios PMBOK (Módulo 4).',
      icon: 'sparkles',
      points: 350,
    },
    {
      key: 'detector-ia',
      title: 'Detector de IA',
      description: 'Superaste el minijuego de detección de alucinaciones y justificación crítica de IA.',
      icon: 'shield',
      points: 50,
    },
    {
      key: 'auditor-ia',
      title: 'Auditor de IA',
      description: 'Encontraste los 5 fallos críticos en la auditoría del informe simulado de ERP.',
      icon: 'award',
      points: 125,
    },
    {
      key: 'supervisor-ia',
      title: 'Supervisor de IA',
      description: 'Dominaste los fundamentos, riesgos y supervisión responsable de IA en proyectos (Módulo 5).',
      icon: 'bot',
      points: 400,
    },
    {
      key: 'graduado-nivel-1',
      title: 'Especialista Nivel 1',
      description: 'Aprobaste la Evaluación Final de 25 preguntas del Nivel 1 (Comprensión TIC).',
      icon: 'graduation-cap',
      points: 500,
    },
    {
      key: 'formulador-proyectos',
      title: 'Formulador de Proyectos',
      description: 'Formulaste problema, árbol causal, objetivos y viabilidad 5D con IA (Módulo 6).',
      icon: 'target',
      points: 100,
    },
    {
      key: 'arquitecto-alcance',
      title: 'Arquitecto del Alcance',
      description: 'Estructuraste interesados, matriz poder/interés, requisitos MoSCoW y EDT (Módulo 7).',
      icon: 'git-branch',
      points: 100,
    },
    {
      key: 'planificador-costos',
      title: 'Estratega de Cronograma y Costos',
      description: 'Construiste ruta crítica, diagrama de Gantt, matriz de recursos y presupuesto (Módulo 8).',
      icon: 'calendar',
      points: 100,
    },
    {
      key: 'graduado-nivel-2',
      title: 'Especialista Nivel 2',
      description: 'Completaste con éxito la fase de Formulación y Planeación del proyecto tecnológico.',
      icon: 'award',
      points: 300,
    },
    {
      key: 'lider-ejecucion',
      title: 'Líder de la Ejecución',
      description: 'Superaste la Simulación de Ejecución y dominaste el liderazgo, coordinación y calidad en proyectos TIC (Módulo 10).',
      icon: 'award',
      points: 100,
    },
    {
      key: 'graduado-nivel-3',
      title: 'Especialista Nivel 3',
      description: 'Completaste con éxito la fase de Ejecución, Seguimiento y Cierre del proyecto tecnológico.',
      icon: 'graduation-cap',
      points: 500,
    },
    {
      key: 'arquitecto-instrucciones',
      title: 'Arquitecto de Instrucciones',
      description: 'Diseñaste, estructuraste, evaluaste y refinaste instrucciones de IA generativa para proyectos TIC (Módulo 13).',
      icon: 'cpu',
      points: 100,
    },
    {
      key: 'arquitecto-aplicaciones-ia',
      title: 'Arquitecto de Aplicaciones de IA',
      description: 'Superaste los cuatro laboratorios prácticos del proyecto SIGA-TI y construiste el Portafolio de aplicaciones validadas (Módulo 14).',
      icon: 'bot',
      points: 100,
    },
    {
      key: 'graduado-nivel-4',
      title: 'Especialista Nivel 4',
      description: 'Aprobaste la Evaluación Final de 25 preguntas del Nivel 4 (IA Generativa Aplicada).',
      icon: 'graduation-cap',
      points: 500,
    },
    {
      key: 'arquitecto-gobernanza-ia',
      title: 'Arquitecto de Gobernanza de IA',
      description: 'Dominaste los marcos éticos, regulatorios (Ley 1581, AI Act, CONPES 4144) y estándares de gobernanza (ISO 42001, NIST AI RMF) (Módulo 15).',
      icon: 'shield',
      points: 100,
    },
    {
      key: 'graduado-ova-master',
      title: 'Graduado Maestro del OVA',
      description: 'Completaste los 5 niveles del curso y diseñaste el Proyecto TIC Integral con IA Responsable y Gobernanza.',
      icon: 'star',
      points: 1000,
    },
  ]

  const achievements = []
  for (const ach of achievementsList) {
    const record = await prisma.achievement.upsert({
      where: { key: ach.key },
      update: {
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        points: ach.points,
      },
      create: ach,
    })
    achievements.push(record)
  }

  for (const student of students) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseSlug: {
          userId: student.id,
          courseSlug,
        },
      },
      update: { status: 'ACTIVE' },
      create: {
        userId: student.id,
        courseSlug,
        status: 'ACTIVE',
      },
    })

    await prisma.gamificationState.upsert({
      where: { userId: student.id },
      update: {},
      create: {
        userId: student.id,
        points: 0,
        level: 1,
        streak: 0,
      },
    })
  }

  await prisma.gamificationState.upsert({
    where: { userId: teacher.id },
    update: {},
    create: {
      userId: teacher.id,
      points: 0,
      level: 1,
      streak: 0,
    },
  })

  console.log(
    `Prisma: ${1 + students.length} users, ${students.length} enrollments, ${achievements.length} achievements`,
  )

  return { teacher, students }
}

async function seedPayloadAdmin(payload: Awaited<ReturnType<typeof import('payload').getPayload>>) {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@ova.test' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: {
        password: PASSWORD,
        name: 'Admin OVA',
      },
      overrideAccess: true,
    })
    console.log('Payload: admin password synced (admin@ova.test)')
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@ova.test',
      password: PASSWORD,
      name: 'Admin OVA',
    },
    overrideAccess: true,
  })

  console.log('Payload: admin user created (admin@ova.test)')
}

async function seedPayloadCourse(seed: CourseSeed) {
  enableNonInteractiveMode()

  const { getPayload } = await import('payload')
  const config = (await import('../payload.config.js')).default
  const payload = await getPayload({ config })

  await seedPayloadAdmin(payload)

  const existing = await payload.find({
    collection: 'courses',
    where: { slug: { equals: seed.course.slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`Payload: course "${seed.course.slug}" exists — deleting old modules and blocks to update...`)
    await prisma.userProgress.deleteMany({
      where: { courseSlug: seed.course.slug },
    })
    const oldModules = await payload.find({
      collection: 'modules',
      where: { course: { equals: existing.docs[0].id } },
      limit: 100,
    })
    for (const mod of oldModules.docs) {
      await payload.delete({
        collection: 'blocks',
        where: { module: { equals: mod.id } },
      })
      await payload.delete({
        collection: 'modules',
        id: mod.id,
      })
    }
    await payload.delete({
      collection: 'courses',
      id: existing.docs[0].id,
    })
  }

  const course = await payload.create({
    collection: 'courses',
    data: {
      title: seed.course.title,
      slug: seed.course.slug,
      description: seed.course.description,
    },
    overrideAccess: true,
  })

  let blockCount = 0

  for (const moduleSeed of seed.modules) {
    const moduleDoc = await payload.create({
      collection: 'modules',
      data: {
        title: moduleSeed.title,
        order: moduleSeed.order,
        level: moduleSeed.level ?? 1,
        levelTitle: moduleSeed.levelTitle ?? 'Nivel 1: Comprensión del proyecto tecnológico',
        course: course.id,
      },
      overrideAccess: true,
    })

    for (const blockSeed of moduleSeed.blocks) {
      const type = blockTypeSchema.parse(blockSeed.type)
      const blockData = parseBlockData(type, blockSeed.blockData)

      await payload.create({
        collection: 'blocks',
        data: {
          type,
          order: blockSeed.order,
          blockData,
          module: moduleDoc.id,
        },
        overrideAccess: true,
      })
      blockCount++
    }
  }

  console.log(
    `Payload: course "${seed.course.slug}" — ${seed.modules.length} modules, ${blockCount} blocks`,
  )

  await payload.db?.destroy?.()
}

async function main() {
  const raw = await readFile(COURSE_SEED_PATH, 'utf-8')
  const seed = JSON.parse(raw) as CourseSeed

  await seedPrismaUsers(seed.course.slug)
  await seedPayloadCourse(seed)

  console.log('Seed completed successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
