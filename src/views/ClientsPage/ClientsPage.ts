import { defineComponent, computed, provide, onBeforeMount } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useMainStore } from '@/store/main'
import { useClientsStore } from '@/store/client'
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
    const isTableShown = computed(() => clientsStore.isTableShown)
    const allClients = computed(() => clientsStore.allClients.data)
    const isMobile = computed(() => mainStore.isMobile)

    provide('isMobile', isMobile)

    const openForm = () => {
      if (isMobile.value) {
        uxuiStore.setModalName('ClientForm', 5)
        return
      }
      clientsStore.openForm()
    }

    const onClientClick = () => {
      openForm()
    }

    onBeforeMount(async () => {
      await clientsStore.getClients()
    })

    return {
      uxuiStore,
      allClients,
      isTableShown,
      isMobile,
      onClientClick,
    }
  },
})
