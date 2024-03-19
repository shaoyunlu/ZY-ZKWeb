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
import {tranListToTreeDate} from 'util/data'
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
                data.forEach((tmp)=>{
                    tmp.name = tmp.name
                    tmp.value = tmp.url
                })
                let list = tranListToTreeDate(data, 0, "id", "parent_id")
                menuData.value = list

                nextTick(()=>{
                    console.log(menuData.value)
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
