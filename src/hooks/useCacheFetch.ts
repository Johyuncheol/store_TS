import { useState, useEffect, useMemo } from 'react';

// 타입 정의
interface CachedData {
  [key: string]: any; // 여기에는 실제 데이터의 타입을 지정하면 좋습니다.
}

const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useCacheFetch = (url: string): (() => Promise<any>) => {
  const [cachedData, setCachedData] = useState<CachedData>({});

  const getData = async () => {
    try {
      // 캐시에 데이터가 있으면 해당 데이터를 반환
      if (cachedData[url]) {
        return cachedData[url];
      }

      // 캐시에 데이터가 없으면 서버에서 데이터를 가져옴
      const data = await fetchData(url);

      // 캐시 업데이트
      setCachedData((prevCache) => ({ ...prevCache, [url]: data }));

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // 컴포넌트가 마운트되거나 URL이 변경될 때마다 데이터를 가져옴
  useEffect(() => {
    getData();
  }, [url]);

  // useMemo를 사용하여 getData 함수를 메모이제이션하여 성능 향상
  const memoizedGetData = useMemo(() => getData, [url]);

  return memoizedGetData;
};

export default useCacheFetch;
