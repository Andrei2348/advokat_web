import { defineComponent } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useNotesStore } from '@/store/notes'
import { useAuthorityStore } from '@/store/authorities'
import { useLawsuitStore } from '@/store/lawsuite'
import { useEventsStore } from '@/store/events'
import { useTasksStore } from '@/store/tasks'
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: 'ConfirmationDelete',
  setup() {
    const uxuiStore = useUXUIStore()
    const authorityStore = useAuthorityStore()
    const notesStore = useNotesStore()
    const lawsuitStore = useLawsuitStore()
    const eventsStore = useEventsStore()
    const tasksStore = useTasksStore()
    const userStore = useUserStore()

    const deleteLawsuite = async (id: number) => {
      await lawsuitStore.deletelawsuitItem({ id })
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
        eventsStore.setDeleteEvent({ id: id })
      } else if (uxuiStore.typeOfSelectedPlan === 'task') {
        tasksStore.setDeleteTask({ id: id })
      }
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

    const deleteUser = async () => {
      await userStore.deleteUserRequest()
    }

    const handleDelete = () => {
      if (uxuiStore.modalContent?.id) {
        switch (uxuiStore.modalContent?.function) {
          case 'deleteLawsuite':
            deleteLawsuite(uxuiStore.modalContent?.id)
            break
          case 'deleteNote':
            deleteNote(uxuiStore.modalContent?.id)
            break
          case 'deleteEventTask':
            deleteEventTask(uxuiStore.modalContent?.id)
            break
          case 'deleteAuthorities':
            deleteAuthorities(uxuiStore.modalContent?.id)
            break
          case 'deleteEventType':
            deleteEventType(uxuiStore.modalContent?.id)
            break
          case 'deleteLawsuitCategory':
            deleteLawsuitCategory(uxuiStore.modalContent?.id)
            break
          case 'deleteUser':
            deleteUser()
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
