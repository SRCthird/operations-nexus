import { Apps } from '@apps';

export type FullWithCirclePage = {
  ID: number;
  Title: string;
  Background: string;
  Gradient?: string;
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
}

