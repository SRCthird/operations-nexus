export type App_ActionTracker = {
  ID: number //@id @default(autoincrement())
  /*Departments Nexus_Department @relation(fields: [Department], references: [Department])*/
  Department: string
  Line: string
  Date_Opened: Date //@db.Date
  Date_Due?: Date //@db.Date
  Date_Closed?: Date //@db.Date
  Category: string
  Description: string
  Updates?: string
  Owner?: string
  Status: number
  Priority: number
  Logged_By: string
}

