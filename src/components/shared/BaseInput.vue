<script setup>
const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits('update:modelValue');
</script>

<template>
  <div class="flex items-center p-2">
    <label class="w-24 px-4" v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="ml-8 h-10 w-72 rounded border-4 border-indigo-500/50 px-2"
    />
  </div>
</template>
