import { defineComponent, onBeforeMount, PropType, ref, watch } from 'vue'
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
    value: {
      type: Object as PropType<{ id: string }>,
      default: null,
    },
    objectKey: {
      type: String,
      required: true,
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
      () => {
        emit('dataChanged', props.objectKey, selected.value?.id)
      },
    )

    onBeforeMount(() => {
      selected.value = props.value
    })

    return {
      selected,
      handleOpen,
      handleClose,
    }
  },
})
