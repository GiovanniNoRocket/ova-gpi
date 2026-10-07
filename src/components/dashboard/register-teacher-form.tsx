'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { registerTeacherAction, type RegisterTeacherActionState } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerTeacherSchema, type RegisterTeacherInput } from '@/lib/validations/auth'

const initialState: RegisterTeacherActionState = {}

export function RegisterTeacherForm() {
  const [state, formAction] = useActionState(registerTeacherAction, initialState)
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterTeacherInput>({
    resolver: zodResolver(registerTeacherSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (state.success) {
      form.reset()
    }
  }, [state.success, form])

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData()
    formData.set('name', data.name)
    formData.set('email', data.email)
    formData.set('password', data.password)
    formData.set('confirmPassword', data.confirmPassword)
    startTransition(() => formAction(formData))
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-bold">Registrar docente</CardTitle>
        <CardDescription className="text-xs">
          Crea una nueva cuenta de profesor con permisos para gestionar cursos y estudiantes.
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
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="Prof. Nombre y Apellido" {...field} />
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
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="docente@unicartagena.edu.co"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Mínimo 8 caracteres"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Repite la contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {state.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}
            {state.success && (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {state.success}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creando cuenta docente…' : 'Registrar docente'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
