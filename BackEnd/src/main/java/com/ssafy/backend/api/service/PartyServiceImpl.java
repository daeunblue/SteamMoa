package com.ssafy.backend.api.service;

import com.ssafy.backend.api.request.PartyPostReq;
import com.ssafy.backend.api.request.PartyPutReq;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.GameDTO;
import com.ssafy.backend.db.entity.game.GamelistDTO;
import com.ssafy.backend.db.entity.party.*;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.db.repository.game.GameRepository;
import com.ssafy.backend.db.repository.party.PartyRepository;
import com.ssafy.backend.db.repository.party.PartyTagRepository;
import com.ssafy.backend.db.repository.party.PtagStorageRepository;
import com.ssafy.backend.db.repository.party.PuserRepository;
import jdk.vm.ci.meta.Local;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service("partyService")
public class PartyServiceImpl implements PartyService{
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private PtagStorageRepository ptagStorageRepository;
    @Autowired
    private PartyTagRepository partyTagRepository;
    @Autowired
    private PuserRepository puserRepository;
    @Autowired
    private UserRepository userRepository;

    // 파티 전체 목록
    @Override
    @Transactional
    public JSONObject getPartyList(int page) {
        Pageable pageable = PageRequest.of(page, 12);
        List<PartylistDTO> resultlist = new ArrayList<>();
        System.out.println("쿼리수행결과 개수: "+partyRepository.findAll().size());
        partyRepository.findAll().forEach(Party->resultlist.add(new PartylistDTO(Party)));

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("maxPage", Integer.toString(partyRepository.findAll().size()/12+1));

        System.out.println("resultlist 개수: "+resultlist.size());
        System.out.println("resultlist: "+resultlist.get(0).getPartyTitle());

        JSONArray data = new JSONArray();
        for (PartylistDTO p : resultlist) {
            data.add(p);
        }

        jsonObject.put("data", data);

        return jsonObject;

    }

    // 파티 검색+필터+정렬 기반 목록
    /*
        필터링: 게임 이름, 파티 상태, 게임 장르
        정렬: 파티 생성 최근순 (디폴트), 마감 날짜 가까운 순, 게임 이름 순
     */
    @Override
    @Transactional
    public JSONObject searchPartyList(int page, String searchString, String[] partyTags, String[] partyStatuses, String sortString) {
        Pageable pageable = PageRequest.of(page, 12);
        List<PartylistDTO> resultlist = new ArrayList<>();
        partyRepository.findAllPartyByFilter(searchString, partyTags, partyStatuses, sortString, pageable).forEach(Party->resultlist.add(new PartylistDTO(Party)));

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("maxPage", Integer.toString(partyRepository.findAllPartyByFilter(searchString, partyTags, partyStatuses, sortString)/12+1));

        JSONArray data = new JSONArray();
        for (PartylistDTO p : resultlist) {
            data.add(p);
        }

        jsonObject.put("data", data);

        return jsonObject;
    }

