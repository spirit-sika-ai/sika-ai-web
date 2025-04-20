import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref<string>('')
    function updateToken (token: string)  {
      userToken.value = token
    }
    return {
      userToken,
      updateToken
    }
  },
  {
    persist: true,
  }
)