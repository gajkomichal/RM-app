<script setup lang="ts">
import { useFavoritesStore } from '@/@Stores/favoriteStore';
import Character from '@/components/Character.vue';

const storeFavorites = useFavoritesStore();
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <div v-if="storeFavorites.characters && storeFavorites.characters.length">
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="character in storeFavorites.characters"
          :key="character.id"
          class="rounded border-4 border-lime-500"
        >
          <Character :character="character" />
        </div>
      </div>
    </div>
    <div v-else>You have no favourites characters for now.</div>
  </div>
</template>
