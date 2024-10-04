import { defineComponent, ref, onBeforeMount, onMounted, watch } from 'vue'
import { useLawsuitStore } from '@/store/lawsuite'
import { DefaultError } from '@/types/httpError'
import { lawyerCategoryApiCall } from '@/api/categories'
import { customersApiCall } from '@/api/customers'
import { useApiCall } from '@/composables/useApiCall'
import { LawsuitFormObject } from '@/types/lawsuit'
import {
  CustomersFormPayload,
  CustomersFormSuccessResponse,
} from '@/types/customers'
import {
  CategoriesFormPayload,
  CategoriesFormSuccessResponse,
} from '@/types/categories'

export default defineComponent({
  name: 'EditLawsuit',
  setup() {
    const lawsuitStore = useLawsuitStore()
    const categoriesList = ref<CategoriesFormSuccessResponse['data']>([])
    const customersList = ref<CustomersFormSuccessResponse['data']>([])
    const errorFields = ref<null | DefaultError['error']>(null)
    const disableSaveButton = ref(true)
    const requiredValidationFlag = ref(false)
    const contractValidationFlag = ref(true)
    const attorneyValidationFlag = ref(true)

    const {
      data: categoriesData,
      executeApiCall: getCategories,
      error: categoriesError,
    } = useApiCall<
      CategoriesFormSuccessResponse,
      DefaultError,
      CategoriesFormPayload
    >(lawyerCategoryApiCall, true)

    const {
      data: customersData,
      executeApiCall: getCustomers,
      error: customersError,
    } = useApiCall<
      CustomersFormSuccessResponse,
      DefaultError,
      CustomersFormPayload
    >(customersApiCall, true)

    const getCategoriesList = async () => {
      try {
        await getCategories()
        if (categoriesData.value) {
          categoriesList.value = categoriesData.value.data
        }
      } catch {
        if (categoriesError.value?.data.error) {
          errorFields.value = categoriesError.value.data.error
        }
      }
    }

    const getCustomersList = async () => {
      try {
        await getCustomers()
        if (customersData.value) {
          customersList.value = customersData.value.data
        }
      } catch {
        if (customersError.value?.data.error) {
          errorFields.value = customersError.value.data.error
        }
      }
    }

    const setOpponentName = (value: string) => {
      lawsuitStore.setSelectedLawsuitData('opponent', value)
    }

    const setPlotName = (value: string) => {
      lawsuitStore.setSelectedLawsuitData('plot', value)
    }

    const dataChanged = (objKey: string, value: string | number) => {
      lawsuitStore.setSelectedLawsuitData(objKey, value)
    }

    //====================== Валидация ==============================
    const setContractValidate = (value: boolean) => {
      contractValidationFlag.value = value
    }
    const setAttorneyValidate = (value: boolean) => {
      attorneyValidationFlag.value = value
    }

    const setDataHandler = () => {
      if (
        lawsuitStore.selectedLawsuitData &&
        lawsuitStore.selectedLawsuitData.id
      ) {
        lawsuitStore.setChangeLawsuit()
      } else {
        lawsuitStore.setCreateLawsuit()
      }
    }

    const validateRequiredFields = () => {
      requiredValidationFlag.value = !!(
        lawsuitStore.selectedLawsuitData?.customerId &&
        lawsuitStore.selectedLawsuitData?.plot &&
        lawsuitStore.selectedLawsuitData?.rating > 0 &&
        lawsuitStore.selectedLawsuitData?.opponent &&
        lawsuitStore.selectedLawsuitData?.lawsuitCategoryId
      )
    }

    const validateFinalState = () => {
      disableSaveButton.value =
        !requiredValidationFlag.value ||
        !contractValidationFlag.value ||
        !attorneyValidationFlag.value
    }

    watch(
      () => lawsuitStore.selectedLawsuitData,
      (newValue: LawsuitFormObject | null) => {
        if (newValue !== null) {
          validateRequiredFields()
        }
      },
      { deep: true },
    )

    watch(
      [contractValidationFlag, attorneyValidationFlag, requiredValidationFlag],
      validateFinalState,
    )

    onMounted(() => {
      validateRequiredFields()
      validateFinalState()
    })
    // ======================================================================

    onBeforeMount(async () => {
      await getCustomersList()
      await getCategoriesList()
    })

    return {
      categoriesList,
      customersList,
      lawsuitStore,
      setOpponentName,
      disableSaveButton,
      setDataHandler,
      dataChanged,
      setPlotName,
      setContractValidate,
      setAttorneyValidate,
    }
  },
})
