import { defineComponent, PropType, ref, computed, toRaw } from 'vue'

export default defineComponent({
  name: 'ListFilter',
  props: {
    multiple: Boolean,
    options: Array as PropType<any[]>,
    initialValue: Array as PropType<number[]>,
    isOpen: Boolean,
  },
  emits: ['update:value', 'cancel'],
  setup(props, { emit }) {
    const searchValue = ref('')
    const selectedValues = ref<number[]>(props.initialValue || [])
    const wrapper = ref<HTMLElement | null>(null)

    // Компонент для отображения списка клиентов или дел (multiple: true - клиенты, multiple: false - дела)

    const searchedOptions = computed(() =>
      props.options?.filter((option) =>
        option.name.toLowerCase().includes(searchValue.value.toLowerCase()),
      ),
    )

    const onMultipleValueSelect = (id: number) => {
      if (selectedValues.value?.includes(id)) {
        selectedValues.value = selectedValues.value.filter((val) => val !== id)
      } else {
        selectedValues.value = [...selectedValues.value, id]
      }
    }

    const onSingleValueSelect = (id: number) => {
      selectedValues.value = [id]
    }

    const onAcceptBtnClick = () => {
      emit('update:value', toRaw(selectedValues.value))
    }

    const onCancelBtnClick = () => {
      selectedValues.value = []
      emit('cancel')
    }

    return {
      searchValue,
      selectedValues,
      searchedOptions,
      wrapper,
      onMultipleValueSelect,
      onSingleValueSelect,
      onAcceptBtnClick,
      onCancelBtnClick,
    }
  },
})
