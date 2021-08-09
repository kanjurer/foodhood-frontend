import { AxiosResponse } from 'axios';
import { useState } from 'react';

export function usePaginateData<T>(
  fetchData: (pageNumber: number) => Promise<AxiosResponse<T[]>>,
  errCallback?: () => void
): [T[], () => void, boolean] {
  let [pageNumber, setPageNumber] = useState<number>(1);
  let [data, setData] = useState<T[]>([]);
  let [hasMore, setHasMore] = useState<boolean>(true);

  const handleFetch = () => {
    fetchData(pageNumber)
      .then((res) => {
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setData((data) => [...data, ...res.data]);
        }
        setPageNumber((p) => p + 1);
      })
      .catch((err) => {
        if (errCallback) {
          errCallback();
        }

        console.log(err.response.data);
      });
  };

  return [data, handleFetch, hasMore];
}
