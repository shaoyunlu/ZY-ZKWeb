<template>
    <xmv-layout headHval="0" lWval="200px" mode="t_lr">
        <template #left>
            <c-type-tree></c-type-tree>
        </template>
        <template #right>

        </template>
    </xmv-layout>
</template>

<script>
import {defineComponent} from 'vue'
import cTypeTree from './c_type_tree.vue'
export default defineComponent({
    name:"",
    components:{cTypeTree},
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
