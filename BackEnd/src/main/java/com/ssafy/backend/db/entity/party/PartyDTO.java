package com.ssafy.backend.db.entity.party;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;

import java.time.LocalDateTime;

public class PartyDTO {

    private Long party_id;
    private String party_title;
    private int max_player;
    private int cur_player;
    private String party_description;
    private LocalDateTime start_time;
    private LocalDateTime write_time;
    private String chat_link;
    private boolean is_closed;
    private boolean is_deleted;
    private Long game_id;
    private Long user_id;

    public PartyDTO(Party p){
        this.party_id = p.getParty_id();
        this.party_title = p.getParty_title();
        this.max_player = p.getMax_player();
        this.cur_player = p.getCur_player();
        this.party_description = p.getParty_description();
        this.start_time = p.getStart_time();
        this.write_time = p.getWrite_time();
        this.chat_link = p.getChat_link();
        this.is_closed = p.is_closed();
        this.is_deleted = p.is_deleted();

        Game game = p.getGame();
        this.game_id = game.getGameId();

        User user = p.getUser();
        this.user_id = user.getId();
    }
}
