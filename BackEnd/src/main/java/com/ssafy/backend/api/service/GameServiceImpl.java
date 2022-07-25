package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GameDTO;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GameServiceImpl implements GameService {
    @Autowired
    private GameRepository gameRepository;

    @Override
    public List<Game> getGameList() {
        return gameRepository.findAll();
    }

    @Override
    public List<Game> searchGameList(String searchString) {
        return gameRepository.findAllByName(searchString);
    }

    @Override
    public GameDTO getGameDetail(Long gameId) {
        GameDTO gameDetail = new GameDTO(gameRepository.findByGameId(gameId));
        return gameDetail;
    }
}
