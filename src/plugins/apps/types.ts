import { App_PowerBI } from "./PowerBI";
import { App_PowerPoint } from "./PowerPoint";

export type App = {
  id: number;
  name: string;
  type: Apps;

  powerBI: App_PowerBI | null; 
  powerPoint: App_PowerPoint | null;
}

export enum Apps {
  Empty = '',
  PowerBI = 'PowerBI',
  PowerPoint = 'PowerPoint',
}
