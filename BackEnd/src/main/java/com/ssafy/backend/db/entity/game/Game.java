package com.ssafy.backend.db.entity.game;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name="game")
public class Game {
    @Id @GeneratedValue
    @Column(name="game_id")
    private Long gameId;

    @Column(name="steam_game_id", nullable = false)
    private String steamgameId;

    @Column(name="game_name", nullable = false)
    private String name;

    @Column(name="game_score")
    private double score;

    @Column(name="game_img", nullable = false)
    private String imgpath;

    @Column(name="required_age")
    private int age;

    @Column(name="is_free")
    private boolean isFree;

    @Column(name="game_description")
    private String description;

    @Column(name="supported_languages")
    private String languages;

    @Column(name="developers")
    private String developers;

    @Column(name="game_price")
    private long price;

    @Column(name="discount_per")
    private int discount;

    @Column(name="is_window")
    private boolean isWindow;

    @Column(name="is_mac")
    private boolean isMac;

    // 양방향 일대다 관계
    @OneToMany(mappedBy = "game")
    @JsonManagedReference
    private List<Gamegenre> gamegenres = new ArrayList<>();

    // 양방향 일대다 관계
    @OneToMany(mappedBy = "game")
    @JsonManagedReference
    private List<Gamecategory> gamecategories = new ArrayList<>();

}
