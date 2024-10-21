import { defineComponent, computed, watch } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useMainStore } from '@/store/main'
import { menuItemsUser, menuItemsAdmin } from '@/config/asideMenuConfig'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'

export default defineComponent({
  name: 'AsidePanel',
  setup() {
    const uxuiStore = useUXUIStore()
    const mainStore = useMainStore()
    const isAdmin = uxuiStore.getIsAdmin
    const menuItems = isAdmin ? menuItemsAdmin : menuItemsUser
    const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()
    const isAsideCollapsed = computed(() => uxuiStore.asideCollapsed)

    const togglePanelHandler = (): void => {
      uxuiStore.switchAside()
    }

    const selectMenuHandler = () => {
      if (mainStore.isMobile || (mainStore.isTablet && !mainStore.isNotebook)) {
        uxuiStore.switchAside()
      }
    }

    watch(
      () => uxuiStore.asideCollapsed,
      (newValue: boolean) => {
        if (
          mainStore.isMobile ||
          (mainStore.isTablet && !mainStore.isNotebook && !newValue)
        ) {
          disableBodyScroll()
        }
        if (newValue) {
          enableBodyScroll()
        }
      },
    )

    return {
      togglePanelHandler,
      menuItems,
      isAsideCollapsed,
      selectMenuHandler,
    }
  },
})
