import type { CollectionConfig } from 'payload'

import type { BlockType } from '../types/content-blocks'

const blockTypes: BlockType[] = [
  'TEXT',
  'VIDEO',
  'QUIZ',
  'SCENARIO',
  'CHECKPOINT',
  'CLASSIFICATION',
  'SURVEY',
  'PROJECT_STEP',
  'AI_PROMPT_LAB',
  'MINIGAME',
  'EXAM',
]

const blockTypeOptions = blockTypes.map((value) => ({
  label: value.charAt(0) + value.slice(1).toLowerCase().replace('_', ' '),
  value,
}))

export const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'type',
    defaultColumns: ['type', 'order', 'module', 'updatedAt'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: blockTypeOptions,
    },
    {
      name: 'blockData',
      type: 'json',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
      index: true,
    },
  ],
}
