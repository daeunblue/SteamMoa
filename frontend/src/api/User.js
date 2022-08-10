import { api, apiAuth } from "./api";

//회원정보 조회
export const getUserInfo = (userServiceId) => {
  const url = `user/profile/${userServiceId}`;
  return api.get(url);
};

//회원정보 수정
export const putUserInfo = (newInfo) => {
  const url = `user/profile`;
  return apiAuth.put(url, newInfo);
};

// 팔로잉 리스트
export const getUserFollowing = (userServiceId) => {
  const url = `user/follow/${userServiceId}`;
  return api.get(url);
};

// 팔로워 리스트
export const getUserFollowwers = (userServiceId) => {
  const url = `user/follower/${userServiceId}`;
  return api.get(url);
};

// 내가 작성한 파티
export const getUserParty = (userServiceId) => {
  const url = `user/profile/${userServiceId}/parties/created`;
  return apiAuth.get(url);
};

// 종료 파티
export const getUserCompletedParty = (userServiceId) => {
  const url = `user/profile/${userServiceId}/parties/completed`;
  return apiAuth.get(url);
};

// 진행 파티
export const getUserProceedingParty = (userServiceId) => {
  const url = `user/profile/${userServiceId}/parties/proceeding`;
  return apiAuth.get(url);
};

// 팔로우
export const postUserFollow = (followInfo) => {
  const url = `user/follow`;
  return apiAuth.put(url, followInfo);
};

// 팔로우 취소
export const deleteUserFollow = (followInfo) => {
  const url = `user/unfollow`;
  return apiAuth.put(url, followInfo);
};
