declare module ReportsResultModel {

  export interface Desc {
    ndbno: string;
    name: string;
    ds: string;
    manu: string;
    ru: string;
  }

  export interface Measure {
    label: string;
    eqv: number;
    eunit: string;
    qty: number;
    value: string;
  }

  export interface Nutrient {
    nutrient_id: string;
    name: string;
    derivation: string;
    group: string;
    unit: string;
    value: string;
    measures: Measure[];
  }

  export interface Food {
    sr: string;
    type: string;
    desc: Desc;
    nutrients: Nutrient[];
    footnotes: any[];
  }

  export interface FoodContainer {
    food: Food;
  }

  export interface ReportsResult {
    foods: FoodContainer[];
    count: number;
    notfound: number;
    api: number;
  }

}
