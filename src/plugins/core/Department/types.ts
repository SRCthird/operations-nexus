export type Nexus_Department = {
  id: number 
  main: string
  department: string 
  pptxVersion: number 
  background: string
}

export interface DepartmentQuery {
  department?: string;
  searchText?: string;
}

