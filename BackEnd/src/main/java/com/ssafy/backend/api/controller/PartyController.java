package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.request.PartyEvalPostReq;
import com.ssafy.backend.api.request.PartyPostReq;
import com.ssafy.backend.api.request.PartyPutReq;
import com.ssafy.backend.api.response.PUserEvalDto;
import com.ssafy.backend.api.service.PartyService;
import com.ssafy.backend.api.service.UserService;
import com.ssafy.backend.api.response.PartyCreateGamelistDTO;
import com.ssafy.backend.api.response.PartyDTO;
import com.ssafy.backend.db.repository.party.PartyRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 파티 관련 API 요청 처리를 위한 컨트롤러 정의.
 * http://localhost:8080/swagger-ui.html
 **/
@Api(value = "파티 API", tags = {"Party"})
@RestController
@RequestMapping("/api/moazone")
public class PartyController {
    @Autowired
    PartyService partyService;

    @Autowired
    PartyRepository partyRepository;

    @Autowired
    UserService userService;

    // 파티 전체 목록
    @GetMapping("")
    @ApiOperation(value = "파티 리스트 전체 조회", notes = "전체 파티 리스트를 조회.")
    public ResponseEntity<?> getPartyListAll(@RequestParam(required = false, defaultValue = "1") int page){
        JSONObject result = partyService.getPartyList(page-1);
        return ResponseEntity.status(200).body(result);
    }

    // 파티 검색+필터+정렬 기반 목록
    @GetMapping("/search")
    @ApiOperation(value = "파티 리스트 조건 조회", notes = "검색어, 필터에 맞는 파티를 조회.\n\n" +
            "status\n" +
            "모집 중: 1\n" +
            "모집 완료: 2\n" +
            "플레이 중: 3\n" +
            "플레이 완료: 4\n" +
            "모집 실패: 5\n" +
            "sort\n" +
            "파티 생성 최근순: 1\n" +
            "마감 날짜 가까운 순: 2\n" +
            "마감 인원 많은 순:3")
    public ResponseEntity<?> getPartyListFiltered(@RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "") String searchString, @RequestParam(value = "partyTags", required = false, defaultValue = "") String[] partyTags, @RequestParam(required = false, defaultValue = "") String[] partyStatuses, @RequestParam(required = false, defaultValue = "1") String sortString){
        JSONObject result = partyService.searchPartyList(page-1, searchString, partyTags, partyStatuses, sortString);
        return ResponseEntity.status(200).body(result);
    }

    // 파티 생성
    @PostMapping("")
    @ApiOperation(value = "새로운 파티 생성", notes = "파티장이 새로운 파티를 생성한다.")
    public ResponseEntity<?> createParty(@RequestBody PartyPostReq partyPostReq){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("message", partyService.createParty(partyPostReq));
        return ResponseEntity.status(200).body(resultMap);
    }

    // 파티 생성시 게임ID 검색
    @GetMapping("/games")
    @ApiOperation(value = "파티 생성시 게임ID 검색", notes = "문자열을 포함하면 그 문자열이 게임 이름에 포함된 게임 리스트를 보내준다.")
    public ResponseEntity<?> getPartyCreateGamelist(@RequestParam(required = true, defaultValue = "1") int page,@RequestParam(required = false, defaultValue = "") String game_name){
        JSONObject result = partyService.searchPartyCreateGamelist(page-1, game_name);
        return ResponseEntity.status(200).body(result);
    }

    // 파티 상세 조회
    @GetMapping("/{partyid}")
    @ApiOperation(value = "파티 상세 정보", notes = "partyid에 해당하는 게임 상세 정보를 조회한다.")
    public ResponseEntity<?> getPartyDetail(@PathVariable("partyid") Long partyid){
        PartyDTO result = partyService.getPartyDetail(partyid);
        return ResponseEntity.status(200).body(result);
    }

    // 파티 수정
    @PutMapping("/{partyid}")
    @ApiOperation(value = "파티 수정", notes = "파티장이 파티 정보를 수정하는 경우, 파티원이 파티를 가입하거나 탈퇴하는 경우 호출.")
    public ResponseEntity<?> updateParty(@PathVariable("partyid") Long partyid, @RequestBody PartyPutReq partyPutReq){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("message", partyService.updateParty(partyid, partyPutReq));
        return ResponseEntity.status(200).body(resultMap);
    }

    // 파티 삭제
    @DeleteMapping("/{partyid}")
    @ApiOperation(value = "파티 삭제", notes = "파티가 삭제된다.")
    public ResponseEntity<?> deleteParty(@PathVariable("partyid") Long partyid){
        boolean result = partyService.deleteParty(partyid);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/eval/{party_id}/{user_service_id}")
    @ApiOperation(value = "파티원 평가에 필요한 정보 반환 (user_service_id)만 제외하고 전달")
    public ResponseEntity<? extends Map<String,Object>> getEvaluationPartyInfo(@PathVariable("party_id")Long partyId, @PathVariable("user_service_id")String userServiceId){
        Map<String, Object> result = new HashMap<>();
        PartyDTO partyDTO = partyService.getPartyDetail(partyId);

        if(partyDTO == null){
            result.put("message","Fail");
            return ResponseEntity.status(400).body(result);
        }else{
            result.put("party",partyDTO);
            List<PUserEvalDto> pUserEvalDto = partyService.getPlayersForEvaluate(partyId, userServiceId);
            result.put("users",pUserEvalDto);
            result.put("message","Success");
            return ResponseEntity.status(200).body(result);
        }
    }

    @PostMapping("/eval")
    @ApiOperation(value = "파티원 평가", notes = "파티원에 대한 평가 진행.")
    public ResponseEntity<? extends Map<String,Object>> postEvaluation(@RequestBody PartyEvalPostReq partyEvalPostReq){
        Map<String,Object> result = new HashMap<>();

        if(userService.updateUserScore(partyEvalPostReq.getUserId(),partyEvalPostReq.getScore())){
            result.put("message","Success");
            return ResponseEntity.status(200).body(result);
        }else{
            result.put("message","Fail");
            return ResponseEntity.status(400).body(result);
        }
    }

    // 파티를 임의로 모집마감하는 API
    @PutMapping("/{partyid}/close")
    @ApiOperation(value = "파티 임의 모집마감", notes = "파티 상태를 모집 중에서 모집 완료 상태로 바꾼다.")
    public ResponseEntity<? extends Map<String,Object>> closeParty(@PathVariable("partyid") Long partyid){
        Map<String,Object> result = new HashMap<>();

        if(partyService.closeParty(partyid)){
            result.put("message","Success");
            return ResponseEntity.status(200).body(result);
        }else{
            result.put("message","Fail");
            return ResponseEntity.status(400).body(result);
        }
    }
}
