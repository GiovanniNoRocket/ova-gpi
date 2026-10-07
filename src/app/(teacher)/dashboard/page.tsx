import Image from 'next/image'
import Link from 'next/link'
import config from '@payload-config'
import { getPayload } from 'payload'
import {
  Award,
  BookOpen,
  Calendar,
  Flame,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react'

import { logoutAction } from '@/app/actions/auth'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminFormsTabs } from '@/components/dashboard/admin-forms-tabs'
import { RegisterStudentForm } from '@/components/dashboard/register-student-form'
import { prisma } from '@/lib/prisma'

function getInitials(name?: string | null, email?: string | null) {
  if (name) {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  return (email?.[0] || 'E').toUpperCase()
}

export default async function DashboardPage() {
  const session = await auth()
  const isAdmin = session?.user?.role === 'ADMIN'

  const payload = await getPayload({ config })
  const courseResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: 'ia-gestion-proyectos' } },
    depth: 0,
    limit: 1,
  })
  const course = courseResult.docs[0]

  let totalBlocks = 0
  const validBlockIds = new Set<string>()

  if (course) {
    const modulesResult = await payload.find({
      collection: 'modules',
      where: { course: { equals: course.id } },
      depth: 0,
      limit: 100,
    })
    const moduleIds = modulesResult.docs.map((m) => m.id)
    if (moduleIds.length > 0) {
      const blocksResult = await payload.find({
        collection: 'blocks',
        where: { module: { in: moduleIds } },
        depth: 0,
        limit: 1000,
        pagination: false,
      })
      totalBlocks = blocksResult.docs.length
      for (const block of blocksResult.docs) {
        validBlockIds.add(String(block.id))
      }
    }
  }

  const [students, teachers] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        gamification: {
          select: {
            points: true,
            level: true,
            streak: true,
          },
        },
        progress: {
          where: { status: 'COMPLETED' },
          select: {
            blockId: true,
            completedAt: true,
          },
        },
        achievements: {
          select: {
            achievementId: true,
          },
        },
      },
    }),
    isAdmin
      ? prisma.user.findMany({
          where: { role: 'TEACHER' },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        })
      : Promise.resolve([]),
  ])

  const getCompletedCount = (progressList: { blockId: string }[]) =>
    progressList.filter((p) => validBlockIds.has(p.blockId)).length

  const totalStudents = students.length
  const activeStudents = students.filter((s) => getCompletedCount(s.progress) > 0).length
  const totalAchievements = students.reduce((acc, s) => acc + s.achievements.length, 0)
  const avgPoints =
    totalStudents > 0
      ? Math.round(
          students.reduce((acc, s) => acc + (s.gamification?.points || 0), 0) / totalStudents,
        )
      : 0
  const avgProgress =
    totalStudents > 0 && totalBlocks > 0
      ? Math.round(
          students.reduce(
            (acc, s) =>
              acc +
              Math.min(
                100,
                Math.round((getCompletedCount(s.progress) / totalBlocks) * 100),
              ),
            0,
          ) / totalStudents,
        )
      : 0

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-6 md:p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/images/logo/logo-unicaragena.svg"
              alt="Universidad de Cartagena"
              width={160}
              height={70}
              priority
              className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
            />
            {isAdmin ? (
              <span className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Panel Administrador
              </span>
            ) : (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                Panel Docente
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Hola, {session?.user?.name || (isAdmin ? 'Administrador' : 'Docente')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? 'Panel de Administración · Gestiona docentes, estudiantes y monitorea el avance del curso.'
              : 'Panel del Docente · Gestiona a tus estudiantes y monitorea su avance en tiempo real.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="default" className="gap-2">
            <Link href="/course/ia-gestion-proyectos">
              <BookOpen className="h-4 w-4" />
              Ver curso
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/admin">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Editor CMS
            </Link>
          </Button>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isAdmin ? (
          <Card className="border-l-4 border-l-violet-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Docentes
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {teachers.length === 1 ? 'docente registrado' : 'docentes registrados'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estudiantes
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeStudents} {activeStudents === 1 ? 'estudiante activo' : 'estudiantes activos'}
              </p>
            </CardContent>
          </Card>
        )}

        {isAdmin ? (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estudiantes
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeStudents} {activeStudents === 1 ? 'estudiante activo' : 'estudiantes activos'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avance Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgProgress}%</div>
              <p className="mt-1 text-xs text-muted-foreground">
                del total de {totalBlocks} lecciones
              </p>
            </CardContent>
          </Card>
        )}

        {isAdmin ? (
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avance Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgProgress}%</div>
              <p className="mt-1 text-xs text-muted-foreground">
                del total de {totalBlocks} lecciones
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Puntos Promedio
              </CardTitle>
              <Trophy className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgPoints} pts</div>
              <p className="mt-1 text-xs text-muted-foreground">por estudiante registrado</p>
            </CardContent>
          </Card>
        )}

        <Card className="border-l-4 border-l-violet-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Logros Obtenidos
            </CardTitle>
            <Award className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAchievements}</div>
            <p className="mt-1 text-xs text-muted-foreground">insignias desbloqueadas en total</p>
          </CardContent>
        </Card>
      </section>

      {/* Main Split: Forms & Lists */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Registration Form / Tabs (4 cols) */}
        <div className="lg:col-span-4">
          {isAdmin ? <AdminFormsTabs /> : <RegisterStudentForm />}
        </div>

        {/* Rosters (8 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-8">
          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Cuerpo Docente Registrado
                    </CardTitle>
                    <CardDescription>
                      Profesores habilitados para gestionar estudiantes y evaluar el curso.
                    </CardDescription>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {teachers.length} {teachers.length === 1 ? 'docente' : 'docentes'}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                {teachers.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    <GraduationCap className="mx-auto mb-2 h-8 w-8 opacity-40" />
                    No hay docentes registrados todavía. Utiliza el formulario para dar de alta al primero.
                  </div>
                ) : (
                  <div className="divide-y">
                    {teachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center justify-between py-3.5 transition-colors hover:bg-muted/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-700 dark:text-violet-300">
                            {getInitials(teacher.name, teacher.email)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm leading-tight">
                              {teacher.name || 'Sin nombre'}
                            </p>
                            <p className="text-xs text-muted-foreground">{teacher.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(teacher.createdAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Progreso de Estudiantes</CardTitle>
                  <CardDescription>
                    Monitorea el avance de cada alumno en el curso activo.
                  </CardDescription>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {students.length} {students.length === 1 ? 'alumno' : 'alumnos'}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              {students.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  <Users className="mx-auto mb-3 h-8 w-8 opacity-40" />
                  Todavía no has registrado estudiantes. Usa el formulario para dar de alta al
                  primero.
                </div>
              ) : (
                <div className="divide-y">
                  {students.map((student) => {
                    const completed = getCompletedCount(student.progress)
                    const percent =
                      totalBlocks > 0 ? Math.min(100, Math.round((completed / totalBlocks) * 100)) : 0
                    const isFullyCompleted = totalBlocks > 0 && completed >= totalBlocks
                    const points = student.gamification?.points ?? 0
                    const level = student.gamification?.level ?? 1
                    const streak = student.gamification?.streak ?? 0

                    return (
                      <div
                        key={student.id}
                        className="flex flex-col gap-3 py-4 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between"
                      >
                        {/* Student info */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {getInitials(student.name, student.email)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm leading-tight">
                              {student.name || 'Sin nombre'}
                            </p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              Registrado{' '}
                              {new Date(student.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Gamification & Progress details */}
                        <div className="flex flex-col gap-2 sm:w-64">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-muted-foreground">
                              {completed}/{totalBlocks} lecciones
                            </span>
                            <span
                              className={
                                isFullyCompleted
                                  ? 'font-bold text-emerald-600 dark:text-emerald-400'
                                  : 'font-semibold text-foreground'
                              }
                            >
                              {percent}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={
                                isFullyCompleted
                                  ? 'h-full rounded-full bg-emerald-500 transition-all'
                                  : 'h-full rounded-full bg-primary transition-all'
                              }
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          {/* Badges: Level, Points, Streak, Achievements */}
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            <span className="inline-flex items-center gap-1 rounded bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
                              <Star className="h-3 w-3" />
                              Nivel {level}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                              <Trophy className="h-3 w-3" />
                              {points} pts
                            </span>
                            {streak > 0 && (
                              <span className="inline-flex items-center gap-1 rounded bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700 dark:text-orange-300">
                                <Flame className="h-3 w-3" />
                                {streak}
                              </span>
                            )}
                            {student.achievements.length > 0 && (
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                                <Award className="h-3 w-3" />
                                {student.achievements.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
