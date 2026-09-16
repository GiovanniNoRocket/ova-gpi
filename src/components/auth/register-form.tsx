'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { registerAction, type AuthActionState } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'

const initialState: AuthActionState = {}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState)
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData()
    formData.set('name', data.name)
    formData.set('email', data.email)
    formData.set('password', data.password)
    formData.set('confirmPassword', data.confirmPassword)
    startTransition(() => formAction(formData))
  })

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-6 flex flex-col items-center gap-2">
        <Image
          src="/images/logo/logo-unicaragena.svg"
          alt="Universidad de Cartagena"
          width={220}
          height={98}
          priority
          className="h-14 w-auto object-contain dark:brightness-0 dark:invert"
        />
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Objeto Virtual de Aprendizaje (OVA)
        </p>
      </div>

      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-xl">
        <CardHeader>
          <CardTitle>Crear cuenta docente</CardTitle>
          <CardDescription>
            Regístrate como profesor para gestionar módulos y dar seguimiento a los estudiantes.
          </CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creando cuenta…' : 'Registrarse'}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
    </div>
  )
}
