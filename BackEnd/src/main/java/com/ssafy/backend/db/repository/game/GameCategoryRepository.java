package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Gamecategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameCategoryRepository extends JpaRepository<Gamecategory, String> {
}
