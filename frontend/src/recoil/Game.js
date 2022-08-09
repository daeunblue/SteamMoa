import { atom } from "recoil";

// 게임 현재 페이지 정보 
export const gamePage = atom({
  key: "gamePage",
  default: 1,
});

// 게임 최대 페이지 정보 
export const gameMaxPage = atom({
  key: "gameMaxPage",
  default: 1,
});

//게임 검색 단어
export const gameSearchWord = atom({
  key: "gameSearchWord",
  default: "",
});

//게임 검색 필터
export const gameSearchFilter = atom({
  key: "gameSearchFilter",
  default: [],
});
