package com.ssafy.backend.db.entity.party;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
    응답용 DTO.
    파티를 상세 페이지로 보여줄 때 사용.
 */
@Getter
@Setter
public class PartyDTO {

    private Long gameId;
    private String gameImgPath;
    private String gameName;

    private Long partyId;
    private String partyTitle;
    private List<String> partyTags = new ArrayList<>();
    private int maxPlayer;
    private int curPlayer;
    private LocalDateTime startTime;
    private LocalDateTime writeTime;
    private String status;
    private List<PartyPlayerDTO> partyPlayers = new ArrayList<>();
    private String partyDescription;
    private String chatLink;

    public PartyDTO(Party p){
        this.gameId = p.getGame().getGameId();
        this.gameImgPath = p.getGame().getImgpath();
        this.gameName = p.getGame().getName();
        this.partyId = p.getPartyId();
        this.partyTitle = p.getTitle();
        for (PartyTag partytag: p.getPartyTags()) {
            this.partyTags.add(partytag.getPtagStorage().getContent());
        }
        this.maxPlayer = p.getMaxPlayer();
        this.curPlayer = p.getCurPlayer();
        this.startTime = p.getStartTime();
        this.writeTime = p.getWriteTime();
        this.status = p.getStatus();
        for (Puser puser: p.getPusers()) {
            this.partyPlayers.add(new PartyPlayerDTO(puser));
        }
        this.partyDescription = p.getDescription();
        this.chatLink = p.getChatLink();
    }
}
