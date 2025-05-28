import { useEffect } from "react";
import { get } from "../scripts/api";
import { useDataContext } from "../models/DataContext";

interface useMainViewModelReturn {
  reload: () => Promise<void>;
}

export function useMainViewModel(): useMainViewModelReturn {
  const { setImages, setQueue, setLoop } = useDataContext();

  const reload = async (): Promise<void> => {
    const fetchAndSet = async (
      label: "images" | "queue" | "loop",
      setFn: (imgs: string[]) => void
    ) => {
      const data = await get(label);
      const imgs = data.map((img: string) => "http://localhost:3141" + img);
      setFn(imgs);
      console.log(`${label}:`, imgs);
    };

    fetchAndSet("images", setImages);
    fetchAndSet("queue", setQueue);
    fetchAndSet("loop", setLoop);
  };

  useEffect(() => {
    reload();
  }, []);

  return { reload };
}

export default useMainViewModel;
