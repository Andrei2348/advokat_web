import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import { DefaultError } from '@/types/httpError'
import { notesApiCall, deleteNoteApiCall } from '@/api/notes'
import {
  Note,
  NotesDeletePayload,
  NotesFormPayload,
  NotesFormSuccessResponse,
} from '@/types/notes'

export const useNotesStore = defineStore('notes', () => {
  const notesList = ref<NotesFormSuccessResponse['data']>([])
  const errorFields = ref<null | DefaultError['error']>(null)
  const selectedLawsuitId = ref<number | null>(null)
  const selectedLawsuitCustomerId = ref<number | null>(null)
  const statusResponse = ref(false)

  const {
    data: noteData,
    executeApiCall: saveData,
    error: noteError,
    isLoading: isNoteDataLoading,
  } = useApiCall<NotesFormSuccessResponse, DefaultError, NotesFormPayload>(
    notesApiCall,
    true,
  )

  const {
    data: noteDeleteData,
    executeApiCall: deleteData,
    error: noteDeleteError,
    isLoading: isDeleteLoading,
  } = useApiCall<NotesFormSuccessResponse, DefaultError, NotesDeletePayload>(
    deleteNoteApiCall,
    true,
  )

  const isNoteList = computed(() => notesList.value)
  const isNoteLoading = computed(() => isNoteDataLoading.value)
  const isNoteDeleteLoading = computed(() => isDeleteLoading.value)

  const setSelectedLawsuitId = (payload: number | null): void => {
    selectedLawsuitId.value = payload
  }

  const setSelectedLawsuitCustomerId = (payload: number | null): void => {
    selectedLawsuitCustomerId.value = payload
  }

  const clearNotesList = (): void => {
    notesList.value = []
  }

  const deleteNote = (idToRemove: number): void => {
    notesList.value = notesList.value.filter(
      (item: Note) => item.id !== idToRemove,
    )
  }

  const addNoteToList = (newValue: Note): void => {
    notesList.value.push(newValue)
  }

  const getNotesList = async (payload: NotesFormPayload) => {
    try {
      await saveData(payload)
      if (noteData.value) {
        notesList.value = noteData.value.data
      }
    } catch {
      if (noteError.value?.data.error) {
        errorFields.value = noteError.value.data.error
      }
    }
  }

  const deleteNotesItem = async (payload: NotesDeletePayload) => {
    try {
      await deleteData(payload)
      if (noteDeleteData.value) {
        statusResponse.value = noteDeleteData.value.success
        if (noteDeleteData.value.success) {
          deleteNote(payload.id)
        }
      }
    } catch {
      if (noteDeleteError.value?.data.error) {
        errorFields.value = noteDeleteError.value.data.error
      }
    }
  }

  return {
    getNotesList,
    notesList,
    errorFields,
    deleteNotesItem,
    isNoteDeleteLoading,
    isNoteLoading,
    selectedLawsuitId,
    setSelectedLawsuitId,
    selectedLawsuitCustomerId,
    setSelectedLawsuitCustomerId,
    clearNotesList,
    deleteNote,
    isNoteList,
    addNoteToList,
  }
})
