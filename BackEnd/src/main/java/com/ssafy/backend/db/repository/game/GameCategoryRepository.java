package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Gamecategory;
import com.ssafy.backend.db.entity.game.Gamegenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCategoryRepository extends JpaRepository<Gamecategory, Long> {
    List<Gamecategory> findAllByGame_GameId(Long gameId);

    List<Gamecategory> findAllByCategory_CategoryId(Long categoryId);

}
