import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { IUsersSLice } from "./user.props";
import { IUser } from "../../interfaces";

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
  value: getStorage("users") || [],
} satisfies IUsersSLice as IUsersSLice;

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state: IUsersSLice, action: PayloadAction<IUser>) => {
      state.value.push(action.payload);
      saveStorage("users", state.value);
    },

    deleteUser: (state, action: PayloadAction<IUser>) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
      saveStorage("users", state.value);
    },

    updateUser: (state, action: PayloadAction<IUser>) => {
      state.value = state.value.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      saveStorage("users", state.value);
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users.value;

export default usersSlice.reducer;

function saveStorage(key: string, value: IUser[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key: string): IUser[] {
  return JSON.parse(localStorage.getItem(key)!);
}
