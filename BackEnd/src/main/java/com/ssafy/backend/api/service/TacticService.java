package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.TacticPostReq;
import com.ssafy.backend.db.entity.tactic.Tactic;

import java.util.List;

public interface TacticService {
    List<Tactic> getTacticsByGameId(Long gameId);
    List<Tactic> getTacticsByUserId(Long userId);
    boolean createTactics(TacticPostReq tacticPostReq);
}
