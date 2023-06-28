export interface Entity {
  id: number;  // number | null
  name: string;
  status: boolean;
  instrument: Array<number>;
  type: Array<number>;
}
