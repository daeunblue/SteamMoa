package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.request.TacticPostReq;
import com.ssafy.backend.api.request.TacticPutReq;
import com.ssafy.backend.api.response.TacticDto;
import com.ssafy.backend.api.service.TacticService;
import com.ssafy.backend.api.service.UserService;
import com.ssafy.backend.db.entity.user.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    UserService userService;

    /** 공통적으로 해야하는것 : 빈값 왔을때 처리 해야함 **/

    @GetMapping("/game/{gameId}")
    @ApiOperation(value="게임 공략 정보", notes = "game_id에 해당하는 게임 공략글 정보를 조회한다")
    public ResponseEntity<?> getTacticsByGameId(@PathVariable("gameId")Long gameId){
        List<TacticDto> result = tacticService.getTacticsByGameId(gameId);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/user/{user_service_id}")
    @ApiOperation(value="게임 공략 정보", notes = "user_id에 해당하는 게임 공략글 정보를 조회한다")
    public ResponseEntity<?> getTacticsByUserId(@PathVariable("user_service_id")String userServiceId){
        List<TacticDto> result = tacticService.getTacticsByUserId(userServiceId);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/user/tactic/{tacticId}")
    @ApiOperation(value="게임 공략 정보", notes = "tacticId 해당하는 게임 공략글 정보를 조회한다")
    public ResponseEntity<?> getTacticsByTacticId(@PathVariable("tacticId")Long tacticId){
        TacticDto result = tacticService.getTacticByTacticId(tacticId);
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping()
    @ApiOperation(value="게임 공략글 생성", notes = "공략글 생성")
    // @ApiIgnore Authentication authentication,
    public ResponseEntity<? extends Map<String,Object>> createTactics(@RequestBody TacticPostReq tacticPostReq){
        Map<String,Object> resultMap = new HashMap<>();

        if(tacticService.createTactics(tacticPostReq)){
            resultMap.put("msg","Success");
            return ResponseEntity.status(200).body(resultMap);
        }else{
            resultMap.put("msg","Fail");
            return ResponseEntity.status(400).body(resultMap);
        }
    }

    @PutMapping()
    @ApiOperation(value="게임 공략글 수정", notes = "공략글 수정")
    // @ApiIgnore Authentication authentication,
    public ResponseEntity<? extends Map<String,Object>> updateTactics(@RequestBody TacticPutReq tacticPutReq){
        Map<String,Object> resultMap = new HashMap<>();

        if(tacticService.updateTactic(tacticPutReq)){
            resultMap.put("msg","Success");
            return ResponseEntity.status(200).body(resultMap);
        }else{
            resultMap.put("msg","Fail");
            return ResponseEntity.status(400).body(resultMap);
        }
    }

    // 삭제
    @DeleteMapping("/{tacticId}")
    @ApiOperation(value="게임 공략글 삭제", notes = "공략글 삭제")
    // @ApiIgnore Authentication authentication,
    public ResponseEntity<? extends Map<String,Object>> deleteTactics(@PathVariable("tacticId") Long tacticId){
        Map<String,Object> resultMap = new HashMap<>();

        if(tacticService.deleteTactic(tacticId)){
            resultMap.put("msg","Success");
            return ResponseEntity.status(200).body(resultMap);
        }else{
            resultMap.put("msg","Fail");
            return ResponseEntity.status(400).body(resultMap);
        }
    }




    // 특정 게시글 상세 정보 조회 -> tactic_id기반 검색 결과 반환 (Dto 하나)

}
