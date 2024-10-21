import { defineComponent, PropType } from 'vue'
import RadioFilter from '@/components/RadioFilter/RadioFilter.vue'
import SearchFiltersGroup from '@/components/SearchFiltersGroup/SearchFiltersFroup.vue'
import DateRangeFilter from '@/components/DateRangeFilter/DateRangeFilter.vue'
import SearchButtonsContainer from '@/components/SearchButtonsContainer/SearchButtonsContainer.vue'
import { Filter, SearchFiltersListPanel } from '@/types/filters'

export default defineComponent({
  name: 'SearchFilters',
  props: {
    areButtonsShown: {
      type: Boolean,
    },
    content: {
      type: Object as PropType<Filter>,
    },
    selectedFilters: {
      type: Array as PropType<SearchFiltersListPanel[]>,
    },
    valuesChange: {
      type: Function as PropType<(value: any) => void>,
    },
    resetSearchFields: {
      type: Function as PropType<(value: any) => void>,
    },
  },
  components: {
    RadioFilter,
    SearchFiltersGroup,
    DateRangeFilter,
    SearchButtonsContainer,
  },
  setup() {
    return {}
  },
})
