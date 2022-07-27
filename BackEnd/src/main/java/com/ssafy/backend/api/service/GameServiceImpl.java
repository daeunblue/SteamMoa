package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GameDTO;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("gameService")
public class GameServiceImpl implements GameService {
    @Autowired
    private GameRepository gameRepository;

    @Override
    public List<GamelistDTO> getGameList(int page) {
        Pageable pageable = PageRequest.of(page, 10);
        List<GamelistDTO> resultlist = new ArrayList<>();
        gameRepository.findAllMultiGame(pageable).forEach(Game->resultlist.add(new GamelistDTO(Game)));
        return resultlist;
    }

    @Override
    public List<GamelistDTO> searchGameList(int page, String searchString) {
        Pageable pageable = PageRequest.of(page, 10);
        List<GamelistDTO> resultlist = new ArrayList<>();
        gameRepository.findAllMultiGameByName(searchString, pageable).forEach(Game->resultlist.add(new GamelistDTO(Game)));
        return resultlist;
    }

    @Override
    public GameDTO getGameDetail(Long gameId) {
        GameDTO gameDetail = new GameDTO(gameRepository.findByGameId(gameId));
        return gameDetail;
    }
}
