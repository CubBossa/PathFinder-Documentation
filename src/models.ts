export interface Project {
  label: string
  currentVersion: string
  versions: string[]
}

export interface Page {
  markdown_path: string
  label: string
  subpages: Page[]
}
