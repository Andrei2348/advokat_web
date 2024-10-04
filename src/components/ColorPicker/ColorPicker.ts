import { defineComponent, watch, ref } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import clickOutside from '@/directives/clickOutside'

export default defineComponent({
  components: {
    ColorPicker,
  },
  props: {
    currentColor: {
      type: String,
      required: true,
      default: null,
    },
  },
  directives: {
    clickOutside,
  },
  emits: ['changeColor'],
  setup(_, { emit }) {
    const uxuiStore = useUXUIStore()
    const color = ref('#59c7f9')
    const suckerCanvas = ref(null)
    const suckerArea = ref([])
    const isSucking = ref(false)
    const pickerVisible = ref(false)
    const clickY = ref<number>(0)
    const windowHeight = ref<number>(window.innerHeight)
    const menuPositionTop = ref<boolean>(false)

    const changeColor = (newColor: any) => {
      color.value = newColor.hex
    }

    const pickerVisibleHandler = (event: MouseEvent) => {
      pickerVisible.value = !pickerVisible.value
      clickY.value = event.clientY
      menuPositionTop.value = windowHeight.value / 2 < clickY.value
    }

    const pickerCloseHandler = () => {
      pickerVisible.value = false
    }

    const selectColorHandler = () => {
      pickerCloseHandler()
      emit('changeColor', color.value)
    }

    watch(pickerVisible, (newPickerVisible) => {
      uxuiStore.setSwipePermission(!newPickerVisible)
    })

    return {
      color,
      suckerCanvas,
      suckerArea,
      isSucking,
      changeColor,
      pickerVisible,
      pickerVisibleHandler,
      selectColorHandler,
      pickerCloseHandler,
      menuPositionTop,
    }
  },
})
