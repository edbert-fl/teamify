import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Organization, SelectedDaysOfTheWeek, User } from "../utils/Types";

interface AdminContextProps {
  selectedDays: SelectedDaysOfTheWeek;
  setSelectedDays: Dispatch<SetStateAction<SelectedDaysOfTheWeek>>;
  selectedUsers: User[],
  setSelectedUsers: Dispatch<SetStateAction<User[]>>; 
}

export const AdminContext = createContext<AdminContextProps | undefined>({
  selectedDays: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  setSelectedDays: () => {},
  selectedUsers: [],
  setSelectedUsers: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a ContextProvider");
  }
  return context;
};
