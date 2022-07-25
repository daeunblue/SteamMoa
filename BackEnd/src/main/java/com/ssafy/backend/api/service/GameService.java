package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GameDTO;

import java.util.List;

/**
 *	게임 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface GameService {
    // 게임 전체 목록 조회: 상세정보 필요 없음
    List<Game> getGameList();

    // 게임 검색
    List<Game> searchGameList(String searchString);

    // 게임 상세 정보 조회
    GameDTO getGameDetail(Long gameId);
}
