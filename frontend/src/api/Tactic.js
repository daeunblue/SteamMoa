import { api } from "./api";

//tactic
// {
//     "gameId": 1,
//     "tacticContent": "공략글 내용",
//     "tacticTitle": "공략글 제목",
//     "userId": 1
// }

export const postTactics = (tactic) => {
  const url = `tactics`;
  return api.post(url, tactic);
};

export const putTactics = (tactic) => {
  const url = `tactics`;
  return api.put(url, tactic);
};

export const getTacticGame = (gameId) => {
  const url = `tactics/game/${gameId}`;
  return api.get(url);
};

export const getTacticUser = (userId) => {
  const url = `tactics/user/${userId}`;
  return api.get(url);
};
