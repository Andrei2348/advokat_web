import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  watchEffect,
} from 'vue'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'
import { useMainStore } from '@/store/main'
export default defineComponent({
  name: 'AppPopup',
  props: {
    emptyPopup: { type: Boolean, required: false },
    header: { type: String, required: false },
    popupStatus: { type: Boolean, required: false, default: false },
    currentTab: { type: String, required: false },
  },
  emits: ['popupClose', 'changeCurrentTab'],
  setup(props, { emit }) {
    const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()
    const mainStore = useMainStore()

    const popupClose = () => {
      enableBodyScroll()
      emit('popupClose')
    }

    const changeCurrentTab = (tab: string) => {
      emit('changeCurrentTab', tab)
    }

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        popupClose()
      }
    }

    watchEffect(() => {
      if (props.popupStatus) {
        disableBodyScroll()
      } else {
        enableBodyScroll()
      }
    })

    onBeforeMount(() => {
      window.addEventListener('keydown', closeOnEsc)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', closeOnEsc)
      enableBodyScroll()
    })
    return { mainStore, popupClose, changeCurrentTab }
  },
})
