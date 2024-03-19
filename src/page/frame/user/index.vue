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
        <zy-table url="zk/user/list" ref="tableRef">
            <xmv-table-column prop="name" label="用户名" />
            <xmv-table-column prop="email" label="邮箱" />
        </zy-table>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
