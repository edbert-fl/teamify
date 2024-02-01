import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Organization, User } from "../utils/Types";

interface AppContextProps {
  currOrganization: Organization | null;
  setCurrOrganization: Dispatch<SetStateAction<Organization | null>>;
  currUser: User | null;
  setCurrUser: Dispatch<SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>({
  currOrganization: null,
  setCurrOrganization: () => {},
  currUser: null,
  setCurrUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};