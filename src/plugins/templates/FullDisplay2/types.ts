import { Apps } from '@apps'

export type FullDisplay2Page = {
  ID: number;
  Title: string;
  Background: string;
  Gradient?: string;
  Tranition: number;
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
}

