<template>
    <h3>LOGO上传</h3>
    <div class="system-logo">
        <xmv-upload :file-list="fileList" drag :limit="1">
            <xmv-image style="width: 100px; height: 100px" 
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="contain"/>
            <div class="xmv-upload__text">
                点击上传系统 logo 
            </div>
        </xmv-upload>
    </div>
    <h3>公告</h3>
    <div class="system-bulletin">
        <div class="zy-hor-tools">
            <div class="__left">
                <xmv-button type="primary" @click="handleAdd">新增</xmv-button>
            </div>
            <div class="__right">
                
            </div>
        </div>
        <div>
            <zy-table url="base/system/bulletin/list" ref="tableRef">
                <xmv-table-column prop="content" label="内容"></xmv-table-column>
                <xmv-table-column prop="createTime" label="创建时间" width="200"></xmv-table-column>
                <xmv-table-column prop="" label="操作" width="150">
                    <template #default="{props}">
                        <xmv-button link type="primary" size="small" @click="handleDelete(props.data)">删除</xmv-button>
                    </template>
                </xmv-table-column>
            </zy-table>
        </div>
    </div>
    <xmv-dialog v-model="dialogFormVisible" title="编辑" width="600px">
        <xmv-form ref="formRef" :mode="form" :rules="rules" label-width="60px">
            <xmv-form-item label="内容" prop="content">
                <xmv-input v-model="form.content" type="textarea" :rows="6"/>
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
import {defineComponent,nextTick,reactive,ref} from 'vue'
import {loadingOpen,loadingClose,messageDialog,confirmDialog} from 'util/dom'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const fileList = ref([])
        const tableRef = ref(null)
        const dialogFormVisible = ref(null)
        const formRef = ref(null)
        const form = reactive({
            content : ''
        })

        const rules = reactive({
            content : [{required : true}]
        })

        const formReset = ()=>{
            form.content = ''
            nextTick(()=>{
                formRef.value.reset()
            })
        }

        const handleAdd = ()=>{
            formReset()
            dialogFormVisible.value = true
        }

        const handleDialogEnter = ()=>{
            formRef.value.validate().then(()=>{
                loadingOpen()
                http.post('base/system/bulletin/add' ,form).then(()=>{
                    loadingClose()
                    dialogFormVisible.value = false
                    messageDialog()
                    tableRef.value.refresh()
                })
            })
        }

        return {fileList,tableRef,dialogFormVisible,form,rules,formRef,
                handleAdd,handleDialogEnter}
    }
})
</script>

<style lang="less">
    .system-logo{
        width : 500px;
        .xmv-upload-dragger{
            padding:10px 0;
        }
    }
</style>
