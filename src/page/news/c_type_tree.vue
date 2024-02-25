<template>
    <div class="news-type-tree">
        <div>
            <xmv-button @click="handleAdd">新增</xmv-button>
        </div>
        <xmv-tree :data="data" ref="treeRef" @nodeClick="handleNodeClick">
            <template #default="{node}">
                <span class="xmv-tree-node__label">
                    <span>{{ node.label }}</span>
                    <span class="__icon-delete" @click="handleDelete(node)" v-if="node.value != '0'">
                        <xmv-icon name="dlt"></xmv-icon>
                    </span>
                </span>
            </template>
        </xmv-tree>
    </div>
</template>

<script>
import {defineComponent,ref,onMounted, nextTick ,inject} from 'vue'
import { loadingOpen, loadingClose, messageDialog, confirmDialog } from 'util/dom'
import {XmvMessageBox} from 'xiaomeng-vue-ui'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const data = ref([])
        const treeRef = ref(null)

        const {$on ,$emit} = inject('EventBus')

        const __fetchData = (cbf)=>{
            loadingOpen()
            http.get('news/type/tree').then(__data => {
                loadingClose()
                data.value = __data
                nextTick(()=>{
                    treeRef.value.expandNodeByLevel(0)
                    cbf && cbf()
                })
            })
        }

        const handleAdd = ()=>{
            XmvMessageBox.prompt('类别名称' ,'新闻类别' ,{
                    inputPattern:/^\s*\S.*$/,
                    inputErrorMessage: '字段不能为空'
                }).then(val=>{
                    loadingOpen()
                    http.post('news/type/tree/add',{label:val}).then(data=>{
                        loadingClose()
                        messageDialog()
                        __fetchData()
                    })
                })
        }

        const handleDelete = (node)=>{
            confirmDialog('确认要删除么？',()=>{
                loadingOpen()
                http.post('news/type/tree/delete' ,{value:node.value}).then(__data=>{
                    loadingClose()
                    messageDialog()
                    __fetchData()
                })
            })
        }

        const handleNodeClick =(node)=>{
            $emit('loadTable')
        }

        onMounted(()=>{
            __fetchData(()=>{
                // 可以加载表格了
                $emit('loadTable')
            })
        })

        return {treeRef,data,handleDelete,handleAdd,handleNodeClick}
    }
})
</script>

<style lang="less">
    .news-type-tree{
        .xmv-tree-node{
            position: relative;
        }
    }

    .xmv-tree-node > .xmv-tree-node__content > .xmv-tree-node__label > .__icon-delete{
        display: none;
        position: absolute;
        right: 0;
        top: 0;
    }

    .xmv-tree-node:hover > .xmv-tree-node__content > .xmv-tree-node__label > .__icon-delete {
        display: block;
    }

</style>
