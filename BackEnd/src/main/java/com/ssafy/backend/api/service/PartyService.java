package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.PartyPostReq;
import com.ssafy.backend.api.request.PartyPutReq;
import com.ssafy.backend.api.request.UserRegisterPostReq;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.PartyDTO;
import com.ssafy.backend.db.entity.party.PartylistDTO;
import org.json.simple.JSONObject;

import java.util.List;

public interface PartyService {

    // 파티 전체 목록
    JSONObject getPartyList(int page);

    // 파티 검색+필터+정렬 기반 목록
    /*
        필터링: 게임 이름, 파티 상태, 게임 장르
        정렬: 파티 생성 최근순 (디폴트), 마감 날짜 가까운 순, 게임 이름 순
     */
    JSONObject searchPartyList(int page, String searchString, String[] tags, String partyStatus, String sortString);

    // 파티 생성
    boolean createParty(PartyPostReq PartyInfo);

    // 파티 상세 조회
    PartyDTO getPartyDetail(Long partyId);

    // 파티 수정
    boolean updateParty(Long partyId, PartyPutReq partyInfo);

    // 파티 삭제
    boolean deleteParty(Long partyId);
}
