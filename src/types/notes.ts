export type NotesFormPayload = {
  lawsuitId?: number | null
  itemsPerPage: number
}

export type NotesFormSuccessResponse = {
  data: Note[]
  success: boolean
}

export type NoteFormSuccessResponse = {
  data: Note
  success: boolean
}

export type NotesDeletePayload = {
  id: number
}

export type Note = {
  id: number
  updatedAt: string
  createdAt: string
  text: string
  lawsuit: any
}

export type NotesCreatePayload = {
  text: string
  customerId: number | null
  lawsuitId: number | null
}
