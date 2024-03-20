<template>
    <div class="zy-table" ref="tableRef">
        <xmv-table :data="tableData" ref="xmvTableRef" v-loading="loading">
            <slot></slot>
        </xmv-table>
        <div class="zy-table-divider"></div>
        <xmv-pagination 
                ref="paginationRef"
                :total="total" 
                v-model:page-size="pageSizeMode" 
                layout="size,prev,pager,next"
                @changeNumber="handleChangeNumber"></xmv-pagination>
    </div>
</template>

<script>
import {defineComponent,ref,onMounted, nextTick} from 'vue'
import {isEmpty} from 'util/data'
import http from 'util/http'
export default defineComponent({
    name:"",
    props:{
        url : String,
        lazy : {type : Boolean ,default : false}
    },
    setup(props ,context) {

        const xmvTableRef = ref(null)
        const tableRef = ref(null)

        const loading = ref(false)
        const paginationRef = ref(null)

        const total = ref(0)
        const tableData = ref([])

        const pageSizeMode = ref(10)

        const handleChangeNumber = ()=>{
            fetchData(false)
        }

        const fetchData = (hidepager = true)=>{
            hidepager && (total.value = 0)
            loading.value = true
            let pageInfo = paginationRef.value.getPageInfo()
            http.get(props.url ,{
                params : {
                    pageNum : pageInfo.pageNum - 1,
                    pageSize : pageInfo.pageSize
                }
            }).then(data=>{
                loading.value = false
                tableData.value = data.content
                total.value = data.totalElements
            })
        }

        const getSelectedData = ()=>{
            let data = xmvTableRef.value.data
            return data.filter((tmp=>tmp.checked))
        }

        const refresh = ()=>{
            fetchData()
        }

        onMounted(()=>{
            if (!props.lazy){
                fetchData()
            }
        })

        return {pageSizeMode,total,tableData,paginationRef,loading,
                xmvTableRef,tableRef,
                handleChangeNumber,refresh,fetchData,getSelectedData}
    }
})
</script>

<style lang="less">
    .zy-table{
        position: relative;
    }
    .zy-table-divider{
        height: 10px;
    }
</style>
