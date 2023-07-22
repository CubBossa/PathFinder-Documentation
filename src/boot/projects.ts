import {useProjects} from 'stores/project-store';
import {Page} from 'src/models';
import {boot} from 'quasar/wrappers';
import {pages} from 'pages/pages';
import {fasL} from "@quasar/extras/fontawesome-v6";

export default boot(() => {
  const store = useProjects()

  store.pages = pages;
  store.currentPage = store.pages[0]
  store.flatPages = store.pages.flatMap(store.convertToFlat)
})


