import {RouteRecordRaw} from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/DocsLayout.vue')
  },
];

export default routes;
