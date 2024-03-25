import { reactive } from "vue";

export const g_user = reactive({
    name : '',
    realName : ''
})

export function setUser(userDto){
    g_user.name = userDto.name
    g_user.realName = userDto.realName
}

export function clearUser(){
    g_user.name = ''
    g_user.realName = ''
}