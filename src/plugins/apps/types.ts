import { App_PowerBI } from "./PowerBI";
import { App_PowerPoint } from "./PowerPoint";
import { App_IFrame } from "./IFrame";

export type App = {
  id: number;
  name: string;
  type: Apps;

  powerBI: App_PowerBI | null; 
  powerPoint: App_PowerPoint | null;
  iFrame: App_IFrame | null;
}

export enum Apps {
  Empty = '',
  PowerBI = 'PowerBI',
  PowerPoint = 'PowerPoint',
  IFrame = 'IFrame',
}
