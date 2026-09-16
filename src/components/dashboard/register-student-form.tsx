'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { registerStudentAction, type RegisterStudentActionState } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerStudentSchema, type RegisterStudentInput } from '@/lib/validations/auth'

const initialState: RegisterStudentActionState = {}

export function RegisterStudentForm() {
  const [state, formAction] = useActionState(registerStudentAction, initialState)
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterStudentInput>({
    resolver: zodResolver(registerStudentSchema),
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registrar estudiante</CardTitle>
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
                    <Input autoComplete="name" placeholder="Nombre del estudiante" {...field} />
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
                      placeholder="estudiante@email.com"
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
            {state.success && (
              <p className="text-sm font-medium text-emerald-600">{state.success}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creando cuenta…' : 'Registrar estudiante'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
