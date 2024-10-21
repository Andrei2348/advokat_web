import { ModalContent } from '@/types/modals'

export const modalsContent: { [key: string]: ModalContent } = {
  lawsuit: {
    title: 'Удаление дела',
    text: 'Вы уверены, что хотите удалить дело?',
    function: 'deleteLawsuite',
  },
  note: {
    title: 'Удаление заметки',
    text: 'Вы уверены, что хотите удалить данную заметку?',
    function: 'deleteNote',
  },
  authority: {
    title: 'Удаление органа рассмотрения',
    text: 'Вы уверены, что хотите удалить данный орган рассмотрения?',
    function: 'deleteAuthorities',
  },
  taskEvent: {
    title: 'Удаление события/задачи',
    text: 'Вы уверены, что хотите удалить данное событие/задачу?',
    function: 'deleteEventTask',
  },
  task: {
    title: 'Удаление задачи',
    text: 'Вы уверены, что хотите удалить данную задачу?',
    function: 'deleteTask',
  },
  eventType: {
    title: 'Удаление типа события',
    text: 'Вы уверены, что хотите удалить данный тип события?',
    function: 'deleteEventType',
  },
  lawsuitCategory: {
    title: 'Удаление категории дел',
    text: 'Вы уверены, что хотите удалить данную категорию дел?',
    function: 'deleteLawsuitCategory',
  },
  tagForTask: {
    title: 'Удаление тегов для задач',
    text: 'Вы уверены, что хотите удалить данный тег для задач?',
    function: 'deleteTagForTask',
  },
  client: {
    title: 'Удаление клиента',
    text: 'Вы уверены, что хотите удалить данного клиента?',
    function: 'deleteClient',
  },
}
