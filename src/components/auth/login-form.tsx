'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useActionState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { loginAction, type AuthActionState } from '@/app/actions/auth'
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
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

const initialState: AuthActionState = {}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData()
    formData.set('email', data.email)
    formData.set('password', data.password)
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
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Fundamentos de Gestión de Proyectos e IA · Universidad de Cartagena
          </CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {state.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}
            {state.fieldErrors?.email && (
              <p className="text-sm font-medium text-destructive">{state.fieldErrors.email[0]}</p>
            )}
            {state.fieldErrors?.password && (
              <p className="text-sm font-medium text-destructive">
                {state.fieldErrors.password[0]}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          El acceso y la creación de cuentas son gestionados institucionalmente por la administración.
        </p>
      </CardContent>
    </Card>
    </div>
  )
}
