export interface Menu {
  id: string;
  title: string;
  path: string;
  roles?: string;
  children?: Menu[];
}
