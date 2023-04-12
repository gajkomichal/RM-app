import { defineStore } from 'pinia';
import { Character } from '@/@Types/character.model';

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: () => ({
    characters: [] as Character[],
  }),
  actions: {
    toggleAddToFavorites(character: Character) {
        const index = this.characters.findIndex((c) => c.id === character.id);
        if (index === -1) {
          this.characters.push(character);
        } else {
          this.characters.splice(index, 1);
        }
      }
  },
});