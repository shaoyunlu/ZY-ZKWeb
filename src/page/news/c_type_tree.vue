<template>
    <div class="news-type-tree">
        <xmv-tree :data="data">
            <template #default="{node}">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span class="__icon-delete">
                        <xmv-icon name="dlt"></xmv-icon>
                    </span>
                </span>
            </template>
        </xmv-tree>
    </div>
</template>

<script>
import {defineComponent,ref,onMounted} from 'vue'
import { loadingOpen, loadingClose, messageDialog, confirmDialog } from 'util/dom'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const data = ref([])

        const __fetchData = ()=>{
            loadingOpen()
            http.get('news/type/tree').then(__data => {
                loadingClose()
                data.value = __data
            })
        }

        onMounted(()=>{
            __fetchData()
        })

        return {data}
    }
})
</script>

<style lang="less">
    .news-type-tree{
        .xmv-tree-node{
            position: relative;
        }
    }

    .custom-tree-node{
        .__icon-delete{
            display: none;
            position: absolute;
            right: 0;
            top: 0;
        }
        &:hover{
            .__icon-delete{
                display: block;
            }
        }
    }
</style>
