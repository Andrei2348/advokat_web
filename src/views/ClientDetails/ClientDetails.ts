import { defineComponent, computed, onBeforeUnmount } from 'vue'
import ClientForm from '@/components/ClientForm/ClientForm.vue'
import { useUXUIStore } from '@/store/uxui'
import { useClientsStore } from '@/store/client'

export default defineComponent({
  name: 'ClientDetails',
  components: {
    ClientForm,
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const isAsideCollapsed = computed(() => uxuiStore.asideCollapsed)
    const clientsStore = useClientsStore()

    onBeforeUnmount(() => {
      clientsStore.resetSelectedClient()
    })
    return { isAsideCollapsed }
  },
})
