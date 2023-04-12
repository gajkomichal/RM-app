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
      charactersInfos: {},
      loading: false,
      page: 1,
      pageSize: 12,
      disablePrevBtn: false,
      disableNextBtn: false,
      filterValue: '',
      filterBy: '',
    };
  },
  // getters: {
  //   displayedCharacters(state) {
  //     const start = (state.page - 1) * state.pageSize;
  //     const end = start + state.pageSize;
  //     return state.characters.slice(start, end);
  //   },
  // },
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
        this.characters = data.results.filter(
          (character: {
            name: string;
            status: string;
            species: string;
            type: string;
            gender: string;
          }) => {
            if (this.filterBy === 'name') {
              return character.name
                .toLowerCase()
                .includes(search.toLowerCase());
            } else if (this.filterBy === 'status') {
              return character.status
                .toLowerCase()
                .includes(search.toLowerCase());
            } else if (this.filterBy === 'species') {
              return character.species
                .toLowerCase()
                .includes(search.toLowerCase());
            } else if (this.filterBy === 'type') {
              return character.type
                .toLowerCase()
                .includes(search.toLowerCase());
            } else if (this.filterBy === 'gender') {
              return character.gender
                .toLowerCase()
                .includes(search.toLowerCase());
            }
            return true;
          }
        );
        this.charactersInfos = {
          count: data.info.count,
          pages: data.info.pages,
          next: data.info.next,
          prev: data.info.prev,
        };
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
      } else if (type === 'next' && this.page < this.charactersInfos.pages) {
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
      if (this.page === this.charactersInfos.pages) {
        this.disableNextBtn = true;
      } else {
        this.disableNextBtn = false;
      }
    },
  },
});
