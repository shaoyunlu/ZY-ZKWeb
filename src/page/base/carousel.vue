<template>

  <div class="carousel-upload">
      <xmv-upload :file-list="fileList" drag :limit="1">
          <xmv-icon name="uploadFilled" class="xmv-icon--upload"></xmv-icon>
          <div class="xmv-upload__text">
              点击上传轮播图
          </div>
      </xmv-upload>
  </div>

  <draggable v-model="items" v-bind="dragOptions" class="flex-container" item-key="id">
    <template #item="{ element }">
      <div class="flex-item" :key="element.id">
        <xmv-image :src="element.url"></xmv-image>
      </div>
    </template>
  </draggable>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import {loadingOpen,loadingClose,messageDialog,confirmDialog} from 'util/dom'
import draggable from 'vuedraggable'
import http from 'util/http'

export default defineComponent({
  components: {
    draggable,
  },
  setup() {
    const items = ref([]);
    const fileList = ref([])

   const dragOptions = computed(()=>{
      return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
      }
   })

   const fetchData = ()=>{
      loadingOpen()
      http.get('base/carousel/list').then(data=>{
          loadingClose()
          items.value = data
      })
   }

   onMounted(()=>{
      fetchData()
   })

    return { items ,dragOptions ,fileList};
  },
});
</script>

<style lang="less">
  .flex-container {
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .flex-item {
    transition: transform 0.3s ease;
    width: 180px;
    height: 320px;
    margin: 5px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    cursor: grab;
    float: left;
  }

  /* Optional: Add additional styles for dragging state */
  .flex-item.dragging {
    opacity: 0.6;
  }

  .carousel-upload{
    width : 180px;
    .xmv-upload-list{
      display: none;
    }
  }
</style>
