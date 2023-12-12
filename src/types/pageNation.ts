interface askRequire {
    owner: string;
    date: string;
    state: boolean;
    title: string;
    detail: string;
  }

  interface reviewRequire {
    star:number;
    option:string;
    detail:string;
    date:string;
    user:string;
    imgUrl:string;

  }
  

  export type pageNationType = askRequire | reviewRequire
