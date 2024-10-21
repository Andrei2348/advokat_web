import { defineComponent, PropType, ref, watch } from 'vue'
import { RadioType, SearchFiltersListPanel } from '@/types/filters'

export default defineComponent({
  name: 'RadioFilter',
  props: {
    data: Object as PropType<RadioType>,
    selectedFilters: Array as PropType<SearchFiltersListPanel[]>,
    withTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const optionValue = ref(null)

    const labelTextsObject = {
      status: 'Статус',
      isContractValidityValid: 'Статус',
      isBillable: 'Стоимость',
    }

    watch(
      () => props.selectedFilters,
      (newValue) => {
        const purpose = props.data?.purpose
        if (!purpose) {
          return
        }
        const selectedRadioFilter = newValue?.find(
          (filter) => filter.parameter === purpose,
        )
        if (!selectedRadioFilter) {
          optionValue.value = null
        }
      },
    )

    const onOptionSelect = (value: any, text: string) => {
      const purpose = props.data?.purpose

      const objectData: { [key: string]: any } = {
        labelText: '',
        value: {},
      }
      optionValue.value = value
      if (purpose) {
        objectData.labelText =
          labelTextsObject[props.data?.purpose as keyof typeof labelTextsObject]
        objectData.value[purpose] = value
      }
      objectData.text = text
      emit('update:value', objectData)
    }

    return {
      optionValue,
      onOptionSelect,
    }
  },
})
