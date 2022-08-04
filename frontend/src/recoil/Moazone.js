import { atom } from "recoil";

// 모아존 현재 페이지 정보 
export const moaPage = atom({
  key: "moazonePage",
  default: 1,
});

// 모아존 최대 페이지 정보 
export const moaMaxPage = atom({
  key: "moazoneMaxPage",
  default: 1,
});

//모아존 검색 단어
export const moaSearchWord = atom({
  key: "moazoneSearchWord",
  default: "",
});

//모아존 검색 필터
export const moaSearchFilter = atom({
  key: "moazoneSearchFilter",
  default: [],
});
