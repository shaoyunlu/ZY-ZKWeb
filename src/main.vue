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

        onMounted(()=>{
            router.push('/frame/user')
        })
        return {}
    }
})
</script>

<style lang="" scoped></style>
