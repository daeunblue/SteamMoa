import { api, apiAuth } from "./api";

export const postTactics = (tactic) => {
  const url = `tactics`;
  return api.post(url, tactic);
};

export const putTactics = (tactic) => {
  const url = `tactics`;
  return apiAuth.put(url, tactic);
};

export const getTacticGame = (gameId) => {
  const url = `tactics/game/${gameId}`;
  return api.get(url);
};

export const getTacticUser = (userId) => {
  const url = `tactics/user/${userId}`;
  return api.get(url);
};
