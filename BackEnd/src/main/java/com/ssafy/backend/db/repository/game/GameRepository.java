package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>, GameCustomRepository {

    Game findByGameId(Long gameId);

    // 멀티게임, 그리고 판매중(가격이 -1이 아닌)인 게임만 불러오도록 쿼리 수정 필요
    @Query(value = "select * from game inner join gamecategory on game.game_id = gamecategory.game_id where gamecategory.category_id = 1 and game.game_price != -1",
            countQuery="select count(*) from game inner join gamecategory on game.game_id = gamecategory.game_id where gamecategory.category_id = 1 and game.game_price != -1",
            nativeQuery = true)
    List<Game> findAllMultiGame(Pageable pageable);

    // 유무료 검색
    List<Game> findAllByIsFree(boolean isFree);
}
