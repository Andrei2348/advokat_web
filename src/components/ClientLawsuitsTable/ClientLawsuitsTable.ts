import { defineComponent, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useClientsStore } from '@/store/client'
import { clientLawsuitsTableConfig } from '@/config/clientTableHeadConfig'
import {
  checkDateValidityByDays,
  getFormatDate,
  getDaysWord,
} from '@/helpers/dateFormatter'

export default defineComponent({
  name: 'ClientLawsuitsTable',
  setup() {
    const clientsStore = useClientsStore()
    const list = ref<HTMLTableElement | null>(null)
    const clientLawsuits = computed(() => {
      const client = clientsStore.selectedClient
      const lawsuits = client?.lawsuits?.data
      return { client, lawsuits }
    })

    return {
      list,
      clientLawsuitsTableConfig,
      clientLawsuits,
      RouterLink,
      checkDateValidityByDays,
      getFormatDate,
      getDaysWord,
    }
  },
})
