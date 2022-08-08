package com.ssafy.backend.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class ScheduledTasks {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("mm:ss:SSS");

    // 5초마다 파티 상태 자동 업데이트
    // 1 모집 중, 2 모집 완료, 3 플레이 중, 4 플레이 완료, 5 모집 실패
    @Scheduled(cron = "0/5 * * * * ?")
    public void updatePartyStatus() {
        log.info("fixedRate: 현재시간 - {}", formatter.format(LocalDateTime.now()));

        // 1 모집 중에서 2 모집 완료로 : maxplayer = curplayer

        // 1 모집 중에서 5 모집 실패로 : 지금 시간이 플레이 시간을 지남 && maxplayer > curplayer

        // 2 모집 완료에서 3 플레이 중으로 : 지금 시간이 플레이 시간을 지남

        // 3 플레이 중에서 4 플레이 완료로 :

    }

    // 30분 간격으로 파티 평가 알림 발송
    @Scheduled(cron = "0 30 * * * ?")
    public void alertPartyRate() {
        log.info("fixedRate: 현재시간 - {}", formatter.format(LocalDateTime.now()));



    }
}
