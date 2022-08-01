package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.tactic.Tactic;
import com.ssafy.backend.db.repository.TacticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TacticServiceImpl implements TacticService{
    @Autowired
    TacticRepository tacticRepository;
    @Override
    public List<Tactic> getTacticsByGameId(Long gameId) {
        return tacticRepository.findByGameGameId(gameId).get();
    }

    @Override
    public List<Tactic> getTacticsByUserId(Long userId) {
        return tacticRepository.findByUserUserId(userId).get();
    }
}
