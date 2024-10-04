import { defineComponent, ref, PropType, watch } from 'vue'

export default defineComponent({
  name: 'StarRating',
  props: {
    maxStars: {
      type: Number as PropType<number>,
      default: 5,
    },
    rating: {
      type: Number as PropType<number>,
      default: 0,
    },
    objectKey: {
      type: String,
      required: true,
    },
  },
  emits: ['dataChanged'],
  setup(props, { emit }) {
    const currentRating = ref<number>(props.rating)

    watch(
      () => props.rating,
      (newRating) => {
        currentRating.value = newRating
      },
    )

    const setRating = (rating: number) => {
      if (rating <= currentRating.value) {
        currentRating.value = rating - 1
      } else if (rating > currentRating.value) {
        currentRating.value = rating
      }
      emit('dataChanged', props.objectKey, currentRating.value)
    }

    return {
      currentRating,
      setRating,
    }
  },
})
