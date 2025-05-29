import { useEffect } from "react";
import { useDataContext } from "../models/DataContext";

interface useMainViewModelReturn {}

export function useMainViewModel(): useMainViewModelReturn {
  const { fetchData } = useDataContext();
  useEffect(() => {
    fetchData();
  }, []);

  return {};
}

export default useMainViewModel;
