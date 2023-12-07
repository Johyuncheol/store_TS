import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getShoppingBag } from "../api/user";
import { useNavigate } from "react-router-dom";
const MyBag = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getShoppingBag();
    setMyBagData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  interface MyBagDataRequire {
    name: string;
    count: number;
    price: number;
    delivery: number;
    check: boolean;
  }
  const [MyBagData, setMyBagData] = useState<MyBagDataRequire[]>([]);
  const [AllCheckState, setAllCheckState] = useState(true);

  const [payInfo, setPayInfo] = useState({
    orderPrice: 0,
    deliveryFee: 0,
    numOfItems: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    setPayInfo(() => {
      const selectedItems = MyBagData.filter((item) => item.check === true);

      const orderPrice = selectedItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const deliveryFee = selectedItems.reduce(
        (acc, item) => acc + item.delivery,
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
  }, [MyBagData]);

  const handleCheckboxChange = (index: number) => {
    setMyBagData((prevMyBagData) => {
      const newMyBagData = [...prevMyBagData];
      newMyBagData[index].check = !newMyBagData[index].check;
      return newMyBagData;
    });
  };

  const handleAllCheckboxChange = () => {
    setMyBagData((prevMyBagData) => {
      const newMyBagData = prevMyBagData.map((item) => ({
        ...item,
        check: AllCheckState,
      }));
      return newMyBagData;
    });

    setAllCheckState((prevAllCheckState) => {
      const newAllCheckState = !prevAllCheckState;
      return newAllCheckState;
    });
  };

  const handleDeleteItems = () => {
    setMyBagData((prevMyBagData) => {
      const newMyBagData = [...prevMyBagData].filter(
        (item) => item.check === false
      );
      return newMyBagData;
    });

    //or 서버로 요청해서 장바구니를 비운다 ?
  };

  const handleNavigate = () => {
    navigate("/best");
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
          {MyBagData.length !== 0 ? (
            <div className="layout1">
              <div className="layout">
                <div className="menuItem">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={handleAllCheckboxChange}
                  ></input>
                </div>
                <div className="menuItem">상품 정보</div>
                <div className="menuItem">수량</div>
                <div className="menuItem">주문금액</div>
                <div className="menuItem">배송비</div>
              </div>

              {MyBagData.map((item, index) => {
                return (
                  <div className="layout" key={index}>
                    <div className="item">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={item.check}
                        onChange={() => handleCheckboxChange(index)}
                      ></input>
                    </div>
                    <div className="item">{item.name}</div>
                    <div className="item">{item.count}</div>
                    <div className="item">{item.price}</div>
                    <div className="item">{item.delivery}</div>
                  </div>
                );
              })}

              <div className="del">
                <button onClick={handleDeleteItems}>선택상품삭제</button>
                <span>장바구니는 접속종료후 60일 동안 유지됩니다</span>
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
display:flex;
justify-content:center;

`
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
      justify-content: center;
      align-items: center;
      font-weight: 500;
      height: 10rem;
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
