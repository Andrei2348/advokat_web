import { defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'ButtonsMobileSwipe',
  props: {
    item: {
      type: Object as PropType<{ id: number; [key: string]: any }>,
      required: true,
    },
    extremeIconLeft: {
      type: String,
      required: false,
    },
    averageIconLeft: {
      type: String,
      required: false,
    },
    averageIconRight: {
      type: String,
      required: false,
    },
    extremeIconRight: {
      type: String,
      required: false,
    },
  },
  emits: {
    editLawsuit: null,
    deleteLawsuit: null,
    averageLeft: null,
    averageRight: null
  },
  setup(props, { emit }) {
    const { item } = toRefs(props)

    const editLawsuitHandler = () => {
      emit('editLawsuit', item.value)
    }

    const averageLeftHandler = () => {
      emit('averageLeft', item.value)
    }

    const averageRightHandler = () => {
      emit('averageRight', item.value)
    }

    const deleteLawsuitHandler = () => {
      emit('deleteLawsuit', item.value.id)
    }

    return {
      editLawsuitHandler,
      deleteLawsuitHandler,
      averageLeftHandler,
      averageRightHandler
    }
  },
})
