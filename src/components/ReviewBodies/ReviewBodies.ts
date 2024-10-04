import { defineComponent, onBeforeMount, computed, ref } from 'vue'
import { authoritiesApiCall } from '@/api/authorities'
import {
  AuthoritiesFormPayload,
  AuthoritiesResponse,
  AuthoritiesData,
} from '@/types/authorities'
import { DefaultError } from '@/types/httpError'
import { useRoute } from 'vue-router'
import { useApiCall } from '@/composables/useApiCall'
import ReviewItem from '@/components/ReviewItem/ReviewItem.vue'
import { useUXUIStore } from '@/store/uxui'
import { useAuthorityStore } from '@/store/authorities'

export default defineComponent({
  name: 'ReviewBodies',
  components: {
    ReviewItem,
  },
  setup() {
    const route = useRoute()
    const errorFields = ref<null | DefaultError['error']>(null)
    const authoritiesList = ref<null | AuthoritiesData[]>(null)
    const uxuiStore = useUXUIStore()
    const scrollContainer = ref<HTMLElement | null>(null)
    const authorityStore = useAuthorityStore()

    const {
      data: authoritiesData,
      executeApiCall: getReviewBodies,
      error: authoritiesError,
      isLoading: isAuthoritiesDataLoading,
    } = useApiCall<AuthoritiesResponse, DefaultError, AuthoritiesFormPayload>(
      authoritiesApiCall,
      true,
    )

    // Добавление нового органа рассмотрения
    const addBodyHandler = () => {
      uxuiStore.setModalName('EditReview', 4)
    }

    const scrollToBottom = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
      }
    }

    const isAuthoritiesLoading = computed(() => isAuthoritiesDataLoading.value)

    const getAuthoritiesList = async (payload: AuthoritiesFormPayload) => {
      try {
        await getReviewBodies(payload)
        if (authoritiesData.value && authoritiesData.value.success) {
          authoritiesList.value = authoritiesData.value.data
          setTimeout(scrollToBottom, 100)
        }
      } catch {
        if (authoritiesError.value?.data.error) {
          errorFields.value = authoritiesError.value.data.error
        }
      }
    }

    onBeforeMount(async () => {
      authorityStore.setCleanData()
      await getAuthoritiesList({ id: Number(route.params.id) })
    })

    return {
      authoritiesList,
      isAuthoritiesLoading,
      addBodyHandler,
      scrollContainer,
    }
  },
})
