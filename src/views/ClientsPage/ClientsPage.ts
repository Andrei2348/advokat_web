import {
  defineComponent,
  DefineComponent,
  ref,
  computed,
  provide,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useMainStore } from '@/store/main'
import { useClientsStore } from '@/store/client'
import { useScrolling } from '@/composables/useScrolling'
import ClientTable from '@/components/ClientTable/ClientTable.vue'
import ModalLayer from '@/components/ModalLayer/ModalLayer.vue'
import ModalHeader from '@/components/ModalHeader/ModalHeader.vue'
import ClientForm from '@/components/ClientForm/ClientForm.vue'

export default defineComponent({
  name: 'ClientsPage',
  components: {
    ClientTable,
    ClientForm,
    ModalLayer,
    ModalHeader,
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const mainStore = useMainStore()
    const clientsStore = useClientsStore()
    const allClients = computed(() => clientsStore.allClients?.data)
    const isMobile = computed(() => mainStore.isMobile)
    const clientsList = ref<DefineComponent<typeof ClientTable> | null>(null)

    provide('isMobile', isMobile)

    const handleClientsScrolling = computed(() => {
      const handler = useScrolling<typeof ClientTable>(
        clientsList.value,
        clientsStore.loadMoreClients,
      )
      return handler
    })
    const clientsScrollHandler = async () =>
      await handleClientsScrolling.value()

    onBeforeMount(async () => {
      await clientsStore.getClients()
      window.addEventListener('scroll', clientsScrollHandler)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', clientsScrollHandler)
    })

    return {
      uxuiStore,
      allClients,
      isMobile,
      clientsList,
    }
  },
})
