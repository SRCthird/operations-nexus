export type App_ActionTracker = {
  ID: number //@id @default(autoincrement())
  /*Departments Nexus_Department @relation(fields: [Department], references: [Department])*/
  Department: string
  Area?: string
}

