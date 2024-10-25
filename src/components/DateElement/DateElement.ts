import { defineComponent, ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { isEqual, set } from 'date-fns'
import dayjs from 'dayjs'
import { DateType, UIOptions } from '@/types/datePicker'

export default defineComponent({
  name: 'DateElement',
  components: {
    VueDatePicker,
  },
  props: {
    label: { type: String, required: false, default: '' },
    errorText: { type: Array, required: false },
    tagName: { type: String, required: false },
    value: { type: String, required: false },
    fieldName: { type: String, required: false },
    placeholder: { type: String, required: false, default: '' },
    objectKey: { type: String, required: true },
    disabled: { type: Boolean, required: false, default: false },
    yearRange: { type: Array<number>, required: false, default: [2020, 2040] },
  },
  emits: ['dataChanged'],

  setup(props, { emit }) {
    const date = ref<DateType | null>(props.value || null)
    const originalDate = ref<DateType | null>(null)

    const format = (date: Date) => {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    }

    const uiOptions: Partial<UIOptions> = {
      navBtnNext: 'custom-next-button',
      navBtnPrev: ['custom-prev-button', 'extra-class'],
      calendar: 'custom-calendar',
      calendarCell: 'custom-calendar-cell',
      menu: 'custom-datepicker-menu',
      input: 'custom-input-field',
    }

    const getDayClass = (date: Date) => {
      if (
        isEqual(
          date,
          set(new Date(), {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          }),
        )
      ) {
        return 'marked-cell'
      }
      return ''
    }

    const textInputOptions = {
      format: 'dd.MM.yyyy',
    }

    const formatDate = (dateString: DateType) => {
      const date = dayjs(dateString)
      return date.format('DD.MM.YYYY')
    }

    const resetDate = () => {
      date.value = null
    }

    watch(
      () => props.disabled,
      (newDisabledValue) => {
        if (newDisabledValue) {
          originalDate.value = date.value
          date.value = null
          emit('dataChanged', props.objectKey, null)
        } else if (originalDate.value) {
          date.value = originalDate.value
          originalDate.value = null
        }
      },
    )

    watch(date, (newDate) => {
      if (!props.disabled) {
        emit('dataChanged', props.objectKey, formatDate(newDate))
      }
    })

    return {
      date,
      format,
      uiOptions,
      getDayClass,
      resetDate,
      textInputOptions,
    }
  },
})
