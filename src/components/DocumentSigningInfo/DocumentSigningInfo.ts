import { defineComponent, watch, ref, toRefs } from 'vue'
import { useLawsuitStore } from '@/store/lawsuite'

export default defineComponent({
  name: 'DocumentSigningInfo',
  props: {
    documentTitle: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    documentNumberKey: {
      type: String,
      required: true,
    },
    documentTitlePlaceholder: {
      type: String,
      required: true,
    },
    dateOfSigning: {
      type: String,
      required: true,
    },
    dateOfSigningKey: {
      type: String,
      required: true,
    },
    validityPeriod: {
      type: String,
      required: true,
    },
    validityPeriodKey: {
      type: String,
      required: true,
    },
  },
  emits: ['validityChanged'],
  setup(props, { emit }) {
    const lawsuitStore = useLawsuitStore()
    const disableDatesSigning = ref<boolean>(!props.documentNumber)
    const disableDatesPeriod = ref<boolean>(!props.dateOfSigning)
    const { documentNumber, dateOfSigning, validityPeriod } = toRefs(props)

    const setDocumentNumber = (value: string): void => {
      lawsuitStore.setSelectedLawsuitData(props.documentNumberKey, value)
    }

    const setDocumentDate = (objKey: string, value: string | number): void => {
      lawsuitStore.setSelectedLawsuitData(objKey, value)
    }

    watch(documentNumber, (newDocumentNumber) => {
      disableDatesSigning.value = !newDocumentNumber?.trim()
    })

    watch(dateOfSigning, (newDateOfSigning) => {
      disableDatesPeriod.value = !(
        newDateOfSigning !== null &&
        newDateOfSigning !== '' &&
        newDateOfSigning !== 'Invalid Date'
      )
    })

    watch(
      [documentNumber, dateOfSigning, validityPeriod],
      ([newDocumentNumber, newDateOfSigning, newValidityPeriod]) => {
        const isDateOfSigningValid =
          newDateOfSigning && newDateOfSigning !== 'Invalid Date'
        const isValidityPeriodValid =
          newValidityPeriod && newValidityPeriod !== 'Invalid Date'

        if (newDocumentNumber === null || newDocumentNumber === '') {
          emit('validityChanged', true)
        } else {
          emit('validityChanged', isDateOfSigningValid && isValidityPeriodValid)
        }
      },
    )

    return {
      setDocumentNumber,
      setDocumentDate,
      disableDatesSigning,
      disableDatesPeriod,
    }
  },
})
