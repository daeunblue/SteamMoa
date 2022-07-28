package com.ssafy.backend.db.repository.game;

import com.ssafy.backend.db.entity.game.Gamegenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameGenreRepository extends JpaRepository<Gamegenre, Long> {
    List<Gamegenre> findAllByGame_GameId(Long gameId);

    List<Gamegenre> findAllByGenre_GenreId(Long genreId);

}
