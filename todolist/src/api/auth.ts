import {instance} from "./todolist-api";

export const authApi = {
    me: () => {
        return instance.get('auth/me').then(res => {
            return res
        })
    }
}