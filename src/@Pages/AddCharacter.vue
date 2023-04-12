<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStoreCharacters } from '@/@Stores/charactersStore';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { required, minLength } from '@vuelidate/validators';
import BaseInput from '@/components/shared/BaseInput.vue';

const router = useRouter();

const storeCharacters = useStoreCharacters();

const newCharacter = reactive({
  id: Date.now(),
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  image: '',
});

const rules = computed(() => ({
  name: { required, minLength: minLength(5) },
  species: { required, minLength: minLength(5) },
  status: { required, minLength: minLength(5) },
  type: { required, minLength: minLength(5) },
  gender: { required, minLength: minLength(5) },
  image: { required, minLength: minLength(5) },
}));

const v$ = useVuelidate(rules, newCharacter);

const clearForm = () => {
  newCharacter.name = '';
  newCharacter.gender = '';
  newCharacter.species = '';
  newCharacter.status = '';
  newCharacter.type = '';
  newCharacter.image = '';
};

const addCharacter = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  storeCharacters.addCharacter(newCharacter);
  v$.value.$reset();
  router.push('/');
};
</script>

<template>
  <form
    class="mt-24 flex w-full flex-col justify-center p-4"
    @submit.prevent="addCharacter"
  >
    <h2 class="my-8 flex w-full justify-center text-2xl font-extrabold">
      Add your own character
    </h2>
    <div class="flex flex-col items-center text-lg">
      <BaseInput label="Name" v-model="newCharacter.name" />
      <span v-for="error in v$.name.$errors" class="ml-24 text-xs text-red-500">
        {{ error.$message }}
      </span>
      <BaseInput label="Status" v-model="newCharacter.status" />
      <span
        v-for="error in v$.status.$errors"
        class="ml-24 text-xs text-red-500"
      >
        {{ error.$message }}
      </span>
      <BaseInput label="Species" v-model="newCharacter.species" />
      <span
        v-for="error in v$.species.$errors"
        class="ml-24 text-xs text-red-500"
      >
        {{ error.$message }}
      </span>
      <BaseInput label="Type" v-model="newCharacter.type" />
      <span
        v-for="error in v$.status.$errors"
        class="ml-24 text-xs text-red-500"
      >
        {{ error.$message }}
      </span>
      <BaseInput label="Image" v-model="newCharacter.image" />
      <span
        v-for="error in v$.status.$errors"
        class="ml-24 text-xs text-red-500"
      >
        {{ error.$message }}
      </span>
      <div class="flex mt-2">
        <label class="mb-2 w-24 text-lg" for="gender">Gender:</label>
        <div class="flex w-72 flex-row">
          <label class="mr-4">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              v-model="newCharacter.gender"
              class="ml-8"
            />
            <span class="ml-2 text-lg">Male</span>
          </label>
          <label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              v-model="newCharacter.gender"
            />
            <span class="ml-2 text-lg">Female</span>
          </label>
        </div>
        <span
          v-for="error in v$.gender.$errors"
          class="text-xs text-red-500"
        >
          {{ error.$message }}
        </span>
      </div>

      <div class="mt-4 flex w-2/6 justify-end">
        <button
          type="button"
          class="mx-2 rounded bg-lime-500 px-3 py-1 font-medium text-white"
          @click="clearForm()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="mx-2 rounded bg-lime-500 px-3 py-1 font-medium text-white"
          @click="addCharacter()"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>
