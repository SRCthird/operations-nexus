import { Apps } from '@apps'

export type Template_FullDisplay2 = {
  ID: number //@id @default(autoincrement())
  Title: string
  Background: string
  Gradient?: string
  Transition: number //@default(30)
  App1?: Apps
  App1_ID?: number
  App2?: Apps
  App2_ID?: number
}

