import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchButtonsContainer',
  props: {
    isShown: Boolean,
  },
  emits: ['onResetBtnClick'],
  setup(_, { emit }) {
    const onResetBtnClick = () => {
      emit('onResetBtnClick', true)
    }
    return { onResetBtnClick }
  },
})
