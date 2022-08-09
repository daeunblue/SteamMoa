import { apiAuth } from "./api"

//모아글 전체 조회
export const moaRead = ()  => {
  const url = 'moazone';
  return apiAuth.get(url);
}

// 모아글 생성
export const moaCreate = (moa) => {
  const url = 'moazone';
  return apiAuth.post(url, moa);
}
// 모아글 수정
export const moaUpdate = (moa, partyId) => {
  const url = `moazone/${partyId}`;
  return apiAuth.put(url, moa)
}
// 모아글 생성시 게임ID 검색
export const moaGameSearch = (gameName) => {
  let url = `moazone/games?`;
  url += `game_name=${gameName}`;
  return apiAuth.get(url);
}

// 모아글 상세
export const moaDetail = (partyId) => {
  const url = `moazone/${partyId}`;
  return apiAuth.get(url);
};

//모아글 삭제
export const moaDelete = (partyId) => {
  const url = `moazone/${partyId}`
  return apiAuth.delete(url);
}

// 모아글 검색
export const getMoaListSearch = (page, searchSort, searchWord, searchFilter) => {
  let url = `moazone/search?page=${page}`;
  url += searchSort ? `&sortString=${searchSort}` : "";
  url += searchWord ? `&searchString=${searchWord}` : "";

  const partyStatuses = searchFilter.filter((filter) => (filter.category === 1 ? true : false));
  const partyTags = searchFilter.filter((filter) => (filter.category === 2 ? true : false));

  partyStatuses.forEach((status) => {
    url += `&partyStatuses=${status.item}`;
  });
  partyTags.forEach((tag) => {
    url += `&partyTags=${tag.item}`;
  });

  return apiAuth.get(url);
};
