import { api } from "./api";

//회원정보 조회
export const getUserInfo = (userServiceId) => {
  const url = `user/profile/${userServiceId}`;
  return api.get(url);
};

// //회원정보 수정
// export const putUserInfo = () => {
//   const url = `user/profile`;
//   return api.put(url);
// };
