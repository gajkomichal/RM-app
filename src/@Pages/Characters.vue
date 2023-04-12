<script setup lang="ts">
import SearchCharacter from '@/components/SearchCharacter.vue';
import { onMounted } from 'vue';
import { useStoreCharacters } from '@/@Stores/charactersStore';
import Character from '@/components/Character.vue';
import Loading from '@/components/shared/Loading.vue';
import Pagination from '@/components/shared/Pagination.vue';

const storeCharacters = useStoreCharacters();

onMounted(() => {
  storeCharacters.defaultDisablePaginationBtns();
});
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <div class="flex">
      <div class="flex justify-center items-center">
        <label class="mx-2" for="filter-select">Filter by:</label>
        <select class="mx-2 rounded border-4 border-indigo-500/50 w-28 h-10 px-2" id="filter-select" v-model="storeCharacters.filterBy" @change="storeCharacters.getAllCharacters(1, storeCharacters.search)">
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="species">Species</option>
          <option value="type">Type</option>
          <option value="gender">Gender</option>
        </select>
      </div>
      <SearchCharacter
        v-model.trim="storeCharacters.search"
        @keyup.enter="storeCharacters.getAllCharacters((storeCharacters.page = 1), storeCharacters.search)"
      />
      <button
        @click="storeCharacters.getAllCharacters((storeCharacters.page = 1), storeCharacters.search)"
        class="dark:bg-purple-700 inline p-2 mx-2 bg-indigo-500/50 rounded-lg hover:bg-sky-400"
      >
        Search
      </button>
    </div>
    <div v-if="!storeCharacters.loading">
      <div v-if="storeCharacters.characters && storeCharacters.characters.length">
        <div class="flex flex-wrap justify-center">
          <div
            v-for="character in storeCharacters.characters"
            :key="character.id"
            class="rounded border-4 border-lime-500 m-4"
          >
            <Character :character="character" />
          </div>
        </div>

        <Pagination
          :store="storeCharacters"
          :info="storeCharacters.charactersInfo"
          pageName="Characters"
          :pageSize="storeCharacters.pageSize"
        />
      </div>
      <p v-else>No characters found.</p>
    </div>
    <Loading v-else class="flex justify-center" />
  </div>
</template>
