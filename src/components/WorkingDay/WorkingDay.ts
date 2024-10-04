import { defineComponent } from 'vue'
import { useUserStore } from '@/store/user'
import { vMaska } from 'maska/vue'

export default defineComponent({
  name: 'WorkingDay',
  directives: {
    vMaska,
  },
  setup() {
    const userStore = useUserStore()

    const setStartWorkingTime = (value: string) => {
      userStore.setValueByKey('startWorkingTime', value)
    }

    const setEndWorkingTime = (value: string) => {
      userStore.setValueByKey('endWorkingTime', value)
    }

    const setWorkingTimeInterval = (value: string) => {
      userStore.setValueByKey('workingTimeInterval', Number(value))
    }

    return {
      setStartWorkingTime,
      setEndWorkingTime,
      setWorkingTimeInterval,
      userStore,
    }
  },
})
