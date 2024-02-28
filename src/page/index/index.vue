<template>
    <xmv-layout headHval="60px" lWval="200px" mode="l_tr">
        <template #top>
            <c-top></c-top>
        </template>
        <template #left>
            <div class="index-left">
                <c-left></c-left>
            </div>
        </template>
        <template #right>
            <div class="index-right">
                <router-view></router-view>
            </div>
        </template>
    </xmv-layout>
</template>

<script>
import {defineComponent} from 'vue'
import cLeft from './c_left'
import cTop from './c_top'
export default defineComponent({
    name:"",
    components : {cLeft,cTop},
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="less" scoped>
    .index-left{
        height: 100%;
        border-right: 1px solid #ddd;
    }
    .index-right{
        height: 100%;
        padding: 10px;
    }
</style>
