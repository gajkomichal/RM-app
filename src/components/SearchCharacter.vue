<script setup lang="ts">
import { useStoreCharacters } from '@/@Stores/charactersStore';

const storeCharacters = useStoreCharacters();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits('update:modelValue');
</script>

<template>
  <div class="">
    <input
      :value="modelValue"
      @keyup.enter="storeCharacters.getAllCharacters((page = 1), modelValue)"
      @input="emit('update:modelValue', $event.target.value)"
      type="text"
      class="h-10 w-64 rounded border-4 border-indigo-500/50 px-2"
      placeholder="Search a character by name..."
    />
  </div>
</template>
