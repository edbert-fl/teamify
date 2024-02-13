import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Organization, SelectedDaysOfTheWeek, User } from "../utils/Types";

interface AdminContextProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedDays: SelectedDaysOfTheWeek;
  setSelectedDays: Dispatch<SetStateAction<SelectedDaysOfTheWeek>>;
  selectedUsers: User[],
  setSelectedUsers: Dispatch<SetStateAction<User[]>>; 
  userToEdit: User | null,
  setUserToEdit: Dispatch<SetStateAction<User | null>>; 
}

export const AdminContext = createContext<AdminContextProps | undefined>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
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
  userToEdit: null,
  setUserToEdit: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a ContextProvider");
  }
  return context;
};
