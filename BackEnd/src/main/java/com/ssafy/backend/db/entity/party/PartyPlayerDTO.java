package com.ssafy.backend.db.entity.party;

import com.ssafy.backend.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
    응답용 DTO.
    파티 상세 페이지에서 플레이어의 정보를 나타낼 때 사용.
 */
@Getter
@Setter
public class PartyPlayerDTO {

    private Long playerId;
    private String playerName;
    private String userId;
    private boolean isLeader;

    public PartyPlayerDTO(Puser pu) {
        this.playerId = pu.getUser().getUserId();
        this.playerName = pu.getUser().getUserName();
        this.userId = pu.getUser().getUserServiceId();
        this.isLeader = pu.isLeader();
    }
}
