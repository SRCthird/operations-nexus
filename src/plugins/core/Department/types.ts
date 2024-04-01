export type Departments = {
  ID: number;
  Main: string;
  Department: string;
  Background: string;
  PPTXVersion: number;
}

export interface DepartmentQuery {
  department?: string;
  searchText?: string;
}

