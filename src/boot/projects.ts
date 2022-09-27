import {useProjects} from "stores/project-store";
import markdown from '../markdown/pathfinder/project.json'
import {Project, Version} from "src/models";
import {boot} from "quasar/wrappers";

export default boot(() => {
  const store = useProjects()

  const project: Project = {
    name: markdown.name, versions: []
  }
  let promises: Promise<any>[] = []
  markdown.versions.forEach(v => {
    promises = promises.concat(import('../markdown/' + markdown.name.toLowerCase() + '/' + v + '/pages.json').then(value => {
      project.versions = project.versions.concat({ version: v, pages: value } as Version)
    }))
  })
  Promise.all(promises).then(() => {
    store.projects = [project]
    store.currentProject = project
    if (store.currentProject !== undefined) {
      store.currentVersion = store.currentProject.versions.at(-1)
      if (store.currentVersion !== undefined) {
        store.currentPage = store.currentVersion.pages.pages[0]
      }
    }
  })
})


