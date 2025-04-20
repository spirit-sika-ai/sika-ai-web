import {onMounted, ref, watch} from 'vue'
import {JSEncrypt} from "jsencrypt";
import {postLogin, postRegister, requestPublicKey} from '@/api/auth.ts'
import {cloneDeep} from 'lodash'
import {useRouter} from 'vue-router'
import type {User} from "@/type/BaseType.ts";
import type {RequiredKeys} from "@/type/TypeConstructor.ts";
import {useUserStore} from "@/stores/user.ts";

export const useLoginHooks = () => {
  // 用户token处理与本地持久化
  const {updateToken} = useUserStore()
  const router = useRouter()
  // 公钥处理
  const publicKey = ref<string>('')
  const encrypt = new JSEncrypt()
  // 处理用户登录数据
  const loginUser = ref<RequiredKeys<User, 'username' | 'password'>>({
    username: '',
    password: '',
  })

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

  // 加密登录/注册对象
  function encryptUserModel(model: Partial<User>) {
    if (!publicKey.value || !encrypt || !encrypt.getPublicKey()) {
      throw new Error('encrypt tool error')
    }
    const username = encrypt.encrypt(model.username ?? '').toString()
    const password = encrypt.encrypt(model.password ?? '').toString()
    const result = cloneDeep(model)
    result.username = username
    result.password = password
    if (typeof model.nickname === 'string' && model.nickname.length > 0) {
      result.nickname = model.nickname
    }
    return {
      user: result as RequiredKeys<User, 'username' | 'password'>,
      captcha: ''
    }
  }

  function handleLogin() {
    // 使用公钥加密用户对象
    const encryptedUser = encryptUserModel(loginUser.value)
    postLogin(encryptedUser)
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        // 登录成功存储token并跳转
        updateToken(res.result)
        return router.push('/chat')
      })
      .then(() => ElMessage.success('登录成功'))
      .catch(ElMessage.error)
  }

  /**
   * 接收用户, 对敏感信息(用户名&密码)进行公钥加密后提交注册
   */
  function handleRegister() {
    // 使用公钥加密用户对象
    const {user} = encryptUserModel(loginUser.value)
    postRegister({
      username: user.username,
      password: user.password,
      nickname: user.nickname
    })
      .then(res => {
        if (res.code !== 200) {
          throw res.message
        }
        updateToken(res.result)
      })
      .then(() => {
        return router.push('chat')
      })
      .then(() => {
        ElMessage.success('注册成功')
      })
      .catch(ElMessage.error)
  }

  onMounted(() => {
    loadPublicKey()
  })

  return {
    loginUser,
    handleLogin,
    handleRegister
  }
}