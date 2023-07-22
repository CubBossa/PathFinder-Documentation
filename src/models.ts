export interface Page {
  route: string,
  label: string,
  incomplete?: boolean,
  component?: unknown,
  parent?: () => Page,
  children?: Page[]
}
