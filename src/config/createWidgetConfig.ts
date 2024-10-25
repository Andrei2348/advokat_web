import { MenuItemDropdown } from '@/types/createWidget'

export const menuItems: MenuItemDropdown[] = [
  {
    id: 1,
    title: 'Клиента',
    color: '',
    routes: ['clients-table'],
    function: 'createClient',
  },
  {
    id: 2,
    title: 'Дело',
    color: '',
    routes: ['home', 'client-details'],
    function: 'createLawsuit',
  },
  {
    id: 3,
    title: 'Событие',
    color: '',
    routes: ['lawsuit-details', 'client-details', 'calendar'],
    function: '',
  },
  {
    id: 4,
    title: 'Задачу',
    color: '',
    routes: ['lawsuit-details', 'client-details', 'tasks'],
    function: 'createTask',
  },
  {
    id: 5,
    title: 'Заметку',
    color: '',
    routes: ['notes'],
    function: '',
  },
  {
    id: 6,
    title: 'Транзакцию',
    color: '',
    routes: ['finance'],
    function: '',
  },
]
