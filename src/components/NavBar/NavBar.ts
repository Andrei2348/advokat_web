import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onBeforeMount,
} from 'vue'
import { useRouter } from 'vue-router'
import clickOutside from '@/directives/clickOutside'
import { useUXUIStore } from '@/store/uxui'
import { useClientsStore } from '@/store/client'
import { useMainStore } from '@/store/main'
import { useTagsStore } from '@/store/tags'
import { useTasksStore } from '@/store/tasks'
import SearchFilters from '@/components/SearchFilters/SearchFilters.vue'
import SearchButtonsContainer from '@/components/SearchButtonsContainer/SearchButtonsContainer.vue'
import { filters } from '@/config/filters'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'
import { FilterReturnValue, SearchFiltersListPanel } from '@/types/filters'
import { TaskSearchPayload } from '@/types/tasks'

export default defineComponent({
  name: 'NavBar',
  components: {
    SearchFilters,
    SearchButtonsContainer,
  },
  directives: {
    clickOutside,
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const clientStore = useClientsStore()
    const mainStore = useMainStore()
    const tagsStore = useTagsStore()
    const tasksStore = useTasksStore()
    const isMobile = computed(() => mainStore.isMobile)
    const isTablet = computed(() => mainStore.isTablet)

    const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()

    const query = ref('')
    const isSearchOpen = ref(false)
    const router = useRouter()
    const currentRoute = computed(() => router.currentRoute.value)
    const areFiltersOpen = ref(isMobile.value || isTablet.value ? true : false)
    const filterValues = reactive<{ [key: string]: any }>({})
    const filtersSelection = ref<SearchFiltersListPanel[] | []>([])

    const isAsideCollapsed = computed(() => uxuiStore.asideCollapsed)
    const togglePanelHandler = (): void => {
      uxuiStore.switchAside()
    }
    const isFormOpen = clientStore.isTableShown

    watch(
      () => currentRoute.value.name,
      () => {
        resetSearchFields(false)
      },
    )

    const filterContent = computed(() => {
      if (!currentRoute.value.name || !(currentRoute.value.name in filters)) {
        return null
      }
      const { filtersList, values } = filters[currentRoute.value.name]
      return { filtersList, values }
    })

    watch(
      () => filterContent,
      (newValue) => {
        if (newValue.value && Object.keys(newValue.value.values).length) {
          Object.assign(filterValues, newValue.value.values)
        }
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(
      () => filtersSelection.value,
      async () => {
        if (currentRoute.value.name === 'clients') {
          await handleClientsSearch()
        }
      },
      { deep: true },
    )

    watchEffect(() => {
      if (isSearchOpen.value) {
        disableBodyScroll()
      } else {
        enableBodyScroll()
      }
    })

    const onRemoveFilterClick = (index: number, parameter: string) => {
      filtersSelection.value = filtersSelection.value.filter(
        (_, i) => i !== index,
      )

      delete filterValues[parameter]
      console.log(filterValues)
    }

    const saveSearchParams = (params: TaskSearchPayload) => {
      tasksStore.searchParams = params
    }

    const toggleSearchOnMobile = () => {
      isSearchOpen.value = !isSearchOpen.value
      areFiltersOpen.value = true
    }

    const closeSearchOnMobile = () => {
      isSearchOpen.value = false
    }

    const filtersOpenHandler = () => {
      areFiltersOpen.value = true
    }

    const filtersCloseHandler = () => {
      if (!isMobile.value && !isTablet.value) {
        areFiltersOpen.value = false
      }
    }

    const resetSearchFields = (withRequiest: boolean) => {
      query.value = ''
      Object.keys(filterValues).forEach((key) => {
        delete filterValues[key]
      })
      filtersSelection.value = []
      if (withRequiest) {
        submitHandlerComputed.value(false)
      }
    }

    const onValuesChange = (values: FilterReturnValue) => {
      const filterValue = values.value
      const filterKey = Object.keys(values.value)[0]

      filterValues[filterKey] = filterValue[filterKey]

      // Всё необходимое для лэйбла с текстом категории и значением

      const newFilter: { title: string; parameter: string; value: string } = {
        title: values.labelText,
        parameter: filterKey,
        value: '',
      }

      const index = filtersSelection.value.findIndex(
        (filter) => filter.title === values.labelText,
      )

      if (values.text) {
        newFilter.value = values.text
      }

      if (index < 0) {
        filtersSelection.value = [...filtersSelection.value, newFilter]
        return
      }

      // Если текст value есть (во всех, кроме select с allowEmpty) - заменяем
      if (newFilter.value) {
        filtersSelection.value[index] = newFilter
      } else {
        filtersSelection.value = filtersSelection.value.filter(
          (item) => item.title !== newFilter.title,
        )
      }
    }

    const handleClientsSearch = async () => {
      if (!isMobile.value && !isTablet.value) {
        await clientStore.getClients(filterValues)
      }
    }

    const handleSearchClientsFormSubmit = async () => {
      if (!isMobile.value && !isTablet.value) {
        areFiltersOpen.value = false
      }
      const params = { name: query.value, ...filterValues }

      try {
        await clientStore.getClients(params)
        if (isMobile.value || isTablet.value) {
          closeSearchOnMobile()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handlerSearchTasksFormSubmit = async (shouldClose?: boolean) => {
      const body = {
        customerIds: filterValues.customerIds,
        lawsuitIds: filterValues.lawsuitIds,
        taskTagIds: filterValues.taskTagIds,
        status: filterValues.status,
        since: filterValues.deadline ? filterValues.deadline.from : null,
        till: filterValues.deadline ? filterValues.deadline.to : null,
        isBillable: filterValues.isBillable,
        theme: query.value,
      }

      try {
        await tasksStore.getTasks(body)
        saveSearchParams(body)
        if (!isMobile.value && !isTablet.value) {
          areFiltersOpen.value = false
          return
        }
        if (shouldClose) {
          closeSearchOnMobile()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const submitHandlers = {
      clients: handleSearchClientsFormSubmit,
      tasks: handlerSearchTasksFormSubmit,
    }

    const submitHandlerComputed = computed(
      () =>
        submitHandlers[currentRoute.value.name as keyof typeof submitHandlers],
    )

    onBeforeMount(async () => {
      await tagsStore.getTagsForTasksList()
    })

    return {
      query,
      isFormOpen,
      isSearchOpen,
      areFiltersOpen,
      currentRoute,
      isMobile,
      isTablet,
      filterContent,
      filtersSelection,
      onRemoveFilterClick,
      filtersOpenHandler,
      filtersCloseHandler,
      toggleSearchOnMobile,
      closeSearchOnMobile,
      isAsideCollapsed,
      togglePanelHandler,
      uxuiStore,
      onValuesChange,
      submitHandlerComputed,
      resetSearchFields,
    }
  },
})
