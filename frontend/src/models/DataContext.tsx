import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface DataContextType {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  loop: string[];
  setLoop: React.Dispatch<React.SetStateAction<string[]>>;
  queue: string[];
  setQueue: React.Dispatch<React.SetStateAction<string[]>>;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataContextProviderProps {
  children: ReactNode;
}

export function DataContextProvider({
  children,
}: DataContextProviderProps): React.ReactElement {
  const [images, setImages] = useState<string[]>([]);
  const [loop, setLoop] = useState<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        images,
        setImages,
        isPopupOpen,
        setIsPopupOpen,
        loop,
        setLoop,
        queue,
        setQueue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
}
