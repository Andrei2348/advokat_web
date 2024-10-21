import { CustomerTableHeaderItem } from '@/types/customers'

export const clientTableHeaderItems: CustomerTableHeaderItem[] = [
  {
    id: 1,
    title: 'Клиент',
    column: 'name',
    willBeSorting: true,
  },
  {
    id: 2,
    title: 'Дело',
    column: 'lawsuit',
    willBeSorting: true,
  },
  {
    id: 3,
    title: 'Последняя активность',
    column: 'lastActiveAt',
    willBeSorting: true,
  },
  {
    id: 4,
    title: 'Телефон',
    willBeSorting: false,
  },
  {
    id: 5,
    title: 'E-mail',
    willBeSorting: false,
  },
]

export const clientLawsuitsTableConfig = [
  'Дело',
  'Дата/Время',
  'Категория дела',
  'Гонорар, руб',
  'Статус',
]
