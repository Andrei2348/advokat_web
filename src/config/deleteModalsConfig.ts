import { ModalContent } from '@/types/modals'

export const modalsContent: ModalContent[] = [
  {
    id: null,
    title: 'Удаление дела',
    text: 'Вы уверены, что хотите удалить дело?',
    function: 'deleteLawsuite',
  },
  {
    id: null,
    title: 'Удаление заметки',
    text: 'Вы уверены, что хотите удалить данную заметку?',
    function: 'deleteNote',
  },
  {
    id: null,
    title: 'Удаление ограна рассмотрения',
    text: 'Вы уверены, что хотите удалить данный орган рассмотрения?',
    function: 'deleteAuthorities',
  },
  {
    id: null,
    title: 'Удаление события/задачи',
    text: 'Вы уверены, что хотите удалить данное событие/задачу?',
    function: 'deleteEventTask',
  },
  {
    id: null,
    title: 'Удаление типа события',
    text: 'Вы уверены, что хотите удалить данный тип события?',
    function: 'deleteEventType',
  },
  {
    id: null,
    title: 'Удаление категории дел',
    text: 'Вы уверены, что хотите удалить данную категорию дел?',
    function: 'deleteLawsuitCategory',
  },
  {
    id: null,
    title: 'Удаление тегов для задач',
    text: 'Вы уверены, что хотите удалить данный тег для задач?',
    function: 'deleteTagForTask',
  },
  {
    id: null,
    title: 'Удаление пользователя',
    text: 'Вы уверены, что хотите удалить аккаунт пользователя?',
    function: 'deleteUser',
  },
]
