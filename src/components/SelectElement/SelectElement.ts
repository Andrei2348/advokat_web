import { defineComponent, PropType, ref, watch } from 'vue'
import 'vue-multiselect/dist/vue-multiselect.css'
import Multiselect from 'vue-multiselect'
import { useUXUIStore } from '@/store/uxui'

export default defineComponent({
  name: 'SelectElement',
  components: {
    Multiselect,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    groupSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      required: false,
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    allowEmpty: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Object as PropType<{ id: string }>,
      default: null,
    },
    objectKey: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['dataChanged'],
  setup(props, { emit }) {
    const uxuiStore = useUXUIStore()
    const selected = ref<{ id: string } | null>(null)

    const handleOpen = () => {
      uxuiStore.setSwipePermission(false)
    }

    const handleClose = () => {
      uxuiStore.setSwipePermission(true)
    }

    watch(
      () => selected.value,
      (newVal) => {
        if (newVal === null) {
          return
        }
        if (props.multiple) {
          emit('dataChanged', props.objectKey, selected.value)

          return
        }
        emit('dataChanged', props.objectKey, selected.value?.id)
      },
    )

    watch(
      () => props.value,
      () => {
        selected.value = props.value
      },
    )

    const resetSelectedValue = () => {
      selected.value = null
    }

    return {
      selected,
      handleOpen,
      handleClose,
      resetSelectedValue,
    }
  },
})
