import { defineComponent } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useNotesStore } from '@/store/notes'
import { useAuthorityStore } from '@/store/authorities'
import { useLawsuitStore } from '@/store/lawsuite'
import { useEventsStore } from '@/store/events'
import { useTasksStore } from '@/store/tasks'
import { useClientsStore } from '@/store/client'

export default defineComponent({
  name: 'ConfirmationDelete',
  setup() {
    const uxuiStore = useUXUIStore()
    const authorityStore = useAuthorityStore()
    const notesStore = useNotesStore()
    const lawsuitStore = useLawsuitStore()
    const eventsStore = useEventsStore()
    const tasksStore = useTasksStore()
    const clientsStore = useClientsStore()

    const deleteLawsuite = async (id: number) => {
      await lawsuitStore.deletelawsuitItem({ id })
      uxuiStore.setModalName('')
    }

    const deleteClient = async (id: number) => {
      await clientsStore.removeClientApiRequest(id)
      uxuiStore.setModalName('')
    }

    const handleCancel = (): void => {
      uxuiStore.setModalName('')
    }

    const deleteNote = async (id: number) => {
      await notesStore.deleteNotesItem({ id })
      uxuiStore.setModalName('')
    }

    const deleteEventTask = async (id: number) => {
      if (uxuiStore.typeOfSelectedPlan === 'event') {
        eventsStore.setDeleteEvent({ id })
      } else if (uxuiStore.typeOfSelectedPlan === 'task') {
        await tasksStore.deleteTask({ id })
      }
      uxuiStore.setModalName('')
    }

    const deleteTask = async (id: number) => {
      await tasksStore.deleteTask({ id })
      uxuiStore.setModalName('')
    }

    const deleteAuthorities = async (id: number) => {
      await authorityStore.deleteAuthorityItem({ id: id })
      uxuiStore.setModalName('')
    }

    const deleteEventType = async (id: number) => {
      await eventsStore.setDeleteEventsTypeById({ id })
      uxuiStore.setModalName('')
    }

    const deleteLawsuitCategory = async (id: number) => {
      await lawsuitStore.deleteLawsuitCategory({ id })
      uxuiStore.setModalName('')
    }

    const handleDelete = () => {
      const id = uxuiStore.modalContent?.id
      if (id) {
        switch (uxuiStore.modalContent?.function) {
          case 'deleteLawsuite':
            deleteLawsuite(id)
            break
          case 'deleteClient':
            deleteClient(id)
            break
          case 'deleteNote':
            deleteNote(id)
            break
          case 'deleteEventTask':
            deleteEventTask(id)
            break
          case 'deleteTask':
            deleteTask(id)
            break
          case 'deleteAuthorities':
            deleteAuthorities(id)
            break
          case 'deleteEventType':
            deleteEventType(id)
            break
          case 'deleteLawsuitCategory':
            deleteLawsuitCategory(id)
            break

          default:
            console.error(
              `Unknown function: ${uxuiStore.modalContent?.function}`,
            )
        }
      }
    }

    return {
      handleDelete,
      deleteLawsuite,
      deleteNote,
      deleteEventTask,
      deleteAuthorities,
      uxuiStore,
      handleCancel,
    }
  },
})
