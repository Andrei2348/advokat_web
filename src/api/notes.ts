import axios from 'axios'
import {
  NotesDeletePayload,
  NotesFormPayload,
  NotesFormSuccessResponse,
  NotesCreatePayload,
  NoteFormSuccessResponse,
} from '@/types/notes'

const notesApiCall = async (
  abortController?: AbortController,
  params?: Partial<NotesFormPayload>,
): Promise<NotesFormSuccessResponse> => {
  const response = await axios.get(`/v1/note`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const deleteNoteApiCall = async (
  abortController?: AbortController,
  params?: Partial<NotesDeletePayload>,
): Promise<NotesFormSuccessResponse> => {
  const response = await axios.delete(`/v1/note/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

const createNoteApiCall = async (
  abortController?: AbortController,
  params?: Partial<NotesCreatePayload>,
): Promise<NoteFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/note',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

export { notesApiCall, createNoteApiCall, deleteNoteApiCall }
