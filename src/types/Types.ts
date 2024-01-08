export interface Item {
  id: number;
  imgSrc: string;
  detail:string;
}

export interface MainData {
  MainBanner: Item[];
  Popular: Item[];
  PopularRelated: Item[];
  Recommend: Item[];
  RecommendRelated: Item[];
  Sale: Item[];
  SaleRelated: Item[];
}

interface askRequire {
  owner: string;
  date: string;
  state: boolean;
  title: string;
  detail: string;
}

interface reviewRequire {
  star: number;
  option: string;
  detail: string;
  date: string;
  user: string;
  imgUrl: string;
}

interface itemsRequire {
  brand: string;
  id: number;
  imgSrc: string;
  name: string;
  price: string;
}


export type pageNationType = askRequire | reviewRequire | itemsRequire;

export type pageCacheType =  MainData