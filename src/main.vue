<template>
    <router-view></router-view>
</template>

<script>
import {defineComponent,onMounted} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
    name:"",
    setup(props ,context) {

        const router = useRouter()

        // 需要先验证 token 是否有效

        onMounted(()=>{
            router.push('/login')
        })
        return {}
    }
})
</script>

<style lang="" scoped></style>