    // 파티 생성
    /*
        파티 코드
        모집 중: 1
        모집 완료: 2
        플레이 중: 3
        플레이 완료: 4
        모집 실패: 5
     */
    @Override
    @Transactional
    public boolean createParty(PartyPostReq partyInfo) {
        Party party = new Party();

        // 멀티게임 맞는지 확인 후 실패 응답
        if (!gameRepository.findAllMultiGameByOnlyName("").contains(gameRepository.findByGameId(partyInfo.getGameId())))
            return false;
        party.setGame(gameRepository.findByGameId(partyInfo.getGameId()));
        party.setTitle(partyInfo.getPartyTitle());
        party.setMaxPlayer(Integer.parseInt(partyInfo.getMaxPlayer()));
        party.setCurPlayer(1);
        party.setDescription(partyInfo.getPartyDescription());
        party.setStartTime(LocalDateTime.parse(partyInfo.getStartTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")).plusHours(9));
        party.setWriteTime(LocalDateTime.now().plusHours(9));
        party.setChatLink(partyInfo.getChatLink());
        party.setStatus("1");


        PartyTag partyTag;
        for (String tag:partyInfo.getPartyTags()) {
            // 파티 태그 존재하는지 확인 후 실패 응답
            if (ptagStorageRepository.findById(Long.parseLong(tag))==null)
                return false;

            partyTag = new PartyTag();
            partyTag.setPtagStorage(ptagStorageRepository.findById(Long.parseLong(tag)).get());
            partyTagRepository.save(partyTag);
            party.addPartyTag(partyTag);
        }

        // 유저 존재하는지 확인 후 실패 응답
        Optional<User> user = userRepository.findByUserServiceId(partyInfo.getUserId());
        if (user == null)
            return false;
        Puser puser = new Puser();
        puser.setUser(user.get());
        puser.setLeader(true);
        puserRepository.save(puser);
        party.addPuser(puser);


        partyRepository.save(party);

        return true;
    }

    // 파티 생성시 게임ID 검색
    @Override
    @Transactional
    public List<PartyCreateGamelistDTO> searchPartyCreateGamelist(String searchString) {
        List<PartyCreateGamelistDTO> resultlist = new ArrayList<>();
        gameRepository.findAllMultiGameByOnlyName(searchString).forEach(Game->resultlist.add(new PartyCreateGamelistDTO(Game)));
        return resultlist;
    }


    // 파티 상세 조회
    @Override
    @Transactional
    public PartyDTO getPartyDetail(Long partyId) {
        PartyDTO partyDetail = new PartyDTO(partyRepository.findByPartyId(partyId));
        return partyDetail;
    }

    // 파티 수정
    @Override
    @Transactional
    public String updateParty(Long partyId, PartyPutReq partyInfo) {
        Party party = partyRepository.findByPartyId(partyId);


        // 멤버 수정
        // 파티장 찾기
        String leader_serviceId = null;
        Set<String> member_serviceIds = new HashSet<>();

        for (String service_id:partyInfo.getPartyUsers()) {
            if(!userRepository.findByUserServiceId(service_id).isPresent())
                return "fail: 유효하지 않은 사용자 아이디를 추가하려고 하고 있습니다.";

            List<Puser> userpartysearch = puserRepository.findAllByUserAndParty(userRepository.findByUserServiceId(service_id).get(), partyRepository.findByPartyId(partyId));

            if(userpartysearch.size() != 0 && userpartysearch.get(0).isLeader())
                leader_serviceId = service_id;
            else
                member_serviceIds.add(service_id);
        }

        // 파티장 없으면 오류
        if(leader_serviceId == null)
            return "fail: 파티 멤버 배열 안에 파티장이 없습니다.";

        // 파티원 모두 날리기
        for (Puser u: party.getPusers()) {
                puserRepository.delete(u);
        }
        party.setPusers(new ArrayList<>());

        // 파티장 저장
        Puser puser = new Puser();
        puser.setUser(userRepository.findByUserServiceId(leader_serviceId).get());
        puser.setLeader(true);
        puserRepository.save(puser);
        party.addPuser(puser);

        // 파티원 모두 저장
        for (String service_id: member_serviceIds) {
            puser = new Puser();
            puser.setUser(userRepository.findByUserServiceId(service_id).get());
            puserRepository.save(puser);
            party.addPuser(puser);
        }

        party.setCurPlayer(partyInfo.getPartyUsers().length);



        party.setDescription(partyInfo.getPartyDescription());
        party.setChatLink(partyInfo.getChatLink());


        // 태그 수정
        for (PartyTag pt: party.getPartyTags()) {
            partyTagRepository.delete(pt);
        }
        party.setPartyTags(new ArrayList<>());

        PartyTag partyTag;
        for (String tag:partyInfo.getPartyTags()) {
            partyTag = new PartyTag();
            partyTag.setPtagStorage(ptagStorageRepository.findById(Long.parseLong(tag)).get());
            partyTagRepository.save(partyTag);
            party.addPartyTag(partyTag);
        }


        // 파티 상태 수정
        party.setStatus(partyInfo.getPartyStatus());

        partyRepository.save(party);

        return "success";
    }

    // 파티 삭제
    @Override
    @Transactional
    public boolean deleteParty(Long partyId) {
        try{
            partyRepository.delete(partyRepository.findByPartyId(partyId));
            System.out.println("Party 삭제 요청 성공");
            return true;
        }catch (Exception e){
            System.out.println("Party 삭제 요청 실패");
            return false;
        }
    }
}
