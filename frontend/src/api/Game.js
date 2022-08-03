import { api } from "./api";

export const getGamesSearch = (page, filter, search) => {
  let url = `games/search?`;
  url += `page=${page}`;
  url += `&name=${search}`;

  filter.forEach((filterItem) => {
    url += `&tag=${filterItem.name}`;
  });

  return api.get(url);
};

export const getGame = (gameId) => {
  const url = `games/${gameId}`;
  return api.get(url);
};
