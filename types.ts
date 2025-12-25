
export interface MousePosition {
  x: number;
  y: number;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
}

export enum CardType {
  MASTERPIECE = 'MASTERPIECE',
  TEXTURE = 'TEXTURE',
  MOOD = 'MOOD',
  PHILOSOPHY = 'PHILOSOPHY'
}
