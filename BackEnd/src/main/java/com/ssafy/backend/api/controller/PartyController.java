package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.PartyService;
import com.ssafy.backend.db.entity.party.Party;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/moazone/")
@RestController
public class PartyController {
    @Autowired
    PartyService partyService;

    @GetMapping("")
    @ApiOperation(value = "파티 리스트 전체 조회", notes = "전체 파티 리스트를 조회.")
    public ResponseEntity<?> getPartyListAll(){
        List<Party> result = PartyService.getPartyList();
        return ResponseEntity.status(200).body(result);
    }

}
