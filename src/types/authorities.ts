export type AuthoritiesFormPayload = {
  id: number
}

export type AuthoritiesData = {
  createdAt: string | null
  updatedAt: string | null
  id: number
  lawsuitNumber: string
  lawsuitNumberLink: string | null
  authority: string
  judge: string
  cabinet: string
  comment: string | null
  lawsuitId: number
}

export type AuthoritiesResponse = {
  success: boolean
  data: AuthoritiesData[]
  error: string | null
}

export type AuthoritiesDataPayload = {
  id?: number | null
  lawsuitNumber: string
  lawsuitNumberLink?: string | null
  authority: string
  judge: string
  cabinet: string
  comment?: string | null
  lawsuitId: number | null
}

export type AuthoritiesDataResponse = {
  success: number
  data: AuthoritiesData
  error: null | string
}
