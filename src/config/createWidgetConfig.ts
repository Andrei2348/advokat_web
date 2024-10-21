import { MenuItemDropdown } from '@/types/createWidget'

export const menuItems: MenuItemDropdown[] = [
  {
    id: 1,
    title: 'Клиента',
    color: '',
    routes: [
      {
        name: 'clients',
        options: {
          inTable: true,
        },
      },
    ],
    function: 'createClient',
  },
  {
    id: 2,
    title: 'Дело',
    color: '',
    routes: [
      { name: 'home' },
      {
        name: 'clients',
        options: {
          inTable: false,
        },
      },
    ],
    function: 'createLawsuit',
  },
  {
    id: 3,
    title: 'Событие',
    color: '',
    routes: [
      { name: 'lawsuit-details' },
      {
        name: 'clients',
        options: {
          inTable: false,
        },
      },
      { name: 'calendar' },
    ],
    function: '',
  },
  {
    id: 4,
    title: 'Задачу',
    color: '',
    routes: [
      { name: 'lawsuit-details' },
      {
        name: 'clients',
        options: {
          inTable: false,
        },
      },
      { name: 'tasks' },
    ],
    function: 'createTask',
  },
  {
    id: 5,
    title: 'Заметку',
    color: '',
    routes: [{ name: 'notes' }],
    function: '',
  },
  {
    id: 6,
    title: 'Транзакцию',
    color: '',
    routes: [{ name: 'finance' }],
    function: '',
  },
]
