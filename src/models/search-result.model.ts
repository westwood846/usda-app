declare module SearchResultModel {

  export interface Item {
    offset: number;
    group: string;
    name: string;
    ndbno: string;
    ds: string;
    manu: string;
  }

  export interface List {
    q: string;
    sr: string;
    ds: string;
    start: number;
    end: number;
    total: number;
    group: string;
    sort: string;
    item: Item[];
  }

  export interface SearchResult {
    list: List;
  }

}
