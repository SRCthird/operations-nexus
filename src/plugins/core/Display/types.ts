import { Templates } from '@templates';

export type Nexus_Display = {
  ID: number //@id @default(autoincrement())
  Main: string
  Sub: string
  /*Departments Nexus_Department @relation(fields: [Department], references: [Department])*/
  Department: string
  Display: string
  Background: string
  Template?: Templates
  Template_ID?: number
}

