import {
  defineComponent,
  watchEffect,
  defineAsyncComponent,
  shallowRef,
  onBeforeMount,
  onBeforeUnmount,
  computed,
} from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'

export default defineComponent({
  name: 'ModalLayer',
  setup() {
    const uxuiStore = useUXUIStore()
    const currentModalComponent = shallowRef<ReturnType<
      typeof defineAsyncComponent
    > | null>(null)
    const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()

    watchEffect(() => {
      const componentName = uxuiStore.modalName.modalName
      if (componentName) {
        currentModalComponent.value = defineAsyncComponent(
          () => import(`@/components/${componentName}/${componentName}.vue`),
        )
      } else {
        currentModalComponent.value = null
      }
    })

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        uxuiStore.setModalName('')
      }
    }

    const isEmptyHeader = computed(() =>
      ['ConfirmationDelete', 'FormationAct'].includes(
        uxuiStore.modalName.modalName,
      ),
    )

    onBeforeMount(() => {
      disableBodyScroll()
      window.addEventListener('keydown', closeOnEsc)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', closeOnEsc)
      enableBodyScroll()
    })

    return {
      uxuiStore,
      currentModalComponent,
      isEmptyHeader,
    }
  },
})
