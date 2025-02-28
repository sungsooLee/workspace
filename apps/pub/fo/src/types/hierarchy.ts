export interface Hierarchy<T> {
  key: string;
  title: string;
  path: string;
  children?: Hierarchy<T>[];
  parentNode: T;
  depth: number;
}
