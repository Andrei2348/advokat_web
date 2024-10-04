import { AsideMenu } from '@/types/aside'

export const menuItemsUser: AsideMenu[] = [
  {
    id: 1,
    title: 'Дела',
    icon: 'file',
    route: '/',
  },
  {
    id: 2,
    title: 'Календарь',
    icon: 'calendar',
    route: '/calendar',
  },
  {
    id: 3,
    title: 'Задачи',
    icon: 'check-done',
    route: '/tasks',
  },
  {
    id: 4,
    title: 'Быстрые заметки',
    icon: 'sticker',
    route: '/notes',
  },
  {
    id: 5,
    title: 'Клиенты',
    icon: 'user',
    route: '/clients',
  },
  {
    id: 6,
    title: 'Финансы',
    icon: 'coins',
    route: '/finance',
  },
  {
    id: 7,
    title: 'Настройки',
    icon: 'settings',
    route: '/settings',
  },
]

export const menuItemsAdmin: AsideMenu[] = [
  {
    id: 1,
    title: 'Тарифы',
    icon: 'file',
    route: '/settings',
  },
  {
    id: 2,
    title: 'Адвокаты',
    icon: 'user',
    route: '/settings',
  },
  {
    id: 3,
    title: 'Финансы',
    icon: 'coins',
    route: '/settings',
  },
]
