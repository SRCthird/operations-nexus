import { Apps } from '@apps'

export type Template_FullDisplay = {
  ID: number; //@id @default(autoincrement())
  Title: string;
  Background: string;
  Gradient?: string;
  App1?: Apps;
  App1_ID?: number;
}

