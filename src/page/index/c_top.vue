<template>
    <div class="index-top">
        <div class="right">
            <xmv-dropdown @item-click="handleItemClick">
                <div class="user">
                    {{ g_user.realName.substr(0,1) }}
                </div>
                <template #dropdown>
                    <xmv-dropdown-menu>
                        <xmv-dropdown-item item-value="1">修改密码</xmv-dropdown-item>
                        <xmv-dropdown-item item-value="2" @click="handleExit">退出</xmv-dropdown-item>
                    </xmv-dropdown-menu>
                </template>
            </xmv-dropdown>
        </div>
        
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'
import {g_user} from 'data/runtime'
import {confirmDialog} from 'util/dom'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const router = useRouter()

        const handleItemClick = (val)=>{
            switch (val) {
                case "1":
                    handleUpdatePassword()
                    break;
                case "2":
                    handleExit()
                    break;
                default:
                    break;
            }
        }

        const handleExit = ()=>{
            confirmDialog('确认要退出么？' ,()=>{
                http.post('/logout').then(res=>{
                    router.push('/login')
                })
            })
        }

        return {g_user ,handleItemClick,handleExit}
    }
})
</script>

<style lang="less" scoped>
    .index-top{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        height: 100%;
        background-color: @level-1-color;
        padding-right: 50px;

        .user{
            display: inline-block;
            background-color: palegoldenrod;
            border-radius: 40px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            text-align: center;
            cursor: default;
        }
    }
</style>
