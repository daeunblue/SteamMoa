package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.TacticPostReq;
import com.ssafy.backend.db.entity.tactic.Tactic;
import com.ssafy.backend.db.repository.TacticRepository;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TacticServiceImpl implements TacticService{
    @Autowired
    TacticRepository tacticRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;

    @Override
    public List<Tactic> getTacticsByGameId(Long gameId) {
        return tacticRepository.findByGameGameId(gameId).get();
    }

    @Override
    public List<Tactic> getTacticsByUserId(Long userId) {
        return tacticRepository.findByUserUserId(userId).get();
    }

    @Override
    public boolean createTactics(TacticPostReq tacticPostReq) {
        Tactic tactic = new Tactic();
        try{
            tactic.setTacticTitle(tacticPostReq.getTacticTitle());
            tactic.setTacticContent(tacticPostReq.getTacticContent());
            /* Optional 객체의 경우 .isPresent()로 null 체크를 해야한다 ! */
            /* 유효하지 않은 입력인 경우(존재하지 않는 사용자, 존재하지 않는 게임에 관한 요청)처리하기 */
            if(!userRepository.findByUserId(tacticPostReq.getUserId()).isPresent() || (gameRepository.findByGameId(tacticPostReq.getGameId()) == null)){
                return false;
            }
            tactic.setUser(userRepository.findByUserId(tacticPostReq.getUserId()).get());
            tactic.setGame(gameRepository.findByGameId(tacticPostReq.getGameId()));
            tacticRepository.save(tactic);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
