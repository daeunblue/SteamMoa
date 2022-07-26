package com.ssafy.backend.db.entity.party;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long party_id;

    private String party_title;

    private int max_player;

    private int cur_player;

    private String party_description;

    private LocalDateTime start_time;

    private LocalDateTime write_time = LocalDateTime.now();

    private String chat_link;

    private boolean is_closed;

    private boolean is_deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="game_id")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="game_id")
    private User user;
}
