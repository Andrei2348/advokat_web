import { defineComponent } from 'vue'
import { useLawsuitStore } from '@/store/lawsuite'
import { lawsuitItems } from '@/config/lawsuitTableHeadConfig'
import LawsuitItem from '@/components/LawsuitItem/LawsuitItem.vue'

export default defineComponent({
  name: 'LawsuitTable',
  components: {
    LawsuitItem,
  },
  setup() {
    const lawsuitStore = useLawsuitStore()
    return {
      lawsuitItems,
      lawsuitStore,
    }
  },
})
