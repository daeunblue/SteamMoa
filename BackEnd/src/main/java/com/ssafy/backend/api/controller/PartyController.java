package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.PartyService;
import com.ssafy.backend.common.model.response.BaseResponseBody;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartyDTO;
import com.ssafy.backend.db.repository.party.PartyRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/moazone/")
@RestController
public class PartyController {
    @Autowired
    PartyService partyService;

    @Autowired
    PartyRepository partyRepository;

    @GetMapping("")
    @ApiOperation(value = "파티 리스트 전체 조회", notes = "전체 파티 리스트를 조회.")
    public ResponseEntity<?> getPartyList(){
        List<Party> result = partyService.getPartyList();
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("{party_id}/")
    @ApiOperation(value = "파티 상세 정보", notes = "파티 상세 페이지.")
    public ResponseEntity<?> getPartyDetail(@PathVariable("party_id") Long party_id){
        PartyDTO result = partyService.getPartyDetail(party_id);
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("")
    @ApiOperation(value = "파티 생성", notes = "body를 받아서 party를 생성하는 api.")
    public ResponseEntity<?> createParty(@RequestBody Party party){

        Party newParty = partyRepository.save(party);

        return ResponseEntity.status(200).body(newParty);
    }

    @DeleteMapping("{party_id}/")
    @ApiOperation(value = "파티 삭제하기", notes = "party_id로 파티를 찾아서 삭제하는 api.")
}
