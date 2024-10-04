import { defineComponent, ref, watch } from 'vue'
import {
  AuthoritiesDataPayload,
  AuthoritiesDataResponse,
} from '@/types/authorities'
import { DefaultError } from '@/types/httpError'
import {
  authoritiesCreateApiCall,
  authoritiesChangeApiCall,
} from '@/api/authorities'
import { useApiCall } from '@/composables/useApiCall'
import { useRoute } from 'vue-router'
import { useUXUIStore } from '@/store/uxui'
import { useAuthorityStore } from '@/store/authorities'

export default defineComponent({
  name: 'EditReview',
  setup() {
    const authorityStore = useAuthorityStore()
    const uxuiStore = useUXUIStore()
    const disableSaveButton = ref(false)
    const errorFields = ref<null | DefaultError['error']>(null)
    const route = useRoute()

    const {
      data: authorityCreateData,
      executeApiCall: createData,
      error: authorityCreateError,
    } = useApiCall<
      AuthoritiesDataResponse,
      DefaultError,
      AuthoritiesDataPayload
    >(authoritiesCreateApiCall, true)

    const {
      data: authorityChangeData,
      executeApiCall: changeData,
      error: authorityChangeError,
    } = useApiCall<
      AuthoritiesDataResponse,
      DefaultError,
      AuthoritiesDataPayload
    >(authoritiesChangeApiCall, true)

    const setLawsuitNumber = (value: string) => {
      authorityStore.setAuthoritiesDataByKey('lawsuitNumber', value)
    }

    const setLawsuitLink = (value: string | null) => {
      authorityStore.setAuthoritiesDataByKey('lawsuitNumberLink', value)
    }

    const setAuthorityValue = (value: string) => {
      authorityStore.setAuthoritiesDataByKey('authority', value)
    }

    const setJudgeName = (value: string) => {
      authorityStore.setAuthoritiesDataByKey('judge', value)
    }

    const setCabinetNumber = (value: string) => {
      authorityStore.setAuthoritiesDataByKey('cabinet', value)
    }

    const setComment = (value: string | null) => {
      authorityStore.setAuthoritiesDataByKey('comment', value)
    }

    const saveRequestHandler = () => {
      authorityStore.setAuthoritiesDataByKey(
        'lawsuitId',
        Number(route.params.id),
      )
      console.log('ready', authorityStore.authoritiesData)
      if (authorityStore.authoritiesData?.id) {
        setChangeAuthority()
      } else {
        setCreateAuthority()
      }
    }

    const setCreateAuthority = async () => {
      try {
        if (authorityStore.authoritiesData) {
          await createData(authorityStore.authoritiesData)
          if (authorityCreateData.value && authorityCreateData.value.success) {
            uxuiStore.setModalName('ReviewBodies', 2)
          }
        }
      } catch (error) {
        if (authorityCreateError.value?.data.error) {
          errorFields.value = authorityCreateError.value.data.error
        }
      }
    }

    const setChangeAuthority = async () => {
      try {
        if (authorityStore.authoritiesData) {
          await changeData(authorityStore.authoritiesData)
          if (authorityChangeData.value && authorityChangeData.value.success) {
            uxuiStore.setModalName('ReviewBodies', 2)
          }
        }
      } catch (error) {
        if (authorityChangeError.value?.data.error) {
          errorFields.value = authorityChangeError.value.data.error
        }
      }
    }

    watch(
      () => [
        authorityStore.authoritiesData?.lawsuitNumber,
        authorityStore.authoritiesData?.authority,
        authorityStore.authoritiesData?.judge,
        authorityStore.authoritiesData?.cabinet,
      ],
      ([lawsuitNumber, authority, judge, cabinet]) => {
        disableSaveButton.value = !(
          lawsuitNumber &&
          authority &&
          judge &&
          cabinet
        )
      },
      { immediate: true },
    )
    return {
      disableSaveButton,
      setLawsuitNumber,
      setLawsuitLink,
      setAuthorityValue,
      setJudgeName,
      setCabinetNumber,
      setComment,
      setCreateAuthority,
      saveRequestHandler,
      authorityStore,
    }
  },
})
