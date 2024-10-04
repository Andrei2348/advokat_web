import { computed, ComputedRef, defineComponent } from 'vue'

export default defineComponent({
  name: 'FormElement',
  props: {
    title: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    errorText: { type: Array, required: false },
    tagName: { type: String, required: true },
    value: { type: String, required: true },
    fieldName: { type: String, required: false },
    placeholder: { type: String, required: false },
    maxLength: { type: Number, required: false },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const innerParams: ComputedRef<{
      placeholder?: string
      maxLength?: number
    } | null> = computed(() => {
      switch (props.fieldName) {
        case 'example': {
          return {
            maxLength: props.maxLength,
            placeholder: props.placeholder,
          }
        }
        case 'email':
          return {
            placeholder: 'E-mail',
          }
        case 'password':
          return {
            placeholder: 'Пароль',
          }
        case 'code':
          return {
            placeholder: 'Код',
          }
        case 'repeatPassword':
          return {
            placeholder: 'Подтвердите пароль',
          }
        case 'phone':
          return {
            placeholder: 'Телефон',
          }
        case 'lastname':
          return {
            placeholder: 'Фамилия',
          }
        case 'name':
          return {
            placeholder: 'Имя',
          }
        case 'surname':
          return {
            placeholder: 'Отчество',
          }
        default:
          return {
            maxLength: props.maxLength ? props.maxLength : undefined,
            placeholder: props.placeholder,
          }
      }
    })

    const onInput = (event: Event & { target: HTMLInputElement }) => {
      const { value } = event.target as HTMLInputElement
      if (event.target.inputMode === 'numeric') {
        const numValue = value.replace(/[^\d]/g, '')
        event.target.value = numValue
        emit('update:value', numValue)
      } else {
        emit('update:value', value)
      }
    }

    return { onInput, innerParams }
  },
})
