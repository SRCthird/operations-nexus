import { Apps } from '@apps'

export type FullDisplay3Page = {
  ID: number;
  Title: string;
  Background: string;
  Gradient?: string;
  Transition: number;
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
  App3?: Apps;
  App3_ID?: number;
}

