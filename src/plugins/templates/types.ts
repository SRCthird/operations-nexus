import { App } from "../apps";

export type Template  = {
  id: number;
  title: string;
  design: Templates;
  background: string;
  gradient?: string;
  transition?: number;
  apps: App[];
}

export enum Templates {
  FullDisplay = 'FullDisplay',
  FullDisplay2 = 'FullDisplay2',
  FullDisplay3 = 'FullDisplay3',
  FullDisplay4 = 'FullDisplay4',
  FullDisplay5 = 'FullDisplay5',
  FullWithCircle = 'FullWithCircle',
  ThreeOnTwo = 'ThreeOnTwo',
  OneByThree = 'OneByThree',
  SplitScreen = 'SplitScreen',
  TwoByTwo = 'TwoByTwo',
  Transition2x2_3on2 = 'Transition2x2_3on2',
}
