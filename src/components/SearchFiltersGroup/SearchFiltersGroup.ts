import {
  defineComponent,
  PropType,
  watch,
  ref,
  onBeforeMount,
  useTemplateRef,
} from 'vue'
import RadioFilter from '@/components/RadioFilter/RadioFilter.vue'
import ListFilterSelection from '@/components/ListFilterSelection/ListFilterSelection.vue'
import SelectElement from '@/components/SelectElement/SelectElement.vue'
import { useTagsStore } from '@/store/tags'
import { FilterGroup, SearchFiltersListPanel } from '@/types/filters'

export default defineComponent({
  name: 'SearchFiltersGroup',
  props: {
    data: Object as PropType<FilterGroup>,
    selectedFilters: Array as PropType<SearchFiltersListPanel[]>,
  },
  components: {
    SelectElement,
    RadioFilter,
    ListFilterSelection,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const tagsStore = useTagsStore()
    const selectOptions = ref<any[] | []>([])
    const selectElementRef =
      useTemplateRef<(typeof SelectElement)[]>('selectElement')

    const selectLabelText = {
      taskTagIds: 'Тэги',
    }

    const getTagsOptions = async () => {
      if (!tagsStore.tagsList) {
        await tagsStore.getTagsForTasksList()
      }
    }

    const getSelectOptions = async () => {
      if (props.data && Object.keys(props.data.filters).includes('select')) {
        const options = props.data.filters.select?.options
        if (!options) {
          return
        }
        if (options === 'tags') {
          await getTagsOptions()
          if (tagsStore.tagsList) {
            selectOptions.value = tagsStore.tagsList
          }
        }
      }
    }

    watch(
      () => props.selectedFilters,
      (newValue) => {
        if (
          !newValue?.find(
            (filter) =>
              filter.parameter === props.data?.filters.select?.purpose,
          ) &&
          selectElementRef.value
        ) {
          selectElementRef.value[0].resetSelectedValue()
        }
      },
    )

    const onValueUpdate = (value: any) => {
      emit('update:value', value)
    }

    const onSelectValueChange = (objKey: string, value: string | object[]) => {
      const obj = {
        value: {},
        labelText: selectLabelText[objKey as keyof typeof selectLabelText],
        text: '',
      }

      if (Array.isArray(value)) {
        obj.value = {
          [objKey]: value.length ? value.map((item: any) => item.id) : null,
        }
        obj.text = value.map((item: any) => item.name).join('+')
      }
      onValueUpdate(obj)
    }

    watch(
      () => props.data,
      async () => {
        await getSelectOptions()
      },
    )

    onBeforeMount(async () => {
      await getSelectOptions()
    })

    return {
      selectOptions,
      selectElementRef,
      onValueUpdate,
      onSelectValueChange,
    }
  },
})
