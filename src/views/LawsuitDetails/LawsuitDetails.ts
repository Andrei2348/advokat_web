import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import { lawsuitDetailsApiCall } from '@/api/lawsuit'
import { useUXUIStore } from '@/store/uxui'
import { useMainStore } from '@/store/main'
import { useLawsuitStore } from '@/store/lawsuite'
import SocialContacts from '@/components/SocialContacts/SocialContacts.vue'
import DocumentInfo from '@/components/DocumentInfo/DocumentInfo.vue'
import PlanningLawsuits from '@/components/PlanningLawsuits/PlanningLawsuits.vue'
import setStartData from '@/helpers/setLawsuitObjectData'
import {
  LawsuitForm,
  LawsuitFormPayload,
  LawsuitFormSuccessResponse,
} from '@/types/lawsuit'

export default defineComponent({
  name: 'LawsuitDetails',
  components: {
    SocialContacts,
    DocumentInfo,
    PlanningLawsuits,
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const lawsuitStore = useLawsuitStore()
    const mainStore = useMainStore()
    const route = useRoute()
    const errorFields = ref<null | DefaultError['error']>(null)
    const lawsuitDetails = ref<LawsuitForm | null>(null)
    const isPlanningView = ref(false)

    const {
      data: lawyerData,
      executeApiCall: getDetails,
      error: lawyerError,
    } = useApiCall<
      LawsuitFormSuccessResponse,
      DefaultError,
      LawsuitFormPayload
    >(lawsuitDetailsApiCall, true)

    const getFormationAct = () => {
      uxuiStore.setModalName('FormationAct', 1)
    }

    const toggleView = (value: boolean) => {
      isPlanningView.value = value
    }

    const editDetailsHandler = (item: LawsuitForm) => {
      lawsuitStore.setSelectedLawsuit(item)
      uxuiStore.setModalName('EditLawsuit', 3)
    }

    const reviewBodiesHandler = () => {
      uxuiStore.setModalName('ReviewBodies', 2)
    }

    watch(
      () => uxuiStore.modalName,
      (newValue) => {
        if (newValue?.modalName === '') {
          createRequests()
        }
      },
      { deep: true },
    )

    const getLawsuitDetails = async (payload: LawsuitFormPayload) => {
      try {
        await getDetails(payload)
        if (lawyerData.value && lawyerData.value.success) {
          lawsuitDetails.value = lawyerData.value.data
        }
      } catch {
        if (lawyerError.value?.data.error) {
          errorFields.value = lawyerError.value.data.error
        }
      }
    }

    const dataChanged = (objKey: string, value: number): void => {
      lawsuitStore.setSelectedLawsuitData(objKey, value)
      if (lawsuitStore.selectedLawsuitData) {
        lawsuitStore.setChangeLawsuit()
      }
    }

    const createRequests = async () => {
      await getLawsuitDetails({ id: Number(route.params.id) })
      await lawsuitStore.getLawsuitEvents({ id: Number(route.params.id) })
    }

    onBeforeMount(async () => {
      await createRequests()
      if (lawsuitDetails.value) {
        setStartData(lawsuitDetails.value, lawsuitStore)
      }
    })
    return {
      uxuiStore,
      SocialContacts,
      PlanningLawsuits,
      getFormationAct,
      editDetailsHandler,
      lawsuitDetails,
      reviewBodiesHandler,
      dataChanged,
      toggleView,
      isPlanningView,
      mainStore,
    }
  },
})
