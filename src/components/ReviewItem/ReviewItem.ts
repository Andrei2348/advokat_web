import { defineComponent, PropType } from 'vue'
import { AuthoritiesDataPayload } from '@/types/authorities'
import { lawsuitAuthoritiesMenu } from '@/config/lawsuitTableHeadConfig'
import { useUXUIStore } from '@/store/uxui'
import { modalsContent } from '@/config/deleteModalsConfig'
import { useAuthorityStore } from '@/store/authorities'
import { useSwipe } from '@/composables/useSwipe'
import { useMainStore } from '@/store/main'

export default defineComponent({
  name: 'ReviewItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    item: {
      type: Object as PropType<AuthoritiesDataPayload>,
      required: true,
    },
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const authorityStore = useAuthorityStore()
    const mainStore = useMainStore()
    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)

    const deleteAuthorities = (id: number) => {
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent[2], id)
    }

    const editAuthorities = (item: AuthoritiesDataPayload) => {
      console.log('item=', item)
      uxuiStore.setModalName('EditReview', 4)
      authorityStore.setAuthoritiesData(item)
    }

    return {
      lawsuitAuthoritiesMenu,
      deleteAuthorities,
      editAuthorities,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
    }
  },
})
