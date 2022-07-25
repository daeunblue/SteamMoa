package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, String> {

    @Query(value = "SELECT * FROM game WHERE game_id=:appid", nativeQuery = true)
    List<Game> findAllBygame_id(String appid);
}
