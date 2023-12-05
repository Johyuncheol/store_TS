import { http, HttpResponse } from "msw";
import data from "./user.json";
import mainData from "./main.json"
import shoppingBagData from './shoppingBag.json'
export const handlers = [

  http.get("/", () => {
    return HttpResponse.json(mainData, {
      status: 201,
      statusText: "Success to main get",
    });
  }),

  http.post("/isLogin", ({cookies}) => {
    // 리프레시 토큰이 다를때 
    // 정상 사용자가 아니거나 리프레시 토큰 만료 시

    if(cookies.refreshToken !=='refresh'){
      return new HttpResponse(null, {
        status: 204,
        statusText: "Need Login",
      });
    }

    //엑세스 토큰이 다를 때 
    //엑세스 토큰 만료 -> 재발급 해줌 
    else if(cookies.accessToken !=='access' ){
      // 기존엑세스 토큰에 대한 서명을 검증해서 비교 해야할것같음
      return new HttpResponse(null, {
        status: 205,
        statusText: "Change accessToken",
        headers: {
          "Set-Cookie": 'accessToken=access; secure'
        }
      });
    }

    // 이상없을때 동작
    else{
      return new HttpResponse(null, {
        status: 201,
        statusText: "Logined User",
      });
    }
  }),


  http.get("/posts/aaa", () => {
    return HttpResponse.json(data, {
      status: 201,
      statusText: "Success to get",
    });
  }),

  http.post("/login", async ({ request }) => {
    let user 
    try{
      const info = await request.formData();

      const userId = info.get("id");
      const userPW = info.get("password");
      user = data.find(({ id }) => id === userId);
      if (user) {
        if (user.password === userPW) {
          const resdata= {name:user.name}

          document.cookie = 'refreshToken=refresh; secure';
          document.cookie = 'accessToken=access; secure';
          
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
      }else{
        return new HttpResponse(null, {
          status: 201,
          statusText: "존재하지않는 유저입니다",
        });
      }
    }catch (error) {
      if(user){
        return new HttpResponse("비밀번호가 일치하지않습니다", { status: 201 });
      }
      return new HttpResponse("존재하지않는 유저입니다", { status: 200 });
    }
  }),


  http.post("/logout", () => {
    // Construct a JSON response with the list of all posts
    // as the response body.

    document.cookie = 'accessToken=access; expires=Thu, 22 April 1997 00:00:00; secure';
    document.cookie = 'refreshToken=refresh; expires=Thu, 22 April 1997 00:00:00; secure';

    return new HttpResponse(null, {
      status: 201,
      statusText: "Success to get",
    });
  }),



  http.get("/shoppingBag", () => {
    // Construct a JSON response with the list of all posts
    // as the response body.

    return HttpResponse.json(shoppingBagData, {
      status: 201,
      statusText: "Success to get shopping Bag",
    });
  }),


];
