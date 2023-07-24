import {defineStore} from 'pinia';
import {Page} from 'src/models';
import {Router} from 'vue-router';

export const useProjects = defineStore('projects', {
  state: () => ({
    currentPage: undefined as Page | undefined,
    pages: [] as Page[],
    flatPages: [] as Page[]
  }),
  actions: {
    next(page: Page): Page | undefined {
      const p = this.flatPages.filter(value => value.component != null)
      return p.at((p.indexOf(page) + 1) % p.length)
    },
    previous(page: Page): Page | undefined {
      const p = this.flatPages.filter(value => value.component != null)
      return p.at((p.indexOf(page) - 1 + p.length) % p.length)
    },
    convertToFlat(page: Page): Page[] {
      let result: Page[] = [];
      if (page.children) {
        result = page.children
          .map(p =>  {
            p.parent = () => page
            return p
          })
          .flatMap(this.convertToFlat)
      }
      return [page].concat(result)
    },
    getFallBack() {
      return this.currentPage || this.pages[0];
    },
    pagePath(page: Page): string {
      let viewed = page;
      let path = page.route;
      while (viewed.parent) {
        viewed = viewed.parent();
        path = viewed.route + '/' + path;
      }
      return '/' + path;
    },
    navigate(router: Router, page: string | null) {
      if (page === null || this.currentPage?.route === page) {
        return Promise.resolve(this.getFallBack())
      }
      console.log(page)
      const match = this.flatPages.find(value => this.pagePath(value) === page)
      if (match?.component === undefined) {
        return
      }
      this.currentPage = match
      return Promise.resolve(this.currentPage)
    }
  }
})
