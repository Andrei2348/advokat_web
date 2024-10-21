import {
  defineComponent,
  defineAsyncComponent,
  shallowRef,
  watch,
  computed,
  onBeforeMount,
} from 'vue'
import { useRouter } from 'vue-router'
import AsidePanel from '@/components/AsidePanel/AsidePanel.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import CreateWidget from '@/components/CreateWidget/CreateWidget.vue'
import NotesPanel from '@/components/NotesPanel/NotesPanel.vue'
import { useMainStore } from '@/store/main'
import { useUXUIStore } from '@/store/uxui'
import ModalLayer from '@/components/ModalLayer/ModalLayer.vue'
import ModalHeader from '@/components/ModalHeader/ModalHeader.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AsidePanel,
    NavBar,
    CreateWidget,
    NotesPanel,
    ModalLayer,
    ModalHeader,
  },

  setup() {
    const uxuiStore = useUXUIStore()
    const mainStore = useMainStore()
    const Notes = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(
      null,
    )

    const isNotificationOpen = computed(() => uxuiStore.isNotificationOpen)
    const notification = computed(() => uxuiStore.notification)
    const isNotesPanelVisible = computed(() => uxuiStore.notesPanelVisible)
    const isMobile = computed(() => mainStore.isMobile)

    const router = useRouter()

    router.beforeEach((to) => {
      uxuiStore.setCurrentPage((to.meta.title as string) ?? '')
    })

    watch(isNotesPanelVisible, (notesIsVisible) => {
      Notes.value = notesIsVisible ? NotesPanel : null
    })

    onBeforeMount(() => {
      uxuiStore.setCurrentPage(router.currentRoute.value.meta.title as string)
    })

    return {
      Notes,
      uxuiStore,
      ModalLayer,
      ModalHeader,
      isNotificationOpen,
      notification,
      isMobile,
    }
  },
})
