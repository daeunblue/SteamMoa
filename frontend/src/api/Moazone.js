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
  return apiAuth.get(url)
}

// 모아글 검색
export const moaSearch = () => {
  const url = `moazone/search`;
  return apiAuth.get(url);
}

