package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.TacticPostReq;
import com.ssafy.backend.api.request.TacticPutReq;
import com.ssafy.backend.api.response.TacticDto;
import com.ssafy.backend.db.entity.tactic.Tactic;

import java.util.List;

public interface TacticService {
    List<TacticDto> getTacticsByGameId(Long gameId);
    List<TacticDto> getTacticsByUserId(Long userId);
    boolean createTactics(TacticPostReq tacticPostReq);
    boolean updateTactic(TacticPutReq tacticPutReq);
}
