interface Orbit {
  type?: string;
  altitude?: number;
  period?: number;
  inclination?: number;
}

interface Specifications {
  [key: string]: string | number;
}

export interface Satellite {
  id: string;
  name: string;
  noradId: string;
  country: string;
  launchDate: string;
  status: string;
  mission: string;
  imageUrl: string;
  endOfLife?: string;
  operator?: string;
  orbit?: Orbit;
  specifications?: Specifications;
}
