import { api, apiAuth } from "./api";

//모아글 전체 조회
export const getMoaList = (page) => {
  const url = `moazone?page=${page}`;
  return api.get(url);
};

// 모아글 생성
export const moaCreate = (moa) => {
  const url = "moazone";
  return apiAuth.post(url, moa);
};
// 모아글 수정
export const moaUpdate = (moa, partyId) => {
  const url = `moazone/${partyId}`;
  return apiAuth.put(url, moa);
};
// 모아글 생성시 게임ID 검색
export const moaGameSearch = () => {
  const url = `moazone/games`;
  return api.get(url);
};

// 모아글 상세
export const moaDetail = (partyId) => {
  const url = `moazone/${partyId}`;
  return api.get(url);
};

// 모아글 검색
export const getMoaListSearch = (page, searchWord, searchSort, searchFilter) => {
  let url = `moazone/search?page=${page}`;
  url += searchWord ? `&searchString=${searchWord}`:"";
  url += searchSort ? `&sortString=${searchSort}` : "";
  
  const partyStatuses = searchFilter.filter((filter) => (filter.category === 1 ? true : false));
  const partyTags = searchFilter.filter((filter) => (filter.category === 2 ? true : false));

  partyStatuses.forEach((status) => {
    url += `&partyStatuses=${status.item}`;
  });
  partyTags.forEach((tag) => {
    url += `&partyTags=${tag.item}`;
  });

  console.log(url);
  return api.get(url);
};
