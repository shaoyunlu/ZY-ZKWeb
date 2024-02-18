<template>
    <draggable v-model="items" v-bind="dragOptions" class="flex-container" item-key="id">
      <template #item="{ element }">
        <div class="flex-item" :key="element.id">{{ element.name }}</div>
      </template>
    </draggable>
  </template>
  
  <script>
  import { computed, defineComponent, ref } from 'vue';
  import draggable from 'vuedraggable';
  
  export default defineComponent({
    components: {
      draggable,
    },
    setup() {
      const items = ref([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
      ]);
  
     const dragOptions = computed(()=>{
        return {
            animation: 200,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
        }
     })

      return { items ,dragOptions };
    },
  });
  </script>
  
  <style>
 .flex-container {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
}

.flex-item {
  transition: transform 0.3s ease;
  margin: 5px;
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  cursor: grab;
}

/* Optional: Add additional styles for dragging state */
.flex-item.dragging {
  opacity: 0.6;
}
  </style>
  