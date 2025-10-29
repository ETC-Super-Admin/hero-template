
export interface LineGroup {
    id: string;
    groupId: string;
    name: string;
    memberAmount: number;
    imageCount: number;
  }
  
  export interface GroupSummary {
    total: number;
    verified: number;
    pending: number;
    rejected: number;
  }
