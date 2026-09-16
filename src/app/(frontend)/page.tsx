import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function HomePage() {
  const session = await auth()
  const user = session?.user

  // Si no está autenticado, redirige directamente al inicio de sesión
  if (!user) {
    redirect('/login')
  }

  // Si es docente, va a su panel de gestión
  if (user.role === 'TEACHER') {
    redirect('/dashboard')
  }

  // Si es estudiante, entra directo a su curso
  redirect('/course/ia-gestion-proyectos')
}