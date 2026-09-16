import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare, hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import authConfig from '@/auth.config'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/auth'

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: SESSION_MAX_AGE_SECONDS },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null

        const passwordValid = await compare(password, user.passwordHash)
        if (!passwordValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      if (!user.id) return

      await prisma.session.deleteMany({
        where: { userId: user.id, expires: { lt: new Date() } },
      })

      await prisma.session.create({
        data: {
          sessionToken: randomUUID(),
          userId: user.id,
          expires: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
        },
      })
    },
    async signOut(message) {
      const userId =
        'token' in message && message.token?.sub
          ? message.token.sub
          : 'session' in message
            ? message.session?.userId
            : undefined

      if (userId) {
        await prisma.session.deleteMany({ where: { userId } })
      }
    },
  },
})

export async function hashPassword(password: string) {
  return hash(password, 12)
}
