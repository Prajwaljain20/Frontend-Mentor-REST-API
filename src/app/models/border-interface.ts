export interface IBorder {
  names: { common: string };
  codes: { ccn3: string };
}

export interface IBorderResponse {
  data: { objects: IBorder[] };
}
