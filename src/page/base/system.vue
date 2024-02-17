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
            </zy-table>
        </div>
    </div>
</template>

<script>
import {defineComponent,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const fileList = ref([])
        const tableRef = ref(null)
        return {fileList,tableRef}
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
