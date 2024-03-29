
export interface PowerBIApp {
  ID: number;
  Type: string;
  PowerBI_ID: string;
  Group_ID: string;
  Custom_Embed?: string;
  Page_Name?: string;
}

export enum PowerBITypes {
  Report = 'report',
  Dashboard = 'dashboard',
  Title = 'tile',
  Visual = 'visual',
  QNA = 'qna'
}

