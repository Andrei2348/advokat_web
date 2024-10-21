import { defineComponent, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useClientsStore } from '@/store/client'
import { clientLawsuitsTableConfig } from '@/config/clientTableHeadConfig'
import { checkDateValidityByDays, getFormatDate } from '@/helpers/dateFormatter'

// const example = [
//   {
//     id: 2244,
//     title: 'Консультация',
//     date: '12/12/12',
//     category: 'Гражданский процесс',
//     money: '30 000',
//     status: 'Завершено',
//   },
//   {
//     id: 2244544,
//     title: 'Гражданское право (Истец) пр. Иванов И.И',
//     date: '12/234/12',
//     category: 'Гражданский процесс',
//     money: '50 000',
//     status: 'Активно',
//   },
//   {
//     id: 224454,
//     title: 'Гражданское право (Истец) пр. Иванов И.И',
//     date: '12/12/21',
//     category: 'Гражданский процесс',
//     money: '80 000',
//     status: 'Активно',
//   },
// ]

export default defineComponent({
  name: 'ClientLawsuitsTable',
  setup() {
    const clientsStore = useClientsStore()
    const clientLawsuits = computed(() => {
      const client = clientsStore.selectedClient
      const lawsuits = client?.lawsuits
      return { client, lawsuits }
    })

    return {
      clientLawsuitsTableConfig,
      clientLawsuits,
      RouterLink,
      checkDateValidityByDays,
      getFormatDate,
    }
  },
})
