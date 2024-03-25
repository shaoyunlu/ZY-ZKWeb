<template>
    <router-view></router-view>
</template>

<script>
import {defineComponent,onMounted} from 'vue'
import {useRouter ,useRoute} from 'vue-router'
import http from 'util/http'
import {g_user ,setUser ,clearUser} from 'data/runtime'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const router = useRouter()
        const route = useRoute()

        onMounted(()=>{
            http.get('session/user').then(res=>{
                if (res ==null || route.path == "/login"){
                    clearUser()
                    router.push('/login')
                }else{
                    setUser(res)
                    router.push('/frame/user')
                }
            })
        })
        return {}
    }
})
</script>

<style lang="" scoped></style>
