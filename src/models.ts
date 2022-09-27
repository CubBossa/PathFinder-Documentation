export interface Project {
  name: string
  versions: Version[]
}

export interface Version {
  version: string
  pages: Page[]
}

export interface Page {
  name: string
  markdown?: string
  subpages: Page[]
}
