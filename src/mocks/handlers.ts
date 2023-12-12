import { http, HttpResponse } from "msw";
import data from "./user.json";
import mainData from "./main.json";
import shoppingBagData from "./shoppingBag.json";
import womenData from "../mocks/women.json";
import interiorData from "../mocks/interior.json";
import manData from "../mocks/man.json";
import itemData from "../mocks/item.json";
import askData from "../mocks/ask.json";
import reviewData from '../mocks/review.json'
export const handlers = [
  http.get("/api", () => {
    return HttpResponse.json(mainData, {
      status: 201,
      statusText: "Success to main get",
    });
  }),

  http.post("/api/isLogin", ({ cookies }) => {
    // 리프레시 토큰이 다를때
    // 정상 사용자가 아니거나 리프레시 토큰 만료 시

    if (cookies.refreshToken !== "refresh") {
      return new HttpResponse(null, {
        status: 204,
        statusText: "Need Login",
      });
    }

    //엑세스 토큰이 다를 때
    //엑세스 토큰 만료 -> 재발급 해줌
    else if (cookies.accessToken !== "access") {
      // 기존엑세스 토큰에 대한 서명을 검증해서 비교 해야할것같음
      return new HttpResponse("nickname", {
        status: 205,
        statusText: "Change accessToken",
        headers: {
          "Set-Cookie": "accessToken=access; secure",
        },
      });
    }

    // 이상없을때 동작
    else {
      return new HttpResponse("nickname", {
        status: 201,
        statusText: "Logined User",
      });
    }
  }),

  http.get("/api/posts/aaa", () => {
    return HttpResponse.json(data, {
      status: 201,
      statusText: "Success to get",
    });
  }),

  http.post("/api/login", async ({ request }) => {
    let user;
    try {
      const info = await request.formData();

      const userId = info.get("id");
      const userPW = info.get("password");
      user = data.find(({ id }) => id === userId);
      if (user) {
        if (user.password === userPW) {
          const resdata = { name: user.name };

          document.cookie = "refreshToken=refresh; secure";
          document.cookie = "accessToken=access; secure";

          return new HttpResponse(JSON.stringify(resdata), {
            status: 201,
            statusText: "Success Login",
          });
        } else {
          return new HttpResponse(null, {
            status: 201,
            statusText: "비밀번호가 일치하지않습니다",
          });
        }
      } else {
        return new HttpResponse(null, {
          status: 201,
          statusText: "존재하지않는 유저입니다",
        });
      }
    } catch (error) {
      if (user) {
        return new HttpResponse("비밀번호가 일치하지않습니다", { status: 201 });
      }
      return new HttpResponse("존재하지않는 유저입니다", { status: 200 });
    }
  }),

  http.post("/api/logout", () => {
    // Construct a JSON response with the list of all posts
    // as the response body.

    document.cookie =
      "accessToken=access; expires=Thu, 22 April 1997 00:00:00; secure";
    document.cookie =
      "refreshToken=refresh; expires=Thu, 22 April 1997 00:00:00; secure";

    return new HttpResponse(null, {
      status: 201,
      statusText: "Success to get",
    });
  }),

  http.get("/api/shoppingBag", () => {
    return HttpResponse.json(shoppingBagData, {
      status: 201,
      statusText: "Success to get shopping Bag",
    });
  }),

  http.get(`/api/category/:category/:detail`, ({ params }) => {
    console.log(params);

    interface WomenData {
      all: Item[];
      outer: Item[];
      top: Item[];
      bottom: Item[];
    }

    interface Item {
      id: number;
      imgSrc: string;
      brand: string;
      name: string;
      price: string;
    }

    const category = params.category as string;
    const detail = params.detail as keyof WomenData;

    if (category === "women") {
      return HttpResponse.json(womenData[detail], {
        status: 201,
        statusText: `Success to get ${category + "/" + detail} data`,
      });
    } else if (category === "man") {
      return HttpResponse.json(manData[detail], {
        status: 201,
        statusText: `Success to get ${category + "/" + detail} data`,
      });
    } else if (category === "interior") {
      return HttpResponse.json(interiorData[detail], {
        status: 201,
        statusText: `Success to get ${category + "/" + detail} data`,
      });
    }
  }),

  http.get(`/api/detail`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    interface itemRequire {
      id: string;
      imgSrc: string;
      brand: string;
      name: string;
      price: string;
      carouselImg: string[];
      detailImg: string;
    }
    const findData = itemData.item.find((item: itemRequire) => item.id === id);

    return HttpResponse.json(findData, {
      status: 201,
      statusText: "Success to get detail",
    });
  }),

  http.get(`/api/detail/ask`, ({ request, params }) => {
    interface itemRequire {
      owner: string;
      date: string;
      state: boolean;
      title: string;
      detail: string;
    }

    interface AskData {
      [key: string]: itemRequire[];
    }
    const url = new URL(request.url);
    const id = url.searchParams.get("id") as string;
    const page = Number(url.searchParams.get("page"));

    const keys = Object.keys(askData);
    console.log(keys.includes(id));

    const data = askData as AskData;

    const now = (page + 1) * 6;
    console.log(data[id][now + 1]);

    let status;
    if (data[id][now]) status = 201;
    else status = 202;

    if (page === 1) {
      const findData = data[id].slice(0, 30);

      return HttpResponse.json(findData, {
        status,
        statusText: "Success to get ask",
      });
    }

    const findData = data[id].slice(now - 6, now);

    return HttpResponse.json(findData, {
      status,
      statusText: "Success to get ask",
    });
  }),

  http.get(`/api/detail/review`, ({ request, params }) => {
    interface itemRequire {
      star: number;
      date: string;
      option: string;
      user: string;
      detail: string;
      imgUrl:string
      
    }

    interface ReviewData {
      [key: string]: itemRequire[];
    }
    const url = new URL(request.url);
    const id = url.searchParams.get("id") as string;
    const page = Number(url.searchParams.get("page"));

    const keys = Object.keys(reviewData);
    console.log(keys.includes(id));

    const data = reviewData as ReviewData;

    const now = (page + 1) * 6;
    console.log(data[id][now + 1]);

    let status;
    if (data[id][now]) status = 201;
    else status = 202;

    if (page === 1) {
      const findData = data[id].slice(0, 30);

      return HttpResponse.json(findData, {
        status,
        statusText: "Success to get review",
      });
    }

    const findData = data[id].slice(now - 6, now);

    return HttpResponse.json(findData, {
      status,
      statusText: "Success to get review",
    });
  }),
];
