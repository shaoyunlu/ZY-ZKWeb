<template>
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
            <xmv-button>批量删除</xmv-button>
        </div>
        <div class="__right">
            <xmv-input suffix-icon="search" placeholder="搜索"></xmv-input>
        </div>
    </div>
    <div>
        <zy-table url="account/admin/list" ref="tableRef">
            <xmv-table-column type="checkbox" width="55" />
            <xmv-table-column prop="name" label="姓名" />
            <xmv-table-column prop="age" label="年龄" />
            <xmv-table-column prop="gender" label="性别" />
            <xmv-table-column prop="" label="操作">
                <template #default="{props}">
                    <xmv-button link type="primary" size="small"
                        @click="handleDelete(props.data)">审核</xmv-button>
                    <xmv-button link type="primary" size="small"
                        @click="handleDelete(props.data)">删除</xmv-button>
                </template>
            </xmv-table-column>
        </zy-table>
    </div>
    <xmv-dialog v-model="dialogFormVisible" title="管理员编辑">
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
</template>

<script>
import {defineComponent,ref,reactive} from 'vue'
import {loadingOpen,loadingClose,message} from 'util/dom'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tableData = ref([])
        const total = ref(0)

        const formRef = ref(null)
        const tableRef = ref(null)

        const dialogFormVisible = ref(false)
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

        const handleDelete = ()=>{
            console.log(tableRef.value.xmvTableRef.data)
        }

        const __formSubmit = ()=>{
            loadingOpen()
            http.post('account/admin/add' ,form).then(res=>{
                loadingClose()
                dialogFormVisible.value = false
                message()
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

        return {tableData,total,dialogFormVisible,form,rules,formRef,
                tableRef,
                handleDelete,handleAdd,handleDialogEnter}
    }
})
</script>

<style lang="" scoped></style>
