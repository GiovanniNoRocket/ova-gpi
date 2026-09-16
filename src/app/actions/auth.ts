'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

import { hashPassword, signIn, signOut, auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  loginSchema,
  registerSchema,
  registerStudentSchema,
  type RegisterInput,
  type RegisterStudentInput,
} from '@/lib/validations/auth'

const DEFAULT_COURSE_SLUG = 'ia-gestion-proyectos'

export type AuthActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

export type RegisterStudentActionState = AuthActionState & {
  success?: string
}

function getRoleRedirect(role: 'STUDENT' | 'TEACHER') {
  return role === 'TEACHER' ? '/dashboard' : '/course/ia-gestion-proyectos'
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    const result = await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })

    if (result?.error) {
      return { error: 'Email o contraseña incorrectos' }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Email o contraseña incorrectos' }
    }
    throw error
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { role: true },
  })

  if (!user) {
    return { error: 'Email o contraseña incorrectos' }
  }

  redirect(getRoleRedirect(user.role))
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const raw: RegisterInput = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })
  if (existing) {
    return { error: 'Ya existe una cuenta con este email' }
  }

  const passwordHash = await hashPassword(parsed.data.password)

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: 'TEACHER',
    },
    select: { role: true },
  })

  try {
    const result = await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })

    if (result?.error) {
      return { error: 'Cuenta creada, pero no se pudo iniciar sesión. Intenta en /login.' }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Cuenta creada, pero no se pudo iniciar sesión. Intenta en /login.' }
    }
    throw error
  }

  redirect(getRoleRedirect(user.role))
}

export async function registerStudentAction(
  _prevState: RegisterStudentActionState,
  formData: FormData,
): Promise<RegisterStudentActionState> {
  const session = await auth()
  if (session?.user?.role !== 'TEACHER') {
    return { error: 'No autorizado' }
  }

  const raw: RegisterStudentInput = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const parsed = registerStudentSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })
  if (existing) {
    return { error: 'Ya existe una cuenta con este email' }
  }

  const passwordHash = await hashPassword(parsed.data.password)

  const student = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: 'STUDENT',
    },
  })

  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseSlug: DEFAULT_COURSE_SLUG,
      status: 'ACTIVE',
    },
  })

  await prisma.gamificationState.create({
    data: { userId: student.id },
  })

  revalidatePath('/dashboard')

  return { success: `Cuenta creada para ${student.email}` }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' })
}
