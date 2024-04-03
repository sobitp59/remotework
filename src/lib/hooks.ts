import { useEffect, useState } from "react";
import { TJobItemApiResponse, TJobItemsApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

const fetchJobItem = async (id: number): Promise<TJobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

const fetchJobItems = async (value: string): Promise<TJobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${value}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    retry: false,
    onError: handleError,
  });

  const jobItem = data?.jobItem;
  return { jobItem, isLoading: isInitialLoading } as const;
}
{
  /* 
export function useJobItem(id: number | null) {
  const [jobItem, setIsJobItem] = useState<TJobItemExtended | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/${id}`);
        if (!response.ok) throw new Error();

        const data = await response.json();
        setIsLoading(false);
        setIsJobItem(data.jobItem);
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong! Please Try Again Later");
      }
    }

    fetchData();
  }, [id]);

  return { jobItem, isLoading } as const;
}
*/
}

export function useJobItems(value: string) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-items", value],
    queryFn: () => (value ? fetchJobItems(value) : null),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(value),
    refetchOnWindowFocus: false,
    retry: false,
    onError: handleError,
  });

  const jobItems = data?.jobItems;
  return { jobItems, isLoading: isInitialLoading } as const;
}

{
  /*  
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        setJobItems(data?.jobItems);
      } catch (error) {
        console.log("Failed to fetch data [SEARCH FORM] ", error);
        throw new Error("Something went wrong!!");
      }
    };

    fetchData();
  }, [searchText]);
  return { jobItems, isLoading } as const;
}
*/
}

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
}

export function useActiveId() {
  const [activeJobId, setActiveJobId] = useState<number | null>(
    +window.location.hash.slice(1) || null
  );

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveJobId(id);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobId;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [values, setValues] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values));
  }, [values]);

  return [values, setValues];
};
