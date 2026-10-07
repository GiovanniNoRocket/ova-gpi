'use client'

import { useState } from 'react'
import { GraduationCap, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { RegisterStudentForm } from '@/components/dashboard/register-student-form'
import { RegisterTeacherForm } from '@/components/dashboard/register-teacher-form'

export function AdminFormsTabs() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-lg bg-muted p-1">
        <Button
          type="button"
          variant={activeTab === 'teacher' ? 'default' : 'ghost'}
          size="sm"
          className="flex-1 gap-2 text-xs font-semibold"
          onClick={() => setActiveTab('teacher')}
        >
          <GraduationCap className="h-4 w-4" />
          Registrar Docente
        </Button>
        <Button
          type="button"
          variant={activeTab === 'student' ? 'default' : 'ghost'}
          size="sm"
          className="flex-1 gap-2 text-xs font-semibold"
          onClick={() => setActiveTab('student')}
        >
          <UserPlus className="h-4 w-4" />
          Registrar Estudiante
        </Button>
      </div>

      {activeTab === 'teacher' ? <RegisterTeacherForm /> : <RegisterStudentForm />}
    </div>
  )
}
