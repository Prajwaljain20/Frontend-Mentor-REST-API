import { IFlag } from "./details-card-interface";

export interface ICard {
    codes: {ccn3: string},
    names: {common: string},
    population: number,
    region: string,
    capitals: {name: string}[],
    flag: IFlag
};

export interface ISearch {
    name: {common: string},
    cca3: string
}

export interface ICardResponse {
  data: {objects: ICard[]};
}