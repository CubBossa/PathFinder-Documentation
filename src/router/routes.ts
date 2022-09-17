import {RouteRecordRaw} from 'vue-router';
import component from "*.vue";
import {Page} from "src/models";

const effects: Page = {markdown_path: 'effects', label: 'page', subpages: []}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/DocsLayout.vue'),
    props: {project: {label: 'PathFinder', currentVersion: '1.0', versions: ['1.0', '2.0']}, title: 'PathFinder', pages: [effects], activePage: effects},
    children: [{path: '', component: () => import('pages/IndexPage.vue')}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
