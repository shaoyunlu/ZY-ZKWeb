<template>
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
            <xmv-button @click="handleBatchDelete">批量删除</xmv-button>
        </div>
        <div class="__right">
            <xmv-input suffix-icon="search" placeholder="搜索" @iconClick="handleSearch"></xmv-input>
        </div>
    </div>
    <div>
        <zy-table url="account/admin/list" ref="tableRef">
            <xmv-table-column type="checkbox" width="55" />
            <xmv-table-column prop="name" label="姓名">
                <template #default="{props}">
                    <span @click="handleDetail(props.data)" class="admin-table-col-name">{{ props.data.name }}</span>
                </template>
            </xmv-table-column>
            <xmv-table-column prop="age" label="年龄" />
            <xmv-table-column prop="gender" label="性别">
                <template #default="{props}">
                    <span>{{ props.data.gender == '1' ? '男' : '女' }}</span>
                </template>
            </xmv-table-column>
            <xmv-table-column prop="status" label="账号状态" sortable>
                <template #default="{props}">
                    <span :class="computeTableStatus(props.data.status)">{{ statusMapping[props.data.status].text }}</span>
                </template>
            </xmv-table-column>
            <xmv-table-column prop="" label="操作">
                <template #default="{props}">
                    <xmv-button link type="primary" size="small" class="admin-op-audit" :class="computeTableStatus(props.data.status)"
                        @click="handleDelete(props.data)">审核</xmv-button>
                    <xmv-button link type="primary" size="small" class="admin-op-forbid" :class="computeTableStatus(props.data.status)"
                        @click="handleDelete(props.data)">{{ props.data.status == 2 ? '正常' : '禁止' }}</xmv-button>
                    <xmv-button link type="primary" size="small" class="admin-op-delete" :class="computeTableStatus(props.data.status)"
                        @click="handleDelete(props.data)">删除</xmv-button>
                </template>
            </xmv-table-column>
        </zy-table>
    </div>
    <xmv-dialog v-model="dialogFormVisible" title="编辑" width="550px">
        <xmv-form ref="formRef" :mode="form" label-width="100px" :rules="rules" class="zy-dialog-form">
            <xmv-form-item label="姓名" prop="name">
                <xmv-input v-model="form.name" autocomplete="off" />
            </xmv-form-item>
            <xmv-form-item label="年龄" prop="age">
                <xmv-input-number v-model="form.age"></xmv-input-number>
            </xmv-form-item>
            <xmv-form-item label="性别" prop="gender">
                <xmv-radio-group v-model="form.gender">
                    <xmv-radio label="male">男</xmv-radio>
                    <xmv-radio label="female">女</xmv-radio>
                </xmv-radio-group>
            </xmv-form-item>
        </xmv-form>
        <template #footer>
                <span class="dialog-footer">
                    <xmv-button @click="dialogFormVisible = false">取消</xmv-button>
                    <xmv-button type="primary" @click="handleDialogEnter">
                        确认
                    </xmv-button>
                </span>
            </template>
    </xmv-dialog>

    <xmv-dialog v-model="dialogDetailVisible" title="详情" width="550px">
        <div class="zy-dialog">
            <xmv-row>
                <xmv-col :span="8">姓名</xmv-col>
                <xmv-col :span="6">{{ detailDataRef.name }}</xmv-col>
            </xmv-row>
            <xmv-row>
                <xmv-col :span="8">年龄</xmv-col>
                <xmv-col :span="6">{{ detailDataRef.age }}</xmv-col>
            </xmv-row>
            <xmv-row>
                <xmv-col :span="8">性别</xmv-col>
                <xmv-col :span="6">{{ genderMapping[detailDataRef.gender] && genderMapping[detailDataRef.gender].text }}</xmv-col>
            </xmv-row>
            <xmv-row>
                <xmv-col :span="8">更新时间</xmv-col>
                <xmv-col :span="6">{{ detailDataRef.updateTime }}</xmv-col>
            </xmv-row>
        </div>
    </xmv-dialog>
</template>

<script>
import {defineComponent,ref,reactive} from 'vue'
import {loadingOpen,loadingClose,messageDialog,confirmDialog} from 'util/dom'
import http from 'util/http'
import {isEmpty} from 'util/data'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tableData = ref([])
        const total = ref(0)

        const formRef = ref(null)
        const tableRef = ref(null)

        const genderMapping = {
            1 : {text : '男'},
            2 : {text : '女'}
        }

        const statusMapping = {
            1 :  {text : '正常' ,className : 'admin-status-normal'},
            2 :  {text : '禁止' ,className : 'admin-status-forbidden'},
            3 :  {text : '待审核' ,className : 'admin-status-toAudit'}
        }

        const dialogFormVisible = ref(false)
        const dialogDetailVisible = ref(false)
        const detailDataRef = ref({})
        const form = reactive({
            name : '',
            age : '',
            gender : ''
        })

        const rules = reactive({
            name : [{required : true}],
            age : [{required : true}],
            gender : [{required : true}]
        })

        const handleAdd = ()=>{
            dialogFormVisible.value = true
        }

        const handleDelete = (rowData)=>{
            confirmDialog('确认要删除么？',()=>{
                console.dir(rowData)
            })
        }

        const handleBatchDelete = ()=>{
            let data = tableRef.value.getSelectedData()
            if (data.length == 0){
                messageDialog('请至少选择一条记录。' ,'info')
            }else{
                console.log(data)
            }
        }

        const handleSearch = (val)=>{
            tableRef.value.fetchData()
        }

        const __formSubmit = ()=>{
            loadingOpen()
            http.post('account/admin/add' ,form).then(res=>{
                loadingClose()
                dialogFormVisible.value = false
                messageDialog()
                tableRef.value.refresh()
            })
        }

        const handleDialogEnter = ()=>{
            formRef.value.validate().then(()=>{
                __formSubmit()
            }).catch(msg=>{
                loadingClose()
            })
        }

        const handleDetail = (rowData)=>{
            detailDataRef.value = rowData
            dialogDetailVisible.value = true
        }

        const computeTableStatus = (status)=>{
            return statusMapping[status].className
        }

        return {tableData,total,dialogFormVisible,form,rules,formRef,
                tableRef,statusMapping,dialogDetailVisible,detailDataRef,genderMapping,
                handleDelete,handleAdd,handleDialogEnter,handleSearch,handleBatchDelete,computeTableStatus,
                handleDetail}
    }
})
</script>

<style lang="less" scoped>
    span.admin-status-toAudit{
        color : gray;
    }
    span.admin-status-forbidden{
        color : red;
    }
    span.admin-status-normal{
        color : green;
    }

    .admin-op-audit{
        color: gray;
        &:hover{
            color: gray;
        }
        &.admin-status-toAudit{
            color: #409eff;
            &:hover{
                opacity: 0.7;
            }
        }
    }

    .admin-table-col-name{
        color: #409eff;
        cursor: pointer;
    }
</style>
