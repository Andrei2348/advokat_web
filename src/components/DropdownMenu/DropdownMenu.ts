import { defineComponent, ref, watch } from 'vue'
import { MenuItemDropdown } from '@/types/createWidget'
import clickOutside from '@/directives/clickOutside'

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    menuItems: {
      type: Array<MenuItemDropdown>,
      required: true,
    },
    menuIcon: {
      type: String,
      required: true,
    },
    menuOpen: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  directives: {
    clickOutside,
  },
  setup(props, { emit }) {
    const menuIsOpen = ref<boolean>(props.menuOpen)
    const clickY = ref<number>(0)
    const windowHeight = ref<number>(window.innerHeight)
    const menuPositionTop = ref<boolean>(false)

    const toggleMenuHandler = (event: MouseEvent): void => {
      menuIsOpen.value = !menuIsOpen.value
      clickY.value = event.clientY
      menuPositionTop.value = windowHeight.value / 2 < clickY.value
    }

    const close = (): void => {
      if (menuIsOpen.value) {
        menuIsOpen.value = false
      }
    }

    const handleClick = (functionName: string): void => {
      emit(functionName)
      close()
    }

    watch(
      () => props.menuOpen,
      (newValue) => {
        menuIsOpen.value = newValue
      },
    )

    return {
      close,
      toggleMenuHandler,
      menuIsOpen,
      menuPositionTop,
      handleClick,
    }
  },
})
