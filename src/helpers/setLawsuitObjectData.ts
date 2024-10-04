import { LawsuitForm } from '@/types/lawsuit'

interface LawsuitStore {
  setSelectedLawsuitData: (key: string, value: any) => void
}

const setStartData = (lawsuitData: LawsuitForm, store: LawsuitStore) => {
  if (lawsuitData) {
    const {
      id = null,
      plot = '',
      opponent = '',
      rating = 0,
      contractNumber = null,
      contractSigningDate = null,
      contractValidity = null,
      powerOfAttorney = null,
      powerOfAttorneySigningDate = null,
      powerOfAttorneyValidity = null,
      customer,
      lawsuitCategory,
    } = lawsuitData

    const dataToSet = {
      id,
      plot,
      opponent,
      rating,
      contractNumber,
      contractSigningDate,
      contractValidity,
      customerId: customer?.id || null,
      lawsuitCategoryId: lawsuitCategory?.id || 0,
      powerOfAttorney,
      powerOfAttorneySigningDate,
      powerOfAttorneyValidity,
    }

    Object.entries(dataToSet).forEach(([key, value]) => {
      store.setSelectedLawsuitData(key, value)
    })
  }
}

export default setStartData
