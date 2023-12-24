import { http, HttpResponse } from "msw";
import data from "./user.json";
import mainData from "./main.json";
import shoppingBagData from "./shoppingBag.json";
import womenData from "../mocks/women.json";
import interiorData from "../mocks/interior.json";
import manData from "../mocks/man.json";
import itemData from "../mocks/item.json";
import askData from "../mocks/ask.json";
import reviewData from "../mocks/review.json";
import userData from "../mocks/user.json";

export const handlers = [
  http.get("/api/main", () => {
    console.log(123)
    return HttpResponse.json(mainData, {
      status: 201,
      statusText: "Success to get main",
    });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const info = await request.formData();

    const userId = info.get("id") as string;
    const userPW = info.get("password") as string;
    const userNickName = info.get("nickName") as string;

    const newUser = {
      id: userId,
      password: userPW,
      name: userNickName,
    };

    userData.push(newUser);
    console.log(userData);


    return HttpResponse.json(null, {
      status: 201,
      statusText: "Success to register",
    });
  }),

  http.post("/api/auth/isLogin", ({ cookies }) => {
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
      const resdata = { name: "nickName" };
      return new HttpResponse(JSON.stringify(resdata), {
        status: 205,
        statusText: "Change accessToken",
        headers: {
          "Set-Cookie": "accessToken=access; secure",
        },
      });
    }

    // 이상없을때 동작
    else {
      const resdata = { name: "nickName" };
      return new HttpResponse(JSON.stringify(resdata), {
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

  http.post("/api/auth/login", async ({ request }) => {
    try {
      const info = await request.formData();

      const userId = info.get("id");
      const userPW = info.get("password");
      const user = data.find(({ id }) => id === userId);
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
      return new HttpResponse("로그인 에러", { status: 403 });
    }
  }),

  http.post("/api/auth/logout", () => {
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

  http.get(`/api/detail`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    interface itemRequire {
      id: string;
      imgSrc: string;
      brand: string;
      name: string;
      price: number;
      carouselImg: string[];
      detailImg: string;
      deliveryFee: number;
      noDeliveryPrice: number;
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

    interface response {
      data: itemRequire[];
      totalNums: number;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id") as string;
    const page = Number(url.searchParams.get("page"));

    const keys = Object.keys(askData);

    const data = askData as AskData;

    console.log(data[id].length);
    if (page === 1) {
      const findData = data[id].slice(0, 6);
      const sendData: response = {
        data: findData,
        totalNums: data[id].length,
      };
      return HttpResponse.json(sendData, {
        status: 201,
        statusText: "Success to get review",
      });
    } else {
      const findData = data[id].slice((page - 1) * 6, page * 6);
      const sendData: response = {
        data: findData,
        totalNums: data[id].length,
      };

      return HttpResponse.json(sendData, {
        status: 202,
        statusText: `Success to get ask`,
      });
    }
  }),

  http.get(`/api/detail/review`, ({ request, params }) => {
    interface itemRequire {
      star: number;
      date: string;
      option: string;
      user: string;
      detail: string;
      imgUrl: string;
    }

    interface ReviewData {
      [key: string]: itemRequire[];
    }

    interface response {
      data: itemRequire[];
      totalNums: number;
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id") as string;
    const page = Number(url.searchParams.get("page"));

    const keys = Object.keys(reviewData);
    console.log(keys.includes(id));

    const data = reviewData as ReviewData;

    const now = (page + 1) * 6;
    console.log(data[id][now + 1]);

    if (page === 1) {
      const findData = data[id].slice(0, 30);
      const sendData: response = {
        data: findData,
        totalNums: data[id].length,
      };
      return HttpResponse.json(sendData, {
        status: 201,
        statusText: "Success to get review",
      });
    } else {
      const findData = data[id].slice((page - 1) * 30, page * 30);
      const sendData: response = {
        data: findData,
        totalNums: data[id].length,
      };

      return HttpResponse.json(sendData, {
        status: 202,
        statusText: `Success to get data`,
      });
    }
  }),

  http.get(`/api/category/:category/:detail`, ({ params, request }) => {
    console.log(params);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));

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
      price: number;
      deliveryFee: number;
      noDeliveryPrice: number;
    }

    interface response {
      data: Item[];
      totalNums: number;
    }

    const category = params.category as string;
    const detail = params.detail as keyof WomenData;

    let data: Item[] = [];

    if (category === "women") {
      data = womenData[detail];
    } else if (category === "man") {
      data = manData[detail];
    } else if (category === "interior") {
      data = interiorData[detail];
    }

    if (!data) {
      return;
    }

    console.log(data.length);
    if (page == 1) {
      const findData = data.slice(0, page * 20);
      const sendData: response = {
        data: findData,
        totalNums: data.length,
      };

      return HttpResponse.json(sendData, {
        status: 201,
        statusText: "Success to get review",
      });
    } else {
      const findData = data.slice((page - 1) * 20, page * 20);
      const sendData: response = {
        data: findData,
        totalNums: data.length,
      };

      return HttpResponse.json(sendData, {
        status: 202,
        statusText: `Success to get ${category + "/" + detail} data`,
      });
    }
  }),

  http.post("/api/shoppingBag", ({ request }) => {
    console.log(request);

    return HttpResponse.json(data, {
      status: 201,
      statusText: "Success to save on Bag",
    });
  }),
];
