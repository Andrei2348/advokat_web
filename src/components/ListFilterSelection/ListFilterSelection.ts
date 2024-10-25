import {
  defineComponent,
  DefineComponent,
  PropType,
  ref,
  computed,
  watch,
  onMounted,
} from 'vue'
import ListFilter from '@/components/ListFilter/ListFilter.vue'
import { useClientsStore } from '@/store/client'
import { useLawsuitStore } from '@/store/lawsuite'
import clickOutside from '@/directives/clickOutside'
import { useScrolling } from '@/composables/useScrolling'
import { ListType, SearchFiltersListPanel } from '@/types/filters'
import { Customer } from '@/types/customers'

export default defineComponent({
  name: 'ListFilterSelection',
  components: {
    ListFilter,
  },
  directives: {
    clickOutside,
  },
  props: {
    data: Object as PropType<ListType>,
    selectedFilters: Array as PropType<SearchFiltersListPanel[]>,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const isModalVisible = ref(false)
    const selectedValues = ref<number[]>([])
    const valuesForDisplaying = ref<any[]>([])
    const modal = ref<DefineComponent<typeof ListFilter> | null>(null)
    const selection = ref<HTMLElement | null>(null)
    const initialClients = ref<Customer[] | [] | null>(null)
    const clientsStore = useClientsStore()
    const lawsuitStore = useLawsuitStore()

    const clientsListOptions = computed(() => clientsStore.allClients?.data)
    const lawsuitListOptions = computed(() => lawsuitStore.lawsuitData)

    const listOptions = computed(() =>
      props.data?.purpose === 'customerIds'
        ? clientsListOptions.value
        : lawsuitListOptions.value,
    )

    watch(
      () => props.selectedFilters,
      (newVal) => {
        if (newVal) {
          const selectedRadioFilter = newVal?.find(
            (filter) => filter.parameter === purpose,
          )
          if (!selectedRadioFilter) {
            selectedValues.value = []
            valuesForDisplaying.value = []
          }
        }
      },
    )

    const purpose = props.data?.purpose as keyof typeof labels

    const labels = {
      customerIds: 'Клиенты',
      lawsuitIds: 'Дело',
    }

    const obj = {
      labelText: labels[purpose],
      text: '',
      value: {},
    }

    const onSelectionFieldsClick = () => {
      isModalVisible.value = true
    }

    const onSelectionClose = () => {
      isModalVisible.value = false
    }

    const onRemoveDisplayedOptionBtnClick = (id: number) => {
      valuesForDisplaying.value = valuesForDisplaying.value.filter(
        (item) => item.id !== id,
      )
      selectedValues.value = selectedValues.value.filter((item) => item !== id)

      obj.text = selectedValues.value.length
        ? String(selectedValues.value.length)
        : ''
      obj.value = {
        [purpose]: selectedValues.value,
      }
      emit('update:value', obj)
    }

    const onGetValues = async (data: number[]) => {
      onSelectionClose()
      if (!data.length) {
        return
      }

      let text = ''
      if (purpose === 'customerIds') {
        text = String(data.length)
      } else {
        const selectedLawsuit = lawsuitListOptions.value?.find(
          (item) => item.id === data[0],
        )
        text = `${selectedLawsuit?.lawsuitCategory.name} ${selectedLawsuit?.opponent}`
      }

      obj.text = text
      obj.value = {
        [purpose]: data,
      }
      selectedValues.value = data

      let filteredOptions
      if (purpose === 'customerIds') {
        filteredOptions = initialClients.value?.filter((item) =>
          selectedValues.value.includes(item.id),
        )
      } else {
        filteredOptions = listOptions.value?.filter((item) =>
          selectedValues.value.includes(item.id),
        )
      }

      if (filteredOptions) {
        valuesForDisplaying.value = filteredOptions
      }
      emit('update:value', obj)
      await clientsStore.getClients()
    }

    const getModalPosition = computed(() => {
      const modalHeight = modal.value?.wrapper?.offsetHeight
      const parentRect = selection.value?.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (parentRect?.bottom + modalHeight > viewportHeight) {
        return { top: 'auto', bottom: 'calc(100% + 5px)' }
      } else {
        return { top: 'calc(100% + 5px)', bottom: 'auto' }
      }
    })

    const handleClientsSearch = async (value: string) => {
      await clientsStore.getClients({ name: value })
    }

    const handleClientsListScrolling = computed(() => {
      const handler = useScrolling<typeof ListFilter>(
        modal.value,
        clientsStore.loadMoreClients,
      )
      return handler
    })

    onMounted(async () => {
      await clientsStore.getClients()
      if (clientsStore.allClients?.data) {
        initialClients.value = clientsStore.allClients?.data
      }
      await lawsuitStore.getLawsuitList()
    })

    return {
      isModalVisible,
      selectedValues,
      listOptions,
      valuesForDisplaying,
      modal,
      selection,
      purpose,
      getModalPosition,
      onSelectionFieldsClick,
      onSelectionClose,
      onRemoveDisplayedOptionBtnClick,
      onGetValues,
      handleClientsSearch,
      handleClientsListScrolling,
    }
  },
})
