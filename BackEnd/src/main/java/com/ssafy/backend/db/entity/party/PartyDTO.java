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

    private Long game_id;
    private String gameImgPath;
    private String gameName;

    private Long party_id;
    private String party_title;
    private List<String> party_tags = new ArrayList<>();
    private int max_player;
    private int cur_player;
    private LocalDateTime start_time;
    private LocalDateTime write_time;
    private String status;
    private List<PartyPlayerDTO> party_players = new ArrayList<>();
    private String party_description;
    private String chat_link;

    public PartyDTO(Party p){
        this.game_id = p.getGame().getGameId();
        this.gameImgPath = p.getGame().getImgpath();
        this.gameName = p.getGame().getName();
        this.party_id = p.getPartyId();
        this.party_title = p.getTitle();
        for (PartyTag partytag: p.getPartyTags()) {
            this.party_tags.add(partytag.getPtagStorage().getContent());
        }
        this.max_player = p.getMaxPlayer();
        this.cur_player = p.getCurPlayer();
        this.start_time = p.getStartTime();
        this.write_time = p.getWriteTime();
        this.status = p.getStatus();
        for (Puser puser: p.getPusers()) {
            this.party_players.add(new PartyPlayerDTO(puser));
        }
        this.party_description = p.getDescription();
        this.chat_link = p.getChatLink();
    }
}
