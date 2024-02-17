<template>
    <xmv-table :data="tableData" v-loading="loading" ref="xmvTableRef">
        <slot></slot>
    </xmv-table>
    <div class="zy-table-divider"></div>
    <div v-show="isPaginationShow">
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
        url : String
    },
    setup(props ,context) {

        const xmvTableRef = ref(null)

        const loading = ref(false)
        const paginationRef = ref(null)
        const isPaginationShow = ref(false)

        const total = ref(0)
        const tableData = ref([])

        const pageSizeMode = ref(10)

        const handleChangeNumber = ()=>{
            __fetchData()
        }

        const __fetchData = ()=>{
            loading.value = true
            isPaginationShow.value = false
            let pageInfo = paginationRef.value.getPageInfo()
            http.get(props.url ,{
                params : {
                    pageNum : pageInfo.pageNum,
                    pageSize : pageInfo.pageSize
                }
            }).then(data=>{
                isPaginationShow.value = !isEmpty(data.list)
                loading.value = false
                tableData.value = data.list
                total.value = data.total
            })
        }

        const refresh = ()=>{
            __fetchData()
        }

        onMounted(()=>{
            __fetchData()
        })

        return {pageSizeMode,total,tableData,paginationRef,isPaginationShow,loading,
                xmvTableRef,
                handleChangeNumber,refresh}
    }
})
</script>

<style lang="less">
    .zy-table-divider{
        height: 10px;
    }
</style>
