import {onMounted, ref, watch} from 'vue'
import {JSEncrypt} from "jsencrypt";
import {postLogin, requestPublicKey} from '@/api/auth.ts'
import {cloneDeep} from 'lodash'
import {useRouter} from 'vue-router'
import type {User} from "@/type/BaseType.ts";
import type {RequiredKeys} from "@/type/TypeConstructor.ts";

export const useLoginHooks = () => {
  const router = useRouter()
  const publicKey = ref<string>('')
  const encrypt = new JSEncrypt()

  watch(publicKey, newVal => {
    encrypt.setPublicKey(newVal)
  })

  // 获取公钥
  function loadPublicKey() {
    requestPublicKey()
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        publicKey.value = res.result
      })
      .catch(ElMessage.error)
  }

  // 加密登录对象
  function encryptLoginModel(model: Partial<User>): {user: RequiredKeys<User, 'username' | 'password'>, captcha?: string} {
    if (!publicKey.value || !encrypt || !encrypt.getPublicKey()) {
      throw new Error('encrypt tool error')
    }
    const username = encrypt.encrypt(model.username ?? '').toString()
    const password = encrypt.encrypt(model.password ?? '').toString()
    const result = cloneDeep(model)
    result.username = username
    result.password = password
    return {
      user: result as RequiredKeys<User, 'username' | 'password'>,
      captcha: ''
    }
  }

  const loginUser = ref<RequiredKeys<User, 'username' | 'password'>>({
    username: '',
    password: '',
  })

  function handleLogin() {
    const encryptedUser = encryptLoginModel(loginUser.value)
    postLogin(encryptedUser)
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        return router.push('/chat')
      })
      .then(() => ElMessage.success('登录成功'))
      .catch(ElMessage.error)
  }

  onMounted(() => {
    loadPublicKey()
  })

  return {
    loginUser,
    handleLogin,
  }
}