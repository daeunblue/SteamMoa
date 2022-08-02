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

    private Long party_id;

    private Long game_id;
    private String gameImgPath;
    private String gameName;

    private String party_title;
    private int max_player;
    private int cur_player;
    private LocalDateTime start_time;
    private LocalDateTime write_time;

    private String status;

    public PartylistDTO(Party p){
        this.party_id = p.getPartyId();
        this.game_id = p.getGame().getGameId();
        this.gameImgPath = p.getGame().getImgpath();
        this.gameName = p.getGame().getName();
        this.party_title = p.getTitle();
        this.max_player = p.getMaxPlayer();
        this.cur_player = p.getCurPlayer();
        this.start_time = p.getStartTime();
        this.write_time = p.getWriteTime();
        this.status = p.getStatus();

        System.out.println("파티 list DTO 생성: "+this.party_title);
    }
}
