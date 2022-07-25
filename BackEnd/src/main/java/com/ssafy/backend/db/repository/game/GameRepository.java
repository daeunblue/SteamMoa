package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Game findByGameId(Long gameId);

    @Query(value = "SELECT * FROM game WHERE game_name like \"%:name%\";", nativeQuery = true)
    List<Game> findAllByName(String name);

    // 유무료 검색
    List<Game> findAllByIsFree(boolean isFree);
}
