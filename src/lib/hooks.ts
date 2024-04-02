import { useEffect, useState } from "react";
import { TJobItem, TJobItemExtended } from "./types";
import { BASE_API_URL } from "./constants";

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
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 9);
  const totalJobItems = jobItems.length;

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
        setIsLoading(false);
        setJobItems(data?.jobItems);
      } catch (error) {
        console.log("Failed to fetch data [SEARCH FORM] ", error);
        throw new Error("Something went wrong!!");
      }
    };

    fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalJobItems } as const;
}

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

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
}
