<template>
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
        </div>
        <div class="__right">
            
        </div>
    </div>
    <div ref="wrapTableRef" class="news-table-wrap">
        <zy-table url="news/list" ref="tableRef" :lazy="true">
            <xmv-table-column prop="type" label="类别"></xmv-table-column>
            <xmv-table-column prop="title" label="标题"></xmv-table-column>
            <xmv-table-column prop="status" label="状态"></xmv-table-column>
            <xmv-table-column prop="createTime" label="上传时间"></xmv-table-column>
        </zy-table>
    </div>
    <xmv-drawer v-model="drawer" size="800px" :auto-close="false">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>
        <div>
            <c-editor ref="editorRef"></c-editor>
        </div>
        </template>
        <template #footer>
        <div style="flex: auto">
            <xmv-button>取消</xmv-button>
            <xmv-button type="primary" @click="handleEnter">确认</xmv-button>
        </div>
        </template>
    </xmv-drawer>
</template>

<script>
import {defineComponent ,ref ,inject} from 'vue'
import cEditor from 'comp/editor.vue'
export default defineComponent({
    name:"",
    components:{cEditor},
    setup(props ,context) {

        const tableRef = ref(null)
        const drawer = ref(false)
        const wrapTableRef = ref(false)
        const editorRef = ref(null)

        const {$on ,$emit} = inject('EventBus')

        const handleAdd = ()=>{
            drawer.value = true
        }

        $on('loadTable' ,()=>{
            wrapTableRef.value.style.opacity = 1
            tableRef.value.fetchData()
        })

        const handleEnter = ()=>{
            let htmlStr = editorRef.value.editorRef.getHtml()
            console.log(htmlStr)
        }

        return {tableRef ,drawer ,wrapTableRef ,editorRef ,handleAdd,handleEnter}
    }
})
</script>

<style lang="less" scoped>
    .news-table-wrap{
        opacity: 0;
    }
</style>
