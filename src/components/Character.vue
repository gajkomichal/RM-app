<script setup lang="ts">
import { watch, ref } from 'vue';
import { useFavoritesStore } from '@/@Stores/favoriteStore';

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const storeFavorites = useFavoritesStore();

const isFavorite = ref(storeFavorites.characters.includes(props.character.id));

watch(
  () => storeFavorites.characters,
  () => {
    isFavorite.value = storeFavorites.characters.includes(props.character.id);
  }
);

const toggleToFavorites = () => {
  storeFavorites.toggleAddToFavorites(props.character as any);
};
</script>

<template>
  <RouterLink :to="`/character/${character.id}`">
    <div>
      <figure class="flex h-64 items-center justify-center">
        <img
          v-if="character.image"
          :src="character.image"
          :alt="character.name"
          class="h-64"
        />
        <div
          v-if="!character.image"
          class="my-2.5 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-500/50 text-lg text-black"
        >
          {{ character.name.charAt(0).toUpperCase() }}
        </div>
      </figure>
    </div>
    <div>
      <div>
        <div class="flex flex-col">
          <p class="mt-2 mb-2 ml-4 font-semibold">{{ character.name }}</p>
          <p class="mb-0 ml-4 text-xs">
            <span class="font-semibold">Status: </span>
            <span>{{ character.status }}</span>
          </p>
          <p class="ml-4 text-xs">
            <span class="font-semibold">Species: </span>
            <span>{{ character.species }}</span>
          </p>
          <p class="ml-4 text-xs">
            <span class="font-semibold">Type: </span
            ><span>{{ character.type ? character.type : 'unknown' }}</span>
          </p>
          <p class="mb-2 ml-4 text-xs">
            <span class="font-semibold">Gender: </span>
            <span>{{ character.gender }}</span>
          </p>
        </div>
      </div>
    </div>
  </RouterLink>
  <div class="z-20 mt-4 flex justify-end">
    <button
      @click="toggleToFavorites"
      class="inline-flex items-center rounded py-2 px-4 font-bold text-gray-800 hover:bg-indigo-500/50 dark:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="h-3 w-3"
        :class="{ starred: isFavorite }"
      >
        <path
          fill="currentColor"
          d="M10 0l2.928 6.524 6.072.876-4.624 4.482 1.092 6.018L10 15.464l-5.468 2.556 1.092-6.018L.072 7.4l6.072-.876L10 0z"
        />
      </svg>
      <span class="ml-2 text-xs">{{
        isFavorite ? 'Remove from Favorites' : 'Add to Favorites'
      }}</span>
    </button>
  </div>
</template>

<style scoped>
.starred {
  color: #f6e05e;
}
</style>
