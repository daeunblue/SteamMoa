package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.GameService;
import com.ssafy.backend.db.entity.game.Game;
import com.ssafy.backend.db.entity.game.GameDTO;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 게임 관련 API 요청 처리를 위한 컨트롤러 정의.
 * http://localhost:8080/swagger-ui.html
 **/
@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/api/games")
@Slf4j
public class GameController {
    @Autowired
    GameService gameService;


    @GetMapping("")
    @ApiOperation(value = "게임 리스트 전체 조회", notes = "전체 게임 리스트를 조회.")
    public ResponseEntity<?> getGameListAll(@RequestParam int page){
        List<GamelistDTO> result = gameService.getGameList(page);
        return ResponseEntity.status(200).body(result);
    }


    @GetMapping("/search")
    @ApiOperation(value = "게임 리스트 조건 조회", notes = "검색어, 필터에 맞는 게임들을 조회.")
    public ResponseEntity<?> getGameListFiltered(@RequestParam String name, @RequestParam int page){
        List<GamelistDTO> result = gameService.searchGameList(page, name);
        return ResponseEntity.status(200).body(result);
    }


    @GetMapping("/{gameid}")
    @ApiOperation(value="게임 상세 정보", notes = "gameid에 해당하는 게임 상세 정보를 조회한다")
    public ResponseEntity<?> getGameDetail(@PathVariable("gameid") Long gameid){
        GameDTO result = gameService.getGameDetail(gameid);
        return ResponseEntity.status(200).body(result);
    }
}
