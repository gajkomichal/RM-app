<script setup lang="ts">
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
  pageName: {
    type: String,
  },
});
</script>

<template>
  <div class="pagination is-justify-content-between mt-6 mb-3 px-1">
    <div class="flex justify-center pagination-buttons">
      <button
        @click="store.handlePages('prev')"
        class="button is-success"
        :disabled="store.disablePrevBtn"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Prev
      </button>
      <button
        @click="store.handlePages('next')"
        class="button is-success ml-3"
        :disabled="store.disableNextBtn"
      >
        Next
        <i class="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </div>
    <div class="pagination-stats is-size-5 flex justify-center ">
      <span class="mr-3">
        {{ pageName }}: <b>{{ info.count }}</b>
      </span>
      <span>
        Page <b>{{ store.page }}/{{ info.pages }}</b>
      </span>
    </div>
  </div>
</template>
