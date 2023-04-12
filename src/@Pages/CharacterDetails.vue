<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStoreCharacters } from '@/@Stores/charactersStore';
import { useRoute } from 'vue-router';
import Loading from '@/components/shared/Loading.vue';

const route = useRoute();

const storeCharacters = useStoreCharacters();

const episodes = computed(() => {
  return storeCharacters.character.episode
    .map(ep => {
      const [, id] = ep.match(/\/(\d+)$/);
      return +id;
    })
    .sort((a, b) => a - b);
});

onBeforeMount(() => {
  storeCharacters.getCharacterById(route.params.id);
});
</script>

<template>
  <section class="pt-20" v-if="!storeCharacters.loading">
    <div>
      <div class="flex w-full">
        <div class="flex w-2/3 justify-center">
          <figure>
            <img
              class="rounded-full"
              :src="storeCharacters.character.image"
              :alt="storeCharacters.character.name"
            />
          </figure>
        </div>
        <div class="flex w-1/3 items-center justify-start">
          <div>
            <h2 class="font-bold">
              {{ storeCharacters.character.name }}
            </h2>
            <p class="font-bold">
              Species:
              <span class="font-normal">{{
                storeCharacters.character.species
              }}</span>
            </p>
            <p class="font-bold">
              Status:
              <span class="font-normal">{{
                storeCharacters.character.status
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full items-end justify-end pt-8">
        <div class="mr-32 w-1/4">
          <p class="flex font-bold">Appears in the episode:</p>
          <ul class="flex w-full flex-wrap">
            <li
              class="mx-1 my-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/50 text-lg text-black"
              v-for="episode in episodes"
              :key="episode"
            >
              {{ episode }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <Loading v-else class="flex justify-center" />

  <BackButton />
</template>
