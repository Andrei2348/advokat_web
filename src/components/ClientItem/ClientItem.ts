import { defineComponent, PropType, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useSwipe } from '@/composables/useSwipe'
import { useClientsStore } from '@/store/client'
import { getFormatDate } from '@/helpers/dateFormatter'
import { Customer } from '@/types/customers'

export default defineComponent({
  name: 'ClientItem',
  components: {
    RouterLink,
  },
  props: {
    item: {
      type: Object as PropType<Customer>,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const isMobile = inject<boolean>('isMobile', false)
    const clientsStore = useClientsStore()
    const router = useRouter()

    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(isMobile)

    const formatPhoneNumber = (phone: string) => {
      const cleanedPhone = phone.replace(/\\D/g, '')
      const groups = cleanedPhone.match(/^(\+7{1})(\d{3})(\d{3})(\d{4})$/)
      if (groups) {
        return `${groups[1]} (${groups[2]}) ${groups[3]} ${groups[4]}`
      }
    }

    const menuItems = [
      {
        id: 1,
        title: 'Удалить',
        color: '#F03810',
        function: 'onRemoveClick',
      },
    ]

    const onClientClick = async () => {
      await router.push(`/clients/${props.item.id}`)
    }

    const onRemoveClick = (id: number) => {
      clientsStore.openRemoveModal(id)
      resetPosition()
    }

    return {
      getFormatDate,
      isMobile,
      formatPhoneNumber,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      menuItems,
      onClientClick,
      onRemoveClick,
    }
  },
})
