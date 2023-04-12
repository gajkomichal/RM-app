<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { onMounted } from 'vue';
import { useStoreCharacters } from '@/@Stores/charactersStore';

const storeCharacters = useStoreCharacters();
const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => {
  storeCharacters.getAllCharacters();
});
</script>

<template>
  <div class="my-3 box-border flex items-center">
    <ul class="my-4 flex w-full justify-center">
      <RouterLink to="/">
        <li
          class="mx-2 inline rounded-lg bg-indigo-500/50 p-2 hover:bg-sky-400 dark:bg-purple-700"
        >
          Characters
        </li>
      </RouterLink>
      <RouterLink to="/add-character">
        <li
          class="mx-2 inline rounded-lg bg-indigo-500/50 p-2 hover:bg-sky-400 dark:bg-purple-700"
        >
          Add own character
        </li>
      </RouterLink>
      <RouterLink to="/favorites">
        <li
          class="mx-2 inline rounded-lg bg-indigo-500/50 p-2 hover:bg-sky-400 dark:bg-purple-700"
        >
          Favorites
        </li>
      </RouterLink>
    </ul>
    <button
      @click="toggleDark()"
      class="mx-2 rounded-lg bg-gray-600 p-1 text-xs text-white dark:bg-purple-700"
    >
      Dark Toggle
    </button>
  </div>

  <RouterView />
</template>
