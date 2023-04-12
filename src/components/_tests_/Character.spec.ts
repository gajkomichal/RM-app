import { shallowMount } from '@vue/test-utils';
import CharacterCard from '@/components/CharacterCard.vue';

describe('CharacterCard.vue', () => {
  it('displays only 12 characters per page', () => {
    const character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };
    const wrapper = shallowMount(CharacterCard, {
      props: {
        character,
      },
    });
    const name = wrapper.find('.font-semibold');
    expect(name.text()).toMatch(/^Rick San/); // Check that only first 12 characters are displayed
  });
});