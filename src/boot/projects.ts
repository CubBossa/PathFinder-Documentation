import {useProjects} from 'stores/project-store';
import markdown from '../../public/markdown/pathfinder/project.json'
import {Page, Project, Version} from 'src/models';
import {boot} from 'quasar/wrappers';

export default boot(() => {
  const store = useProjects()

  const project: Project = {
    key: markdown.key, name: markdown.name, versions: [], links: { github: markdown.links.github, download: markdown.links.download }
  }
  let promises: Promise<any>[] = []
  markdown.versions.forEach(v => {
    promises = promises.concat(import('../../public/markdown/' + markdown.key.toLowerCase() + '/' + v + '/pages.json').then(value => {
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


