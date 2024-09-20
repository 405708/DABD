export interface GameItem { 
  id: string;
  name: string;
  description: string;
  creation: Date;
  creators: GameCreator[]; 
  parentId?: string;
}

export interface GameCreator { 
  name: string;
  iconUrl: string; 
}