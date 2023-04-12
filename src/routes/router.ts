import * as vR from 'vue-router';
import Characters from '@/@Pages/Characters.vue';

const _routes: Array<vR.RouteRecordRaw> = [
  {
    path: '/',
    name: 'characters',
    component: Characters,
  },
  {
    path: '/character/:id',
    name: 'character-details',
    component: () => import('@/@Pages/CharacterDetails.vue'),
  },
  {
    path: '/add-character',
    name: 'add-character',
    component: () => import('@/@Pages/AddCharacter.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/@Pages/Favorites.vue'),
  },
];

const router = vR.createRouter({
  history: vR.createWebHistory(),
  routes: _routes,
});

export default router;
