import {
  defineComponent,
  defineAsyncComponent,
  shallowRef,
  watch,
  computed,
} from 'vue'
import AsidePanel from '@/components/AsidePanel/AsidePanel.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import CreateWidget from '@/components/CreateWidget/CreateWidget.vue'
import NotesPanel from '@/components/NotesPanel/NotesPanel.vue'
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
    const Notes = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(
      null,
    )

    const isNotesPanelVisible = computed(() => uxuiStore.notesPanelVisible)

    watch(isNotesPanelVisible, (notesIsVisible) => {
      Notes.value = notesIsVisible ? NotesPanel : null
    })

    return {
      Notes,
      uxuiStore,
      ModalLayer,
      ModalHeader,
    }
  },
})
