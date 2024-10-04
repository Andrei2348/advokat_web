import { defineComponent } from 'vue'
import { casesItems } from '@/config/cases'
import { useLawsuitStore } from '@/store/lawsuite'
import CaseItem from '@/components/CaseItem/CaseItem.vue'
import { hoursOptions, daysOptions } from '@/helpers/formDropdownMenu'

export default defineComponent({
  name: 'CaseCategory',
  components: {
    CaseItem,
  },
  setup() {
    const lawsuitStore = useLawsuitStore()

    return {
      casesItems,
      lawsuitStore,
      hoursOptions,
      daysOptions,
    }
  },
})
