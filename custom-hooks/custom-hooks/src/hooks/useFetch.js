//functions that starts with use are considered to be a hook.
import { useEffect, useState} from "react";
export function useFetch(fetchFN) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const[fetchData, setFetchData] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const places = await fetchFN();
        setFetchData(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFN]);

  return {
    isFetching,
    fetchData,
    error
  }
}
