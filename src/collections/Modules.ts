import type { CollectionConfig } from 'payload'

export const Modules: CollectionConfig = {
  slug: 'modules',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'course', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'level',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 5,
      admin: {
        description: 'Nivel del curso (1 al 5)',
      },
    },
    {
      name: 'levelTitle',
      type: 'text',
      admin: {
        description: 'Título del nivel (ej. Nivel 1: Comprensión del proyecto tecnológico)',
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      index: true,
    },
  ],
}
