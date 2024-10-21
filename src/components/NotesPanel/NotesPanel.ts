import {
  defineComponent,
  ref,
  watch,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useNotesStore } from '@/store/notes'
import { useApiCall } from '@/composables/useApiCall'
import { DefaultError } from '@/types/httpError'
import { modalsContent } from '@/config/deleteModalsConfig'
import { createNoteApiCall } from '@/api/notes'
import { NoteFormSuccessResponse, NotesCreatePayload } from '@/types/notes'
import { getFormatDate } from '@/helpers/dateFormatter'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'

export default defineComponent({
  name: 'NotesPanel',
  setup() {
    const errorFields = ref<null | DefaultError['error']>(null)
    const notesStore = useNotesStore()
    const uxuiStore = useUXUIStore()
    const textAreaValue = ref<string>('')
    const buttonIsDisabled = ref(true)
    const isErrorsExists = ref(false)
    const warningMessage = ref<string>('')
    const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()

    const {
      data: notesData,
      executeApiCall: createNewNote,
      error: loginError,
    } = useApiCall<NoteFormSuccessResponse, DefaultError, NotesCreatePayload>(
      createNoteApiCall,
      true,
    )

    const handleClose = () => {
      uxuiStore.switchNotesPanel()
    }

    const handleDelete = (id: number) => {
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent['note'], id)
    }

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const handleSendForm = async () => {
      const lawsuitId = notesStore.selectedLawsuitId
      const customerId = notesStore.selectedLawsuitCustomerId
      await createNote({
        text: textAreaValue.value,
        lawsuitId: lawsuitId,
        customerId: customerId,
      })
    }

    const createRequest = async () => {
      const id = notesStore.selectedLawsuitId
      await notesStore.getNotesList({ lawsuitId: id, itemsPerPage: 15 })
    }

    const createNote = async (payload: NotesCreatePayload) => {
      try {
        await createNewNote(payload)
        if (notesData.value) {
          if (notesData.value.data) {
            notesStore.addNoteToList(notesData.value.data)
          }
          textAreaValue.value = ''
          setTimeout(() => {
            isErrorsExists.value = false
          }, 10)
        }
      } catch {
        if (loginError.value?.data.error) {
          errorFields.value = loginError.value.data.error
        }
      }
    }

    watch(textAreaValue, (newTextAreaValue) => {
      const isEmpty = newTextAreaValue.trim().length === 0
      buttonIsDisabled.value = isEmpty
      warningMessage.value = isEmpty ? 'Поле не может быть пустым!' : ''
      isErrorsExists.value = isEmpty
    })

    onBeforeMount(async () => {
      disableBodyScroll()
      window.addEventListener('keydown', closeOnEsc)
      await createRequest()
    })

    onBeforeUnmount(() => {
      isErrorsExists.value = false
      notesStore.clearNotesList()
      window.removeEventListener('keydown', closeOnEsc)
      enableBodyScroll()
    })

    return {
      handleClose,
      textAreaValue,
      buttonIsDisabled,
      handleSendForm,
      warningMessage,
      isErrorsExists,
      handleDelete,
      notesStore,
      getFormatDate,
      createNote,
    }
  },
})
