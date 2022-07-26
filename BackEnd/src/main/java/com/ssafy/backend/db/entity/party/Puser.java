package com.ssafy.backend.db.entity.party;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;

import javax.persistence.*;

@Entity
public class Puser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long party_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="party_id")
    private Party party;
}
