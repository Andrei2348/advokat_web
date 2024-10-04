import { defineComponent, computed, onBeforeMount, ref } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useLawsuitStore } from '@/store/lawsuite'
import { useApiCall } from '@/composables/useApiCall'
import { lawsuitApiCall } from '@/api/lawsuit'
import {
  LawsuitFormPayload,
  LawsuitsFormSuccessResponse,
} from '@/types/lawsuit'
import { DefaultError } from '@/types/httpError'
import LawsuitTable from '@/components/LawsuitTable/LawsuitTable.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    LawsuitTable,
  },
  setup() {
    const errorFields = ref<null | DefaultError['error']>(null)
    const uxuiStore = useUXUIStore()
    const lawsuitStore = useLawsuitStore()

    const {
      data: authData,
      executeApiCall: saveData,
      error: loginError,
      isLoading: isLawsuitDataLoading,
    } = useApiCall<
      LawsuitsFormSuccessResponse,
      DefaultError,
      LawsuitFormPayload
    >(lawsuitApiCall, false)

    const isLawsuitLoading = computed(() => isLawsuitDataLoading.value)

    const getLawsuitList = async () => {
      try {
        await saveData()
        if (authData.value) {
          lawsuitStore.setLawsuitData(authData.value.data)
        }
      } catch {
        if (loginError.value?.data.error) {
          errorFields.value = loginError.value.data.error
        }
      }
    }

    onBeforeMount(async () => {
      await getLawsuitList()
    })

    return {
      uxuiStore,
      errorFields,
      lawsuitStore,
      isLawsuitLoading,
    }
  },
})
