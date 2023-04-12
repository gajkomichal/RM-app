import { defineStore } from 'pinia';
import axios from 'axios';
import { Character } from '@/@Types/character.model';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      search: '',
      characters: [] as Character[],
      character: {} as Character,
      favorites: [] as Character[],
      charactersInfo: {
        count: 0,
        pages: 0,
      },
      loading: false,
      page: 1,
      pageSize: 12,
      disablePrevBtn: false,
      disableNextBtn: false,
      filterValue: '',
      filterBy: '',
    };
  },
  actions: {
    async getAllCharacters(page = 1, search = '', pageSize = 12) {
      this.loading = true;
      try {
        let url = `${BASE_URL}/character/?page=${page}&pageSize=${pageSize}`;
        if (search) {
          url += `&${this.filterBy}=${search}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        this.characters = data.results;
        this.charactersInfo = {
          count: data.info.count,
          pages: data.info.pages,
        };
        this.page = page;
        this.pageSize = pageSize;
        this.defaultDisablePaginationBtns();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getCharacterById(id: number) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        this.character = response.data;
        this.loading = false;
      } catch (error) {
        return error;
      }
    },
    addCharacter(character: Character) {
      this.characters.unshift(character);
    },
    async handlePages(type: string) {
      if (type === 'prev' && this.page > 1) {
        this.page--;
      } else if (type === 'next' && this.page < this.charactersInfo.pages) {
        this.page++;
      }
      this.getAllCharacters(this.page, this.search, this.pageSize);
      this.defaultDisablePaginationBtns();
    },
    defaultDisablePaginationBtns() {
      if (this.page === 1) {
        this.disablePrevBtn = true;
      } else {
        this.disablePrevBtn = false;
      }
      if (this.page === this.charactersInfo.pages) {
        this.disableNextBtn = true;
      } else {
        this.disableNextBtn = false;
      }
    },
  },
});
