
export type App_PowerBI = {
  id: number;
  type: PowerBITypes;
  reportID: string;
  groupID: string;
  customEmbed?: string;
  pageName?: string;
}

export enum PowerBITypes {
  report = 'report',
  dashboard = 'dashboard',
  title = 'tile',
  visual = 'visual',
  qna = 'qna'
}

