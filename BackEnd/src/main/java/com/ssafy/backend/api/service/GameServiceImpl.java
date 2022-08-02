package com.ssafy.backend.api.service;

import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GameDTO;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.repository.game.GameRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
    public JSONObject getGameList(int page) {
        Pageable pageable = PageRequest.of(page, 10);
        List<GamelistDTO> resultlist = new ArrayList<>();
        gameRepository.findAllMultiGame(pageable).forEach(Game->resultlist.add(new GamelistDTO(Game)));

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("maxpage", Integer.toString(gameRepository.findAllMultiGame()/10+1));

        JSONArray data = new JSONArray();
        for (GamelistDTO g : resultlist) {
            data.add(g);
        }

        jsonObject.put("data", data);

        return jsonObject;
    }

    @Override
    public JSONObject searchGameList(int page, String searchString, String[] tags) {
        Pageable pageable = PageRequest.of(page, 10);
        List<GamelistDTO> resultlist = new ArrayList<>();
        gameRepository.findAllMultiGameByFilter(searchString, tags, pageable).forEach(Game->resultlist.add(new GamelistDTO(Game)));

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("maxpage", Integer.toString(gameRepository.findAllMultiGameByFilter(searchString, tags)/10+1));

        JSONArray data = new JSONArray();
        for (GamelistDTO g : resultlist) {
            data.add(g);
        }

        jsonObject.put("data", data);

        return jsonObject;
    }

    @Override
    public GameDTO getGameDetail(Long gameId) {
        GameDTO gameDetail = new GameDTO(gameRepository.findByGameId(gameId));
        return gameDetail;
    }
}
