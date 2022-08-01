package com.ssafy.backend.db.entity.tactic;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.entity.game.Game;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="tactic")
public class Tactic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="tactic_id")
    private Long tacticId;

    @Column(name="tactic_title")
    private String tacticTitle;

    @Column(name = "tactic_content")
    private String tacticContent;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

}
