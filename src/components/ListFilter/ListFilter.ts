import { defineComponent, PropType, ref, toRaw, watch } from 'vue'

export default defineComponent({
  name: 'ListFilter',
  props: {
    multiple: Boolean,
    options: Array as PropType<any[]>,
    initialValue: Array as PropType<number[]>,
    isOpen: Boolean,
  },
  emits: ['update:value', 'scroll', 'search', 'cancel'],
  setup(props, { emit }) {
    const searchValue = ref('')
    const selectedValues = ref<number[]>(props.initialValue || [])
    const wrapper = ref<HTMLElement | null>(null)
    const list = ref<HTMLDivElement | null>(null)

    // Компонент для отображения списка клиентов или дел (multiple: true - клиенты, multiple: false - дела)

    watch(
      () => searchValue.value,
      () => {
        emit('search', searchValue.value)
      },
    )

    const onMultipleValueSelect = (id: number) => {
      if (selectedValues.value?.includes(id)) {
        selectedValues.value = selectedValues.value.filter((val) => val !== id)
      } else {
        selectedValues.value = [...selectedValues.value, id]
      }

      console.log(selectedValues.value)
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
      list,
      searchValue,
      selectedValues,
      wrapper,
      onMultipleValueSelect,
      onSingleValueSelect,
      onAcceptBtnClick,
      onCancelBtnClick,
    }
  },
})
