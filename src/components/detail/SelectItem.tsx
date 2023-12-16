import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config";
import { useNavigate } from "react-router-dom";

interface ItemSelectionProps {
  options: {
    label: string;
    values: { value: string; label: string }[];
  }[];

  price: number;
}

interface ItemValue {
  value: string;
  label: string;
}

interface ItemRequire {
  [key: string]: string | number | ItemValue;
  count: number;
}

interface ItemRequire2 {
  [key: string]: {
    value: string;
    label: string;
  };
}

const ItemSelection: React.FC<ItemSelectionProps> = ({ options, price }) => {
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
    const selectLabel = event.target.selectedOptions[0].label;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionLabel]: {
        value: event.target.value,
        label: selectLabel,
      },
    }));
  };

  // 셀렉트 박스 변경시 useState의 비동기 문제 해당처리
  useEffect(() => {
    handleSetSelectedItem();
  }, [selectedOptions]);

  // 모두 변경되었을 경우 선택 아이탬 만드는 함수
  const handleSetSelectedItem = () => {
    if (Object.keys(selectedOptions).length === options.length) {
      const existingItemIndex = selectedItems.findIndex((obj) => {
        return Object.keys(selectedOptions).every((key) => {
          return (
            (obj[key] as ItemValue).value === selectedOptions[key].value &&
            (obj[key] as ItemValue).label === selectedOptions[key].label
          );
        });
      });

      if (existingItemIndex !== -1) {
        // 이미 선택된 옵션인 경우, 해당 아이템의 개수를 증가시킴
        setSelectedItems((prev) => {
          const newDatas = [...prev];
          newDatas[existingItemIndex].count += 1;

          return newDatas;
        });
      } else {
        // 새로운 옵션인 경우, 새로운 아이템 추가
        const newItem = {
          ...selectedOptions,
          count: 1,
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
  const handleChangeCount = (type: string, index: number) => {
    //변경조건
    let num = 0;
    if (type === "up") num = 1;
    else if (type === "down") num = -1;

    setSelectedItems((prev) =>
      prev.map((item, index1) => {
        //동작했을때 0개면 동작안하게
        if (item.count + num === 0) return item;
        //정상동작
        return index === index1 ? { ...item, count: item.count + num } : item;
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
  }, [selectedItems]);

  //장바구니 버튼 클릭시
  const AddToShoppingBag = () => {
    if (userInfo.name === null) return navigate("/login");

    sessionStorage.setItem("shoppingBag", JSON.stringify(selectedItems));
  };
  return (
    <SelectSection>
      {options.map((option) => (
        <div key={option.label}>
          <select
            value={selectedOptions[option.label]?.value || ""}
            onChange={(e) => handleOptionChange(option.label, e)}
          >
            <option value="">Select {option.label}</option>
            {option.values.map((value) => (
              <option key={value.value} value={value.value}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      <p>You have selected:</p>
      {
        <div className="items">
          {selectedItems.map((item, index) => (
            <div className="item" key={index}>
              {Object.entries(item).map(([key, value]) => {
                const ITem = item[key] as ItemValue;
                console.log(item);
                console.log(selectedItems);
                return (
                  <div key={key}>
                    {key === "count" ? (
                      <div>
                        <button onClick={() => handleChangeCount("up", index)}>
                          ▲
                        </button>

                        {item.count}
                        <button
                          onClick={() => handleChangeCount("down", index)}
                        >
                          ▼
                        </button>
                      </div>
                    ) : (
                      <span> {ITem.label}</span>
                    )}
                  </div>
                );
              })}

              <button onClick={() => handleDeleteItem(index)}>x</button>
            </div>
          ))}
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
