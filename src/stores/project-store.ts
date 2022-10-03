import {defineStore} from "pinia";
import {Page, Project, Version} from "src/models";
import {Router, useRouter} from "vue-router";

export const useProjects = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    currentProject: undefined as Project | undefined,
    currentVersion: undefined as Version | undefined,
    currentPage: undefined as Page | undefined,
    flatPages: [] as Page[]
  }),
  actions: {
    convertToFlat(page: Page) {
      return page.children === undefined ? [page] : [page, ...page.children]
    },
    getFallBack() {
      return this.currentPage || {} as Page
    },
    navigateTo(router: Router, project: string, version: string, page: string) {
      return router.push('/' + project + '/' + version + '/' + page)
    },
    navigate(router: Router, page: string | null) {
      if (page === null || this.currentPage?.name === page) {
        return Promise.resolve(this.getFallBack())
      }
      const match = this.flatPages.find(value => value.name === page)
      if (match?.markdown === undefined) {
        return
      }
      this.currentPage = match
      if (this.currentProject !== undefined && this.currentVersion !== undefined && this.currentPage !== undefined) {
        this.navigateTo(router, this.currentProject.key, this.currentVersion.version, this.currentPage.name)
      }
      return Promise.resolve(this.currentPage)
    }
  }
})
