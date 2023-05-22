export interface ITest {
  id: string;
  name: string;
  description: string;
  order: number;
  points: number;
}

export interface ITestUpdateOrder {
  id: string;
  order: number;
}
