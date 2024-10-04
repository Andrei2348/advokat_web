import { defineComponent, ref, watch } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useUserStore } from '@/store/user'
import { modalsContent } from '@/config/deleteModalsConfig'
import { userSelectType, UserData } from '@/types/user'

export default defineComponent({
  name: 'PersonalData',
  setup() {
    const uxuiStore = useUXUIStore()
    const userStore = useUserStore()
    const dataForChange = ref<UserData | null>(null)
    const selectedType = ref<userSelectType | null>(null)
    const disabledFlagButton = ref(true)

    const selectType: userSelectType[] = [
      {
        id: 1,
        name: 'Адвокат',
        item: 'advocate',
      },
      {
        id: 2,
        name: 'Юрист',
        item: 'lawyer',
      },
    ]

    const setLastName = (value: string) => {
      if (dataForChange.value) {
        dataForChange.value.lastname = value
      }
    }

    const setUsername = (value: string) => {
      if (dataForChange.value) {
        dataForChange.value.name = value
      }
    }

    const setSurname = (value: string) => {
      if (dataForChange.value) {
        dataForChange.value.surname = value
      }
    }

    const dataTypeSet = <K extends keyof UserData>(objKey: K, id: number) => {
      const item = selectType.find((item) => item.id === id)
      if (item && dataForChange.value) {
        dataForChange.value[objKey] = item.item as any
      }
    }

    const saveChangesHandler = async () => {
      await userStore.changeDataUserRequest(dataForChange.value)
    }

    const deleteUserHandler = async (id: number | undefined) => {
      if (id) {
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent[7], id)
      }
    }

    watch(
      () => userStore.userInfo,
      (newVal) => {
        dataForChange.value = newVal
        selectedType.value =
          selectType.find((item) => item.item === newVal?.type) ?? null
      },
      { deep: true },
    )

    watch(
      dataForChange,
      (newItem) => {
        disabledFlagButton.value = !(
          newItem &&
          newItem.lastname &&
          newItem.name &&
          newItem.type
        )
      },
      { deep: true },
    )

    return {
      uxuiStore,
      userStore,
      selectType,
      selectedType,
      saveChangesHandler,
      setLastName,
      setUsername,
      setSurname,
      dataTypeSet,
      disabledFlagButton,
      deleteUserHandler,
    }
  },
})
