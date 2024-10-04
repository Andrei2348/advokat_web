import { defineComponent, ref, computed } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { personMenu } from '@/config/lawsuitTableHeadConfig'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const uxuiStore = useUXUIStore()
    const router = useRouter()
    const authStore = useAuthStore()
    const query = ref('')

    const onInputHandler = () => {
      console.log(query.value)
    }

    const navigateToProfileHandler = () => {
      router.push('profile')
    }

    const isAsideCollapsed = computed(() => uxuiStore.asideCollapsed)

    const togglePanelHandler = (): void => {
      uxuiStore.switchAside()
    }

    const logoutRequestHandler = async () => {
      await authStore.logoutRequest()
      router.push('root')
    }

    return {
      query,
      onInputHandler,
      isAsideCollapsed,
      togglePanelHandler,
      uxuiStore,
      personMenu,
      navigateToProfileHandler,
      logoutRequestHandler,
    }
  },
})
