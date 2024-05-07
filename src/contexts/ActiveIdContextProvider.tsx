import { createContext, useContext } from "react";
import { useActiveId } from "../lib/hooks";

type TActiveIdContextType = {
  activeId: number | null;
};

const ActiveIdContext = createContext<TActiveIdContextType | null>(null);
const ActiveIdContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const activeId = useActiveId();
  const values = {
    activeId,
  };

  return (
    <ActiveIdContext.Provider value={values}>
      {children}
    </ActiveIdContext.Provider>
  );
};

export default ActiveIdContextProvider;

export const useActiveIdContext = () => {
  const activeIdContext = useContext(ActiveIdContext);

  if (!activeIdContext) {
    throw new Error(
      "useActiveIdContext should be inside ActiveIdContextProvider"
    );
  }

  return activeIdContext;
};
