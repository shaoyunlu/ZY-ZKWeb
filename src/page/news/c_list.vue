<template>
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
        </div>
        <div class="__right">
            
        </div>
    </div>
    <div>
        <zy-table url="news/list" ref="tableRef" :lazy="true">
            <xmv-table-column prop="type" label="类别"></xmv-table-column>
            <xmv-table-column prop="title" label="标题"></xmv-table-column>
            <xmv-table-column prop="status" label="状态"></xmv-table-column>
            <xmv-table-column prop="createTime" label="上传时间"></xmv-table-column>
        </zy-table>
    </div>
</template>

<script>
import {defineComponent ,ref ,inject} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const tableRef = ref(null)
        const {$on ,$emit} = inject('EventBus')

        const handleAdd = ()=>{

        }

        $on('loadTable' ,()=>{
            tableRef.value.fetchData()
        })

        return {handleAdd ,tableRef}
    }
})
</script>

<style lang="" scoped></style>
