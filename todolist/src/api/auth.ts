import {instance, ResponseType} from "./todolist-api";
import {AxiosResponse} from "axios";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type MeType = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    me: () => {
        return instance.get<ResponseType<MeType>>('auth/me').then(res => {
            return res
        })
    },
    login: (data: LoginParamsType) => {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    logout: () => {
        return instance.delete<ResponseType>('auth/login')
    }
}