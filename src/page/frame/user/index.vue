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
</template>

<script>
import {defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tableRef = ref(null)
        return {tableRef}
    }
})
</script>

<style lang="" scoped></style>
