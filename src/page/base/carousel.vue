<template>
  <div class="carousel-upload">
    <xmv-upload :file-list="fileList" drag :limit="1" @uploadDone="handleUploadDone">
      <xmv-icon name="uploadFilled" class="xmv-icon--upload"></xmv-icon>
      <div class="xmv-upload__text">
        点击上传轮播图
      </div>
    </xmv-upload>
  </div>

  <draggable v-model="items" v-bind="dragOptions" class="flex-container" item-key="id" @end="handleDragEnd">
    <template #item="{ element }">
      <div class="flex-item" :key="element.id">
        <xmv-image :src="element.url"></xmv-image>
        <div class="flex-item-mask">
          <xmv-button @click="handleItemDelete(element)">删除</xmv-button>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { loadingOpen, loadingClose, messageDialog, confirmDialog } from 'util/dom'
import draggable from 'vuedraggable'
import http from 'util/http'

export default defineComponent({
  components: {
    draggable,
  },
  setup() {
    const items = ref([]);
    const fileList = ref([])

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    })

    const fetchData = () => {
      loadingOpen()
      http.get('base/carousel/list').then(data => {
        loadingClose()
        items.value = data
      })
    }

    const handleUploadDone = (formFileList) => {
      let formFile = formFileList[0]
      __addPic(formFile)
    }

    const handleDragEnd = () => {
      __adjustOrder()
    }

    const handleItemDelete = (item) => {
      confirmDialog('确认要删除么？', () => {
        __delPic(item)
      })
    }

    const __addPic = (formFile) => {
      loadingOpen()
      const formData = new FormData()
      formData.append('image', formFile.obj)
      http.post('base/carousel/pic/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        loadingClose()
        items.value.push({ id: res.is, url: res.url })
      }).catch(err => {
        loadingClose()
      })
    }

    const __adjustOrder = () => {
      loadingOpen()
      http.post('base/carousel/order/adjust', items.value).then(res => {
        loadingClose()
      })
    }

    const __delPic = (item) => {
      loadingOpen()
      http.post('base/carousel/pic/delete', { id: item.id }).then(res => {
        loadingClose()
        messageDialog()
        items.value = items.value.filter(tmp => tmp.id !== item.id)
      })
    }

    onMounted(() => {
      fetchData()
    })

    return { items, dragOptions, fileList, handleUploadDone, handleDragEnd, handleItemDelete };
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

.flex-item-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.flex-item {
  position: relative;
  transition: transform 0.3s ease;
  width: 180px;
  height: 320px;
  margin: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  cursor: grab;
  float: left;
}

.flex-item:hover .flex-item-mask {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Optional: Add additional styles for dragging state */
.flex-item.dragging {
  opacity: 0.6;
}

.carousel-upload {
  width: 180px;

  .xmv-upload-list {
    display: none;
  }
}
</style>
