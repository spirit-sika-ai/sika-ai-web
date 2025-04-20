import {get, post} from "@/util/request.ts";
import type {RequiredKeys} from "@/type/TypeConstructor.ts";
import type {User} from "@/type/BaseType.ts";

export const requestPublicKey = async () => {
  return get<string>('auth/public-key')
}

type loginDto = {
  user: RequiredKeys<User, 'username' | 'password'>,
  captcha?: string
}
export const postLogin = async (userDto: loginDto) => {
  return post<string>('auth', userDto)
}

export const postRegister = async (registerDto: Pick<User, 'username' | 'password'> & Partial<Pick<User, 'nickname'>>) => {
  return post<string>('auth/register', registerDto)
}