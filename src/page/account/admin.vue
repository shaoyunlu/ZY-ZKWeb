<template>
    <div class="zy-hor-tools">
        <div class="__left">
            <xmv-button type="primary">新增</xmv-button>
        </div>
        <div class="__right">
            <xmv-button>查询</xmv-button>
        </div>
    </div>
    <div>
        <zy-table url="account/admin/list">
            <xmv-table-column prop="name" label="姓名" />
            <xmv-table-column prop="age" label="年龄" />
            <xmv-table-column prop="gender" label="性别" />
            <xmv-table-column prop="" label="操作">
                <template #default="{props}">
                    <xmv-button link type="primary" size="small"
                        @click="handleDelete(props.data)">删除</xmv-button>
                </template>
            </xmv-table-column>
        </zy-table>
    </div>
</template>

<script>
import {defineComponent,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tableData = ref([])
        const total = ref(0)

        const handleDelete = ()=>{
            console.log('delelte')
        }

        return {tableData,total,handleDelete}
    }
})
</script>

<style lang="" scoped></style>
