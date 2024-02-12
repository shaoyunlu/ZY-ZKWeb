<template>
    <xmv-layout headHval="60px" lWval="200px" mode="l_tr">
        <template #top>
            <c-top></c-top>
        </template>
        <template #left>
            <c-left></c-left>
        </template>
        <template #right>
            <router-view></router-view>
        </template>
    </xmv-layout>
</template>

<script>
import {defineComponent} from 'vue'
import cLeft from './c_left.vue'
import cTop from './c_top.vue'
export default defineComponent({
    name:"",
    components : {cLeft,cTop},
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
