import { atom } from "recoil";

export const usernameState = atom({
  key: "usernameState",
  default: {
    isAuthenticated: false,
    user: localStorage.getItem("username") || "",
  },
});
