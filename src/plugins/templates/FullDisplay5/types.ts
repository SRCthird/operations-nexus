import { Apps } from '@apps'

export type Template_FullDisplay5 = {
  ID: number; //@id @default(autoincrement())
  Title: string;
  Background: string;
  Gradient?: string;
  Transition: number; //@default(0)
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
  App3?: Apps;
  App3_ID?: number;
  App4?: Apps;
  App4_ID?: number;
  App5?: Apps;
  App5_ID?: number;
}
