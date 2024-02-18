<template>

  <div>
      <xmv-upload :file-list="fileList" drag :limit="1">
          <xmv-icon name="uploadFilled" class="xmv-icon--upload"></xmv-icon>
          <div class="xmv-upload__text">
              点击上传系统 logo 
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

    return { items ,dragOptions };
  },
});
</script>

<style>
  .flex-container {
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .flex-item {
    transition: transform 0.3s ease;
    width: 320px;
    height: 180px;
    margin: 5px;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    cursor: grab;
    float: left;
  }

  /* Optional: Add additional styles for dragging state */
  .flex-item.dragging {
    opacity: 0.6;
  }
</style>
