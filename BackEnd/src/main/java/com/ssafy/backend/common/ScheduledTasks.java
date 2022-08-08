package com.ssafy.backend.common;

import com.ssafy.backend.api.service.NoticeService;
import com.ssafy.backend.db.entity.party.Party;
import com.ssafy.backend.db.entity.party.Puser;
import com.ssafy.backend.db.repository.party.PartyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class ScheduledTasks {
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private NoticeService noticeService;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("mm:ss:SSS");

    // 5초마다 파티 상태 자동 업데이트
    // 1 모집 중, 2 모집 완료, 3 플레이 중, 4 플레이 완료, 5 모집 실패
    @Scheduled(cron = "0/5 * * * * ?")
    public void updatePartyStatus() {
        // log.info("fixedRate: 현재시간 - {}", formatter.format(LocalDateTime.now()));

        for(Party party: partyRepository.findAll()) {
            if(party.getStatus().equals("4") || party.getStatus().equals("5")) {
                // 건너뛰기
                continue;
            }
            else if(party.getStatus().equals("1")) {
                // 1 모집 중에서 2 모집 완료로 : maxplayer = curplayer
                if(party.getMaxPlayer() == party.getCurPlayer())
                    party.setStatus("2");

                // 1 모집 중에서 5 모집 실패로 : 지금 시간이 플레이 시간을 지남 && maxplayer > curplayer
                if(LocalDateTime.now().plusHours(9).isBefore(party.getStartTime()) && party.getMaxPlayer() > party.getCurPlayer())
                    party.setStatus("5");
            }
            else if(party.getStatus().equals("2")) {
                // 2 모집 완료에서 3 플레이 중으로 : 지금 시간이 플레이 시간을 지남
                if(LocalDateTime.now().plusHours(9).isBefore(party.getStartTime()))
                    party.setStatus("3");
            }
            else if(party.getStatus().equals("3")) {
                // 3 플레이 중에서 4 플레이 완료로 : 지금 시간이 플레이 시간 + 24h를 지남
                if(LocalDateTime.now().plusHours(9).isBefore(party.getStartTime().plusDays(1))) {
                    party.setStatus("4");

                    // 모든 파티원에게 평가 알림을 발송합니다. (알림을 알림 테이블에 집어넣습니다.)
                    for(Puser puser: party.getPusers()){
                        noticeService.createNotice(puser.getUser().getUserServiceId(), party.getPartyId());
                    }
                }
            }

            partyRepository.save(party);
        }
    }
}
