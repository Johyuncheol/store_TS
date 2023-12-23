import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const MyBag = () => {
  const navigate = useNavigate();

  interface ItemRequire {
    size?: string;
    color?: string;
    other?: string;
    count: number;
    price: number;
    orderPrice: number;
    id: string;
    imgSrc: string;
    name: string;
    deliveryFee: number;
    noDeliveryPrice: number;
  }

  const [data, setData] = useState<ItemRequire[]>([]);
  const [checkedItem, setCheckedItem] = useState<boolean[]>([]);
  const [AllCheckState, setAllCheckState] = useState(false);

  // 종합정보
  const [payInfo, setPayInfo] = useState({
    orderPrice: 0,
    deliveryFee: 0,
    numOfItems: 0,
    totalPrice: 0,
  });


  //세션스토리지에서 데이터가져오기 
  const GetBagData = async () => {
    const shoppingBagData = sessionStorage.getItem("shoppingBag");
    setData(JSON.parse(shoppingBagData ?? "[]"));
  };

  useEffect(() => {
    GetBagData();


    //data의 개수가 장바구니페이지 처음들어왔을때가 최대라 data로 의존배열 안넣음
    //넣게되면 개수변경마다 체크 상태 다풀림 
    setCheckedItem(Array(data.length).fill(false));
  }, []);



  // 장바구니 데이터 변경시 세션의 데이터도 변경 
  useEffect(() => {
    sessionStorage.setItem("shoppingBag", JSON.stringify(data));
  }, [data]);



  //선택아이탬 변경시 종합정보 변경 
  useEffect(() => {
    setPayInfo(() => {
      const selectedItems = data.filter(
        (item, index) => checkedItem[index] === true
      );

      const orderPrice = selectedItems.reduce(
        (acc, item) => acc + item.orderPrice,
        0
      );
      const deliveryFee = selectedItems.reduce(
        (acc, item) => acc + item.deliveryFee,
        0
      );

      const totalPrice = orderPrice + deliveryFee;
      const numOfItems = selectedItems.length;
      const newPayInfo = {
        orderPrice,
        deliveryFee,
        numOfItems,
        totalPrice,
      };
      return newPayInfo;
    });
  }, [checkedItem,data]);


  //체크박스 변경
  const handleCheckboxChange = (index: number) => {
    setCheckedItem((prev) => {
      const newItem = [...prev];
      newItem[index] = !newItem[index];
      return newItem;
    });
  };


  //체크박스 전체변경
  const handleAllCheckboxChange = (state: boolean) => {
    setCheckedItem(Array(data.length).fill(!state));
    setAllCheckState(!state);
  };


  // 아이템 삭제 
  const handleDeleteItems = () => {
    setData((prevMyBagData) => {
      const newMyBagData = [...prevMyBagData].filter(
        (item, index) => checkedItem[index] === false
      );
      sessionStorage.setItem("shoppingBag", JSON.stringify(newMyBagData));

      return newMyBagData;
    });
  };


  // 담은 상품없을때
  const handleNavigate = () => {
    navigate("/best");
  };


  console.log(data)
// 아이템 수량 변경 함수 
  const ChangeNumOfItem = ({index,type}: {index: number;type: string;}) => {
    let num = 0;
    if (type === "up") num = 1;
    else if (type === "down") num = -1;

    setData((prev) =>
      prev.map((item, prevIndex) => {
        //동작했을때 0개면 동작안하게
        if (item.count + num === 0) return item;
        //정상동작
        return prevIndex === index
          ? {
              ...item,
              count: item.count + num,
              orderPrice: item.orderPrice + item.price * num,
            }
          : item;
      })
    );
  };

  return (
    <CenterWrap>
      <MyBagSection>
        <div className="process">
          <span>01 SHOPPING BAG</span>
          <span>{"->"}</span>
          <span>02 ORDER</span>
          <span>{"->"}</span>
          <span>03 ORDER CONFIRMED</span>
        </div>

        <div className="itemSection">
          {data !== null ? (
            <div className="layout1">
              <div className="layout">
                <div className="menuItem">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={AllCheckState}
                    onChange={() => handleAllCheckboxChange(AllCheckState)}
                  ></input>
                </div>
                <div className="menuItem">상품 정보</div>
                <div className="menuItem">수량</div>
                <div className="menuItem">주문금액</div>
                <div className="menuItem">배송비</div>
              </div>

{
 
}
              {data?.map((item, index) => {
                return (
                  <div className="layout" key={index}>
                    <div className="item">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checkedItem[index]}
                        onChange={() => handleCheckboxChange(index)}
                      ></input>
                    </div>

                    <div className="Imgitem">
                      <img src={item.imgSrc} />
                      <div>
                        <p>{item.name}</p>
                        <p>
                          {item.color}
                          {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="item">{item.count}</div>
                    <div className="item">
                      <button
                        onClick={() =>
                          ChangeNumOfItem({ index: index, type: "down" })
                        }
                      >
                        ▼
                      </button>
                      {item.orderPrice}
                      <button
                        onClick={() =>
                          ChangeNumOfItem({ index: index, type: "up" })
                        }
                      >
                        ▲
                      </button>
                    </div>

                    <div className="item">{item.deliveryFee}</div>
                  </div>
                );
              })}

              <div className="del">
                <button onClick={handleDeleteItems}>선택상품삭제</button>
                {/*  <span>장바구니는 접속종료후 60일 동안 유지됩니다</span> */}
              </div>

              <div className="layoutResult">
                <div className="menuItem">총 주문금액</div>
                <div className="menuItem">총 배송비</div>
                <div className="menuItem">총 결제금액</div>
              </div>

              <div className="layoutResult2">
                <div className="menuItem">
                  <div>{payInfo.orderPrice}</div>
                  <div>{payInfo.numOfItems}</div>
                </div>
                <div className="menuItem">+</div>
                <div className="menuItem">{payInfo.deliveryFee}</div>
                <div className="menuItem">=</div>
                <div className="menuItem">{payInfo.totalPrice}</div>
              </div>

              <div className="FinishBoxWrap">
                <button className="menuItem">쇼핑 계속하기</button>
                <button className="menuItem">결제하기</button>
              </div>
            </div>
          ) : (
            <div className="nonItems">
              <span>장바구니에 담은 상품이 없습니다</span>
              <button className="goBest" onClick={handleNavigate}>
                추천상품 보러가기
              </button>
            </div>
          )}
        </div>
      </MyBagSection>
    </CenterWrap>
  );
};

