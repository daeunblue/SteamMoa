import { atom } from "recoil";

export const gamePage = atom({
  key: "gamePage",
  default: 1,
});

export const searchWord = atom({
  key: "searchWord",
  default: "",
});

export const searchFilter = atom({
  key: "searchFilter",
  default: [],
});
