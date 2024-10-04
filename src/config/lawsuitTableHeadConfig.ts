import { MenuItemDropdown } from '@/types/createWidget'
import { tableItems, LawsuitFormObject } from '@/types/lawsuit'

export const lawsuitItems: tableItems[] = [
  {
    id: 1,
    title: 'Клиент',
  },
  {
    id: 2,
    title: 'Оппонент',
  },
  {
    id: 3,
    title: 'Рейтинг',
  },
  {
    id: 4,
    title: 'Ближайшее событие',
  },
  {
    id: 5,
    title: 'Категория дела',
  },
  {
    id: 6,
    title: 'Инстанция',
  },
  {
    id: 7,
    title: 'Событий',
  },
  {
    id: 8,
    title: 'Задач',
  },
]

export const lawsuitAuthoritiesMenu: MenuItemDropdown[] = [
  {
    id: 1,
    title: 'Редактировать',
    color: '',
    function: 'editAuthorities',
  },
  {
    id: 3,
    title: 'Удалить',
    color: '#F03810',
    function: 'deleteAuthorities',
  },
]

export const personMenu: MenuItemDropdown[] = [
  {
    id: 1,
    title: 'Профиль',
    color: '',
    function: 'profileHandler',
  },
  {
    id: 2,
    title: 'Выйти',
    color: '#F03810',
    function: 'logoutHandler',
  },
]

export const LawsuitEmptyObject: LawsuitFormObject = {
  id: null,
  plot: '',
  opponent: '',
  rating: 1,
  contractNumber: null,
  contractSigningDate: null,
  contractValidity: null,
  powerOfAttorney: null,
  powerOfAttorneySigningDate: null,
  powerOfAttorneyValidity: null,
  customerId: null,
  lawsuitCategoryId: 0,
}
