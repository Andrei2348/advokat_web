import { defineComponent, onBeforeMount } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useUserStore } from '@/store/user'
import { useAuthStore } from '@/store/auth'
import PersonalData from '@/components/PersonalData/PersonalData.vue'
import PasswordChangeComponent from '@/components/PasswordChangeComponent/PasswordChangeComponent.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PersonalData,
    PasswordChangeComponent,
  },
  name: 'ProfilePage',
  setup() {
    const uxuiStore = useUXUIStore()
    const userStore = useUserStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const logoutHandler = async () => {
      await authStore.logoutRequest()
      router.push('root')
    }

    onBeforeMount(async () => {
      uxuiStore.setCurrentPage('Профиль')
      await userStore.getUserDataInfo()
    })
    return {
      uxuiStore,
      logoutHandler,
    }
  },
})
