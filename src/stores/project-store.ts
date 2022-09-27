import {defineStore} from "pinia";
import {Page, Project, Version} from "src/models";

export const useProjects = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    currentProject: undefined as Project | undefined,
    currentVersion: undefined as Version | undefined,
    currentPage: undefined as Page | undefined
  })
})
