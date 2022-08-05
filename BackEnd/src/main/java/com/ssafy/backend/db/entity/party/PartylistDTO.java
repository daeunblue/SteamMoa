package com.ssafy.backend.db.entity.party;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*
    응답용 DTO.
    파티를 리스트로 보여줄 때 사용.
 */
@Getter
@Setter
public class PartylistDTO {

    private Long partyId;

    private Long gameId;
    private String gameImgPath;
    private String gameName;

    private String partyTitle;
    private int maxPlayer;
    private int curPlayer;
    private LocalDateTime startTime;
    private LocalDateTime writeTime;

    private String partyStatus;

    private boolean partyIsUrgent;

    public PartylistDTO(Party p){
        this.partyId = p.getPartyId();
        this.gameId = p.getGame().getGameId();
        this.gameImgPath = p.getGame().getImgpath();
        this.gameName = p.getGame().getName();
        this.partyTitle = p.getTitle();
        this.maxPlayer = p.getMaxPlayer();
        this.curPlayer = p.getCurPlayer();
        this.startTime = p.getStartTime();
        this.writeTime = p.getWriteTime();
        this.partyStatus = p.getStatus();
        if(p.getStartTime().isBefore(LocalDateTime.now().plusHours(9).plusDays(1)))
            this.partyIsUrgent = true;
        else
            this.partyIsUrgent = false;

        System.out.println("파티 list DTO 생성: "+this.partyTitle);
    }
}
