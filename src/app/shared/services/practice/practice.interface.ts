export interface IPractice {
  id: string;
  name: string;
  description: string;
  order: number;
  points: number;
}

export interface IPracticeUpdateOrder {
  id: string;
  order: number;
}
