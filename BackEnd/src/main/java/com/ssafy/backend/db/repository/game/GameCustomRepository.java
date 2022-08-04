package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Game;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GameCustomRepository {
    List<Game> findAllMultiGameByFilter(String name, String[] tag, Pageable pageable);
    List<Game> findAllMultiGameByOnlyName(String name);
    int findAllMultiGameByFilter(String name, String[] tag);

    List<Game> findAllMultiGameForBests();
    List<Game> findAllMultiGameForFrees();
    List<Game> findAllMultiGameForToday();
}
