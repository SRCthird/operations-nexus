import { Apps } from '@apps';

export type Template_FullWithCircle = {
  ID: number; //@id @default(autoincrement())
  Title: string;
  Background: string;
  Gradient?: string;
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
}