export default MyBag;

const CenterWrap = styled.section`
  display: flex;
  justify-content: center;
`;
const MyBagSection = styled.section`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  width: 64rem;
  align-items: center;

  .process {
    display: flex;
    gap: 2rem;
    height: 5rem;
  }
  .itemSection {
    border-top: 3px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 20rem;

    .empty {
      font-size: 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .goBest {
        min-height: 3rem;
        font-size: 1.3rem;
        font-weight: 600;

        &:hover {
          color: white;
          background-color: black;
        }
      }
    }

    .layout {
      display: grid;
      grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
      grid-gap: 20px;
      gap: 20px;
      border-bottom: 1px solid #cbcaca;
    }

    .layoutResult {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      gap: 20px;
      border-bottom: 1px solid #cbcaca;
    }

    .layoutResult2 {
      display: grid;
      grid-template-columns: 2fr 0.1fr 2fr 0.1fr 2fr;
      grid-gap: 20px;
      gap: 20px;
      border-bottom: 1px solid #cbcaca;
    }

    .layout1 {
      width: 100%;
    }
    .item {
      display: flex;
      justify-content: space-around;;
      align-items: center;
      font-weight: 500;
      height: 10rem;
    }

    .Imgitem {
      display: flex;
      gap:10px;
      align-items: center;
      font-weight: 500;
      height: 10rem;
      img {
        width: 50%;
        min-width: 50px;
        height: 10rem;
      }
    }

    .menuItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      height: 5rem;
    }

    .checkbox {
      width: 1.5rem;
      height: 1.5rem;
    }

    .del {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 5rem;
      border-bottom: 1px solid black;

      button {
        width: 130px;
        height: 50px;
        background-color: #e0e0e2;
        border: 1px solid grey;
        cursor: pointer;

        &:hover {
          background-color: black;
          color: white;
        }
      }
    }

    .FinishBoxWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      height: 200px;

      button {
        width: 200px;
        height: 50px;
        background-color: black;
        color: white;
        border: 1px solid grey;
        font-weight: 800;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
          color: #ddbafd;
        }
      }
    }

    .nonItems {
      font-size: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 20rem;

      gap: 5rem;

      button {
        width: 80%;
        height: 50px;
        background-color: black;
        color: white;
        border: 1px solid grey;
        font-weight: 800;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
          color: #ddbafd;
        }
      }
    }
  }
`;
