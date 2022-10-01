export interface Project {
  key: string
  name: string
  versions: Version[]
}

export interface Version {
  version: string
  pages: Page[]
}

export interface Page {
  name: string
  label: string
  markdown?: string
  children: Page[]
}
