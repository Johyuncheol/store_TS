import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config";
import { useNavigate } from "react-router-dom";

interface ItemSelectionProps {
  options: {
    label: string;
    values: string[];
  }[];

  price: number;
  id: string;
  imgSrc: string;
  name: string;
  deliveryFee: number;
  noDeliveryPrice: number;
}

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

interface ItemRequire2 {
  [key: string]: string;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  options,
  price,
  id,
  imgSrc,
  name,
  deliveryFee,
  noDeliveryPrice,
}) => {
  console.log(price);
  const [selectedOptions, setSelectedOptions] = useState<ItemRequire2>({});
  const [selectedItems, setSelectedItems] = useState<ItemRequire[]>([]);
  const [totalNums, setTotalNums] = useState(0);

  const userInfo = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();

  // 셀렉트 박스 변경함수
  const handleOptionChange = (
    optionLabel: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionLabel]: event.target.value,
    }));
  };

  // 셀렉트 박스 변경시 useState의 비동기 문제 해당처리
  useEffect(() => {
    handleSetSelectedItem();
  }, [selectedOptions]);

  // 모두 변경되었을 경우 선택 아이탬 만드는 함수
  const handleSetSelectedItem = () => {
    if (Object.keys(selectedOptions).length === options.length) {
      const existingItemIndex = selectedItems.findIndex((item) => {
        return Object.entries(item).every(([key, value]) => {
          console.log(value);
          console.log(selectedOptions[key]);

          // 옵션들이 아이탬으로 되었을때 생기는 고정적인 데이터에 대해 비교 x
          if (
            key === "count" ||
            key === "price" ||
            key === "id" ||
            key === "imgSrc" ||
            key === "name" ||
            key === "deliveryFee" ||
            key === "noDeliveryPrice" ||
            key === "orderPrice"
          ) {
            return true;
          }
          // 제외속성이외 기존아이탬과 동일한 옵션인지 확인
          return selectedOptions[key] === value;
        });
      });

      if (existingItemIndex !== -1) {
        // 이미 선택된 옵션인 경우, 해당 아이템의 개수를 증가시킴
        setSelectedItems((prev) => {
          const newDatas = [...prev];
          newDatas[existingItemIndex].count += 1;
          newDatas[existingItemIndex].orderPrice =
            newDatas[existingItemIndex].count *
            newDatas[existingItemIndex].price;

          return newDatas;
        });
      } else {
        // 새로운 옵션인 경우, 새로운 아이템 추가
        const newItem = {
          ...selectedOptions,
          count: 1,
          id,
          imgSrc,
          name,
          deliveryFee,
          price,
          noDeliveryPrice,
          orderPrice: price,
        };

        setSelectedItems((prev) => [...prev, newItem]);
      }
      setSelectedOptions({});
    }
  };

  //아이탬 삭제 함수
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((item, i) => i !== index));
  };

  // 수량 변경 함수
  const handleChangeCount = ({type,index} : {type: string, index: number}) => {
    //변경조건
    let num = 0;
    if (type === "up") num = 1;
    else if (type === "down") num = -1;

    setSelectedItems((prev) =>
      prev.map((item, prevIndex) => {
        //동작했을때 0개면 동작안하게
        if (item.count + num === 0) return item;
        //정상동작
        const newCount = item.count + num;
        return prevIndex === index ? { ...item, count: newCount, orderPrice:item.price* newCount} : item;
      })
    );
  };

  // 아이탬 개수 측정
  useEffect(() => {
    const totalItemCount: number = selectedItems.reduce(
      (acc, cur: ItemRequire) => acc + cur.count,
      0
    );
    setTotalNums(totalItemCount);
    console.log(selectedItems);
  }, [selectedItems]);

  // count를 제외한 속성 비교해서 없으면 추가하고 있으면 count값 몰아줌
  const mergeArrays = ({arr1,arr2}:{arr1: ItemRequire[], arr2: ItemRequire[]}) => {
    const result = [...arr1];

    arr2.forEach((obj2) => {
      const matchingObjIndex = result.findIndex(
        (obj1) =>
          obj1.color === obj2.color &&
          obj1.size === obj2.size &&
          obj1.id === obj2.id &&
          obj1.imgSrc === obj2.imgSrc &&
          obj1.name === obj2.name &&
          obj1.deliveryFee === obj2.deliveryFee &&
          obj1.price === obj2.price &&
          obj1.noDeliveryPrice === obj2.noDeliveryPrice
      );

      if (matchingObjIndex !== -1) {
        result[matchingObjIndex].count += obj2.count;
        result[matchingObjIndex].orderPrice =
          result[matchingObjIndex].count * obj2.price;
      } else {
        result.push(obj2);
      }
    });

    return result;
  };

  //장바구니 버튼 클릭시
  const AddToShoppingBag = () => {
    if (userInfo.name === null) return navigate("/login");
    const shoppingBagData = sessionStorage.getItem("shoppingBag");

    if (shoppingBagData !== null) {
      const newArray = mergeArrays({arr1:selectedItems, arr2:JSON.parse(shoppingBagData)});
      sessionStorage.setItem("shoppingBag", JSON.stringify(newArray));
    } else {
      sessionStorage.setItem("shoppingBag", JSON.stringify(selectedItems));
    }
  };

  return (
    <SelectSection>
      {options.map((option) => (
        <div key={option.label}>
          <select
            value={selectedOptions[option.label] || ""}
            onChange={(e) => handleOptionChange(option.label, e)}
          >
            <option value="">Select {option.label}</option>
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
      <p>You have selected:</p>
      {
        <div className="items">
          {selectedItems.map((item, index) => {
            return (
              <div className="item" key={index}>
                <span>{item.color}</span>
                <span>{item.size}</span>
                <div>
                  <button onClick={() => handleChangeCount({type:"down", index:index})}>
                    ▼
                  </button>
                  {item.count}
                  <button onClick={() => handleChangeCount({type:"up", index:index})}>
                    ▲
                  </button>
                </div>

                <button onClick={() => handleDeleteItem(index)}>x</button>
              </div>
            );
          })}
        </div>
      }

      <div className="result">
        <div>{totalNums}개의</div>
        <div>
          <span>총 상품 금액: </span>
          <span>{price * totalNums}</span>
        </div>
      </div>

      <div className="btnWrap">
        <Button state={false} className="" onClick={AddToShoppingBag}>
          장바구니에 담기
        </Button>
        <Button state={true}>바로 구매하기</Button>
      </div>
    </SelectSection>
  );
};

export default ItemSelection;

const SelectSection = styled.section`
  display: flex;
  flex-direction: column;

  .items {
    max-height: 30vh;
    overflow-y: auto;
    border-bottom: 2px solid black;
  }
  .item {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid grey;
    height: 3rem;
    align-items: center;
    font-size: 0.9rem;
  }
  select {
    width: 100%;
  }

  .result {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Button = styled.button<{ state: boolean }>`
  width: 10rem;
  border: 1px solid black;
  text-align: center;
  line-height: 3rem;
  background-color: ${(props) => (props.state ? "black" : "white")};
  color: ${(props) => (props.state ? "white" : "black")};

  cursor: pointer;
`;
