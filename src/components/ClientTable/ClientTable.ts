import { defineComponent, ref, reactive, computed, ComputedRef } from 'vue'
import ClientItem from '@/components/ClientItem/ClientItem.vue'
import { clientTableHeaderItems } from '@/config/clientTableHeadConfig'
import dayjs from 'dayjs'
import {
  getFullFormatDate,
  checkDateValidityByHours,
} from '@/helpers/dateFormatter'
import { useClientsStore } from '@/store/client'
import {
  ClientTableColumn,
  ClientTableSortingType,
  Customer,
  ModifiedCustomer,
} from '@/types/customers'

export default defineComponent({
  name: 'ClientsTable',
  components: {
    ClientItem,
  },
  setup() {
    const sorting = reactive<ClientTableSortingType>({
      currentColumnSorted: null,
      sortingDirection: 'desc',
    })
    const clientsStore = useClientsStore()
    const allClients = computed(() => clientsStore.allClients?.data)
    const list = ref<HTMLTableElement | null>(null)

    const sortArrayDescending = (
      array: Customer[],
      propertySorted: ClientTableColumn,
    ) => {
      return array.sort((a, b) => {
        const first =
          !a[propertySorted as keyof Customer] && propertySorted === 'lawsuit'
            ? a.latestValidityLawsuit?.lawsuitCategory.name
            : a[propertySorted as keyof Customer]
        const second = !b[propertySorted as keyof Customer]
          ? b.latestValidityLawsuit?.lawsuitCategory?.name
          : b[propertySorted as keyof Customer]
        const firstString = String(first)
        const secondString = String(second)
        return firstString.localeCompare(secondString)
      })
    }

    const sortArrayAscending = (
      array: Customer[],
      propertySorted: ClientTableColumn,
    ) => {
      return array.sort((a, b) => {
        const first =
          !a[propertySorted as keyof Customer] && propertySorted === 'lawsuit'
            ? a.latestValidityLawsuit?.lawsuitCategory.name
            : a[propertySorted as keyof Customer]
        const second = !b[propertySorted as keyof Customer]
          ? b.latestValidityLawsuit?.lawsuitCategory?.name
          : b[propertySorted as keyof Customer]
        const firstString = String(first)
        const secondString = String(second)
        return secondString.localeCompare(firstString)
      })
    }

    const clients = computed(() => {
      if (!allClients.value) {
        return { sortedClientsWithoutLawsuit: [], sortedClientsWithLawsuit: [] }
      }
      const clientsWithoutLawsuit = allClients.value?.filter(
        (client) =>
          !client.latestValidityLawsuit ||
          !client.latestValidityLawsuit.contractSigningDate,
      )
      const clientsWithLawsuit = allClients.value?.filter(
        (client) => client.latestValidityLawsuit,
      )

      let sortedClientsWithoutLawsuit = clientsWithoutLawsuit
      let sortedClientsWithLawsuit = clientsWithLawsuit

      if (!sorting.currentColumnSorted) {
        return { sortedClientsWithoutLawsuit, sortedClientsWithLawsuit }
      }

      if (sorting.currentColumnSorted === 'lawsuit') {
        sortedClientsWithLawsuit =
          sorting.sortingDirection === 'desc'
            ? (sortedClientsWithLawsuit = sortArrayDescending(
                sortedClientsWithLawsuit,
                sorting.currentColumnSorted,
              ))
            : (sortedClientsWithLawsuit = sortArrayAscending(
                sortedClientsWithLawsuit,
                sorting.currentColumnSorted,
              ))
        return { sortedClientsWithoutLawsuit, sortedClientsWithLawsuit }
      }

      sortedClientsWithoutLawsuit =
        sorting.sortingDirection === 'desc'
          ? (sortedClientsWithoutLawsuit = sortArrayDescending(
              sortedClientsWithoutLawsuit,
              sorting.currentColumnSorted,
            ))
          : (sortedClientsWithoutLawsuit = sortArrayAscending(
              sortedClientsWithoutLawsuit,
              sorting.currentColumnSorted,
            ))
      sortedClientsWithLawsuit =
        sorting.sortingDirection === 'desc'
          ? (sortedClientsWithLawsuit = sortArrayDescending(
              sortedClientsWithLawsuit,
              sorting.currentColumnSorted,
            ))
          : (sortedClientsWithLawsuit = sortArrayAscending(
              sortedClientsWithLawsuit,
              sorting.currentColumnSorted,
            ))

      return { sortedClientsWithoutLawsuit, sortedClientsWithLawsuit }
    })

    const statusedClientsWithLawsuit: ComputedRef<{
      [key: string]: ModifiedCustomer[]
    }> = computed(() => {
      if (!clients.value?.sortedClientsWithLawsuit) {
        return {}
      }
      const clientsWithStatus = clients.value.sortedClientsWithLawsuit.map(
        (client) => {
          return {
            ...client,
            lastActiveAt: client.lastActiveAt
              ? getFullFormatDate(client.lastActiveAt)
              : '',
            isActive: client.latestValidityLawsuit?.contractValidity
              ? checkDateValidityByHours(
                  client.latestValidityLawsuit?.contractValidity,
                ) < 0
              : false,
            year: String(
              dayjs(client.latestValidityLawsuit?.contractSigningDate).year(),
            ),
          }
        },
      )

      const groupedClients = Object.groupBy(
        clientsWithStatus,
        ({ year }) => year,
      )

      const orderedGropedClients = Object.keys(groupedClients)
        .sort((a, b) => Number(b) - Number(a))
        .reduce((obj: { [key: string]: ModifiedCustomer[] }, key) => {
          if (groupedClients[key]) {
            obj[key] = groupedClients[key]
          }
          return obj
        }, {})

      return orderedGropedClients
    })

    const firstGroupTitle = computed(() => {
      const keys = Object.keys(statusedClientsWithLawsuit.value)
      if (!keys) {
        return ''
      }
      return keys[0]
    })

    const sortingBtnClick = (column?: ClientTableColumn) => {
      if (!column) {
        return
      }

      if (sorting.currentColumnSorted === column) {
        if (sorting.sortingDirection === 'desc') {
          sorting.sortingDirection = 'asc'
        } else {
          sorting.currentColumnSorted = null
        }
        return
      }
      sorting.currentColumnSorted = column
      sorting.sortingDirection = 'desc'
    }

    return {
      clients,
      list,
      firstGroupTitle,
      statusedClientsWithLawsuit,
      clientTableHeaderItems,
      sortingBtnClick,
    }
  },
})
