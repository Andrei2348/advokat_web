import { defineComponent } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { modalsTitleNames } from '@/config/commonModalsConfig'

export default defineComponent({
  name: 'ModalHeader',
  props: {
    index: {
      type: Number,
      required: false,
    },
  },
  setup() {
    const uxuiStore = useUXUIStore()

    const handleClose = (): void => {
      uxuiStore.setModalName('')
    }

    return {
      handleClose,
      modalsTitleNames,
      uxuiStore,
    }
  },
})
