import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function HomePage() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/login')
  }

  if (user.role === 'TEACHER' || user.role === 'ADMIN') {
    redirect('/dashboard')
  }

  redirect('/course/ia-gestion-proyectos')
}