import {RouteRecordRaw} from 'vue-router';
import component from "*.vue";
import {Page} from "src/models";

const routes: RouteRecordRaw[] = [
  {
    path: '/:project/:version/:page',
    component: () => import('layouts/DocsLayout.vue'),
    children: [{path: '', component: () => import('pages/MarkDownPage.vue')}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
