import { defineComponent, onBeforeMount, ref } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useLawsuitStore } from '@/store/lawsuite'
import { DefaultError } from '@/types/httpError'
import LawsuitTable from '@/components/LawsuitTable/LawsuitTable.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    LawsuitTable,
  },
  setup() {
    const errorFields = ref<null | DefaultError['error']>(null)
    const uxuiStore = useUXUIStore()
    const lawsuitStore = useLawsuitStore()

    onBeforeMount(async () => {
      await lawsuitStore.getLawsuitList()
    })

    return {
      uxuiStore,
      errorFields,
      lawsuitStore,
    }
  },
})
