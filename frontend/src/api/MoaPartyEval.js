import { api, apiAuth } from "./api"

export const getPartyEvalInfo = (partyId, userServiceId) => {
  const url = `moazone/eval/${partyId}/${userServiceId}`;
  return api.get(url)
}

export const postPartyEval = (evalInfo) => {
  const url = `moazone/eval`;
  return apiAuth.post(url, evalInfo)
}
