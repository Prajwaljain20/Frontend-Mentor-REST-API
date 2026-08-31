export interface IDetailsCard {
    names: {common: string},
    population: number,
    currencies: {name: string}[],
    region: string,
    subregion: string,
    capitals: {name: string}[],
    languages: {name: string}[],
    tlds: string[],
    borders: string[],
    flag: IFlag,
};

export interface IFlag {
    url_png: string,
    url_svg: string,
    description: string
};

export interface IDetailResponse {
    data: {objects : IDetailsCard[]}
}