package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Gamegenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameGenreRepository extends JpaRepository<Gamegenre, String> {
}
