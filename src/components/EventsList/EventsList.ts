import { defineComponent } from 'vue'
import { eventsItems } from '@/config/eventsTable'
import EventsItem from '@/components/EventsItem/EventsItem.vue'
import { useEventsStore } from '@/store/events'
import { hoursOptions, daysOptions } from '@/helpers/formDropdownMenu'

export default defineComponent({
  name: 'EventsList',
  components: {
    EventsItem,
  },
  setup() {
    const eventsStore = useEventsStore()

    return {
      eventsItems,
      eventsStore,
      hoursOptions,
      daysOptions,
    }
  },
})
