export interface Category {
  id: number,
  categoryName: string,
  categoryType: "ROOT",
  sortSeq: number,
  name: string,
  depth: number,
  children: Category[],
  path: string
}
