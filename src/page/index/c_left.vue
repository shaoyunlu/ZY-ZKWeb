<template>
    <div>
        <div class="index-logo"></div>
        <div>
            <xmv-menu :data="menuData" ref="menuRef" @nodeClick="handleMenuNodeClick"></xmv-menu>
        </div>
    </div>
</template>

<script>
import {defineComponent ,ref ,onMounted ,nextTick} from 'vue'
import { useRouter ,useRoute} from 'vue-router';
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const router = useRouter()
        const route = useRoute()

        const menuData = ref([])
        const menuRef = ref(null)

        const handleMenuNodeClick = (node)=>{
            router.push({ path: node.value });
        }

        onMounted(()=>{

            http.get('menu/list').then(data =>{
                menuData.value = data

                nextTick(()=>{
                    menuRef.value.activeNode(route.path)
                })
            })

            
        })

        return {menuData ,menuRef ,handleMenuNodeClick}
    }
})
</script>

<style lang="less" scoped>

    .index-logo{
        height: 60px;
        background-color: @level-2-color;
    }

</style>
