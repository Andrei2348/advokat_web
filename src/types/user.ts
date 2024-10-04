export type WorkShedule = {
  startWorkingTime: string
  endWorkingTime: string
  workingTimeInterval: number
}

export type Tariff = {
  id: number
  label: string
  cost: number
  comment: string | null
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type Subscription = {
  id: number
  status: string
  endDays: number
  expireAt: string
  createdAt: string
  updatedAt: string
  tariff: Tariff
}

export type UserData = {
  id: number
  name: string
  lastname: string
  surname: string | null
  email: string
  phone: string
  type: userType
  startWorkingTime: string
  endWorkingTime: string
  workingTimeInterval: number
  subscription: Subscription
  roles: string[]
  permissions: string[]
}

export type UserDataApiResponse = {
  success: number
  data: UserData
  error: string | null
}

export type userType = 'advocate' | 'lawyer'

export type userSelectType = {
  id: number
  name: string
  item: userType
}
