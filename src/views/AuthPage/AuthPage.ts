import { computed, defineComponent } from 'vue'
import AuthForm from '@/components/AuthForm/AuthForm.vue'
import RecoveryPassword from '@/components/RecoveryPassword/RecoveryPassword.vue'
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/main'
export default defineComponent({
  name: 'AuthPage',
  components: {
    RecoveryPassword,
    AuthForm,
    RegistrationForm,
  },
  setup() {
    const mainStore = useMainStore()
    const route = useRoute()
    const isLogin = computed(() => route.name === 'login')
    const isRegistration = computed(() => route.name === 'registration')
    return { isLogin, mainStore, isRegistration }
  },
})
