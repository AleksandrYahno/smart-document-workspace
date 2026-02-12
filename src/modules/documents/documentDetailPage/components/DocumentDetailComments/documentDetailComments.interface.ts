export interface IComment {
  id: string;
  author: string;
  text: string;
  date: string;
  parentId?: string;
}
