import { createContext, ReactNode, useContext } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { getMe } from "../api";
import Loader from "../components/Loader";
import { User } from "../types";

const MeContext = createContext<{
  user: User;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

const MeContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery("me", getMe);

  return (
    <MeContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </MeContext.Provider>
  );
};

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
