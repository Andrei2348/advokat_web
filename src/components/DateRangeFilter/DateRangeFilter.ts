import { defineComponent, PropType, ref, watch } from 'vue'
import DateElement from '@/components/DateElement/DateElement.vue'
import { DateRange, SearchFiltersListPanel } from '@/types/filters'

export default defineComponent({
  name: 'DateRangeFilter',
  components: {
    DateElement,
  },
  props: {
    data: Object as PropType<DateRange>,
    selectedFilters: Array as PropType<SearchFiltersListPanel[]>,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const dates = ref({
      from: '',
      to: '',
    })
    const dateElementFrom = ref<typeof DateElement | null>(null)
    const dateElementTo = ref<typeof DateElement | null>(null)
    const obj = {
      value: {
        deadline: {},
      },
      labelText: 'Дедлайн',
      text: '',
    }
    const onValueChange = (objKey: keyof typeof dates.value, value: string) => {
      if (value === 'Invalid Date') {
        return
      }
      dates.value[objKey] = value

      const from = dates.value.from
      const to = dates.value.to
      obj.text = `${from} ${from && to ? '-' : ''} ${to}`

      Object.assign(obj.value.deadline, { [objKey]: value })
      emit('update:value', obj)
    }

    watch(
      () => props.selectedFilters,
      (newValue) => {
        if (!newValue?.find((filter) => filter.title === obj.labelText)) {
          dateElementFrom.value?.resetDate()
          dateElementTo.value?.resetDate()
          dates.value = {
            from: '',
            to: '',
          }
        }
      },
    )
    return {
      onValueChange,
      dateElementFrom,
      dateElementTo,
    }
  },
})
