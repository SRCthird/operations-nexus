export type Nexus_Department = {
  ID: number //@id @default(autoincrement())
  Main: string
  /*Actions     Nexus_ActionTracker[]
  Displays    Nexus_Display[]
  PowerPoint  App_PowerPoint[]*/
  Department: string //@unique
  PPTXVersion: number //@default(1)
  Background: string
}

export interface DepartmentQuery {
  department?: string;
  searchText?: string;
}

