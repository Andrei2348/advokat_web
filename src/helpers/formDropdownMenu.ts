import { OptionsItem } from '@/types/events'

const generateObjects = (count: number) => [
  { id: 1, name: 'Не уведомлять' },
  ...Array.from({ length: count }, (_, i) => ({
    id: i + 2,
    name: (i + 1).toString(),
  })),
]

export const hoursOptions: OptionsItem[] = generateObjects(24)
export const daysOptions: OptionsItem[] = generateObjects(31)
