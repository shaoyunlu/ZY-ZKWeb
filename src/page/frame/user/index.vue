<template>
    <!--  操作栏 -->
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
            <xmv-button @click="handleBatchDelete">批量删除</xmv-button>
        </div>
        <div class="__right">
            <xmv-input suffix-icon="search" placeholder="搜索" @iconClick="handleSearch"></xmv-input>
        </div>
    </div>
    <!-- 表格 -->
    <div>
        <zy-table url="user/list" ref="tableRef">
            <xmv-table-column prop="name" label="用户名" />
            <xmv-table-column label="角色">
                <template #default="{props}">
                    <span>{{ props.data.roles[0].name }}</span>
                </template>
            </xmv-table-column>
            <xmv-table-column prop="updateTime" label="更新时间"></xmv-table-column>
        </zy-table>
    </div>

    <!--  表单 -->
    <xmv-dialog v-model="dialogFormVisible" title="用户信息" width="500px">
        <xmv-form ref="formRef" label-width="100px" :mode="formMode" :rules="formRules" class="zy-dialog-form">
            <xmv-form-item label="用户名" prop="name">
                <xmv-input v-model="formMode.name" />
            </xmv-form-item>
            <xmv-form-item label="密码" prop="password">
                <xmv-input v-model="formMode.password" type="password"></xmv-input>
            </xmv-form-item>
            <xmv-form-item label="确认密码" prop="checkPassword">
                <xmv-input v-model="formMode.checkPassword" type="password"></xmv-input>
            </xmv-form-item>
            <xmv-form-item label="角色" prop="roles">
                <xmv-select v-model="formMode.roles">
                    <xmv-option v-for="tmp in roleListRef" 
                        :key="tmp.id" 
                        :value="tmp.id" 
                        :label="tmp.name"></xmv-option>
                </xmv-select>
            </xmv-form-item>
            <xmv-form-item label="邮箱" prop="email">
                <xmv-input v-model="formMode.email"></xmv-input>
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
import {defineComponent ,reactive,ref,onMounted} from 'vue'
import {loadingOpen,loadingClose,messageDialog,confirmDialog} from 'util/dom'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tableRef = ref(null)
        const dialogFormVisible = ref(null)
        const formRef = ref(null)
        const roleListRef = ref([])

        const formMode = reactive({
            name : '',
            password : '',
            checkPassword : '',
            email : '',
            roles : []
        })

        const formRules = reactive({
            name : [{required : true}],
            password : [{required : true}],
            checkPassword : [{required : true}],
            email : [{email : true}],
            roles : [{required : true}]
        })

        const handleAdd = ()=>{
            dialogFormVisible.value = !dialogFormVisible.value
            if (dialogFormVisible.value){

            }
        }

        const handleDialogEnter = ()=>{
            formRef.value.validate().then(()=>{
                
            }).finally(()=>{
                console.log('222')
            })
        }

        const fetchRoleList = ()=>{
            http.get('role/list' ,{
                params : {
                    pageNum : 0,
                    pageSize : 9999
                }
            }).then(data=>{
                roleListRef.value = data.content
            })
        }

        onMounted(()=>{
            fetchRoleList()
        })

        return {tableRef ,dialogFormVisible ,formMode ,formRules ,formRef ,roleListRef,
                handleAdd ,handleDialogEnter}
    }
})
</script>

<style lang="" scoped></style>
