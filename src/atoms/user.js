import { atom } from "recoil";

export const usernameState = atom({
  key: "usernameState",
  default: {
    isAuthenticated: false,
    user: localStorage.getItem("username") || "",
  },
});

export const theme = atom({
  key: "theme",
  default: {
    isEnabled: false,
  },
});
