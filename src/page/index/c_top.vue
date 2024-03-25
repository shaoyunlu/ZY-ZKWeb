<template>
    <div class="index-top">
        <div class="right">
            <xmv-dropdown @item-click="handleItemClick">
                <div class="user">
                    {{ g_user.realName.substr(0,1) }}
                </div>
                <template #dropdown>
                    <xmv-dropdown-menu>
                        <xmv-dropdown-item>修改密码</xmv-dropdown-item>
                        <xmv-dropdown-item>退出</xmv-dropdown-item>
                    </xmv-dropdown-menu>
                </template>
            </xmv-dropdown>
        </div>
        
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {g_user} from 'data/runtime'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const handleItemClick = ()=>{

        }

        return {g_user ,handleItemClick}
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
