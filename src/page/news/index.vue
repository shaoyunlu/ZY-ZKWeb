<template>
    <div class="zk-news">
        <xmv-layout headHval="0" lWval="150px" mode="t_lr">
            <template #left>
                <div>
                    <c-type-tree></c-type-tree>
                </div>
            </template>
            <template #right>
                <c-list></c-list>
            </template>
        </xmv-layout>
    </div>
</template>

<script>
import {defineComponent,reactive,provide} from 'vue'
import cTypeTree from './c_type_tree.vue'
import cList from './c_list.vue'
import {createEventBus} from 'util/event'
export default defineComponent({
    name:"",
    components:{cTypeTree,cList},
    setup(props ,context) {

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        provide('EventBus' ,{$on ,$emit})

        return {}
    }
})
</script>

<style lang="" scoped></style>
