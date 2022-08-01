package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.TacticService;
import com.ssafy.backend.common.model.response.BaseResponseBody;
import com.ssafy.backend.db.entity.tactic.Tactic;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 공략 관련 API 요청 처리를 위한 컨트롤러 정의.
 * http://localhost:8080/swagger-ui.html
 **/
@Api(value = "공략 API", tags = {"Tactic"})
@RestController
@RequestMapping("/api/tactics")
@Slf4j
public class TacticController {

    @Autowired
    TacticService tacticService;

    /** 공통적으로 해야하는것 : 빈값 왔을때 처리 해야함 **/

    @GetMapping("/game/{game_id}")
    @ApiOperation(value="게임 공략 정보", notes = "game_id에 해당하는 게임 공략글 정보를 조회한다")
    public ResponseEntity<?> getTacticsByGameId(@PathVariable("game_id")Long gameId){
        List<Tactic> result = tacticService.getTacticsByGameId(gameId);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/user/{user_id}")
    @ApiOperation(value="게임 공략 정보", notes = "user_id에 해당하는 게임 공략글 정보를 조회한다")
    public ResponseEntity<?> getTacticsByUserId(@PathVariable("user_id")Long userId){
        List<Tactic> result = tacticService.getTacticsByUserId(userId);
        return ResponseEntity.status(200).body(result);
    }

}
