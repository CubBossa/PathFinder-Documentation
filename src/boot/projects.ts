import {useProjects} from 'stores/project-store';
import {Page, Project, Version} from 'src/models';
import {boot} from 'quasar/wrappers';

export default boot(() => {
  const store = useProjects()

  const modules = import.meta.glob('assets/markdown/*/project.json')
  for (const path in modules) {
    console.log('loading module "' + path + '".')
    modules[path]().then(module => {
      const project: Project = {
        key: module.key, name: module.name, versions: [], links: { github: module.links.github, download: module.links.download }
      }
      console.log(project)
      let promises: Promise<any>[] = []
      module.versions.forEach(v => {
        promises = promises.concat(import(`../assets/markdown/${module.key.toLowerCase()}/${v}/pages.json`).then(value => {
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
            store.flatPages = store.currentVersion.pages.pages.flatMap((p: Page) => store.convertToFlat(p))
          }
        }
      })
    })
  }
})


