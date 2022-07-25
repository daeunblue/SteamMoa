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
    private Long game_id;

    @Column(name="steam_game_id", nullable = false)
    private String steam_game_id;

    @Column(name="game_name", nullable = false)
    private String game_name;

    @Column(name="game_score")
    private double game_score;

    @Column(name="game_img", nullable = false)
    private String game_img;

    @Column(name="required_age")
    private int required_age;

    @Column(name="is_free")
    private boolean is_free;

    @Column(name="game_description")
    private String game_description;

    @Column(name="supported_languages")
    private String supported_languages;

    @Column(name="developers")
    private String developers;

    @Column(name="game_price")
    private long game_price;

    @Column(name="discount_per")
    private int discount_per;

    @Column(name="is_window")
    private boolean is_window;

    @Column(name="is_mac")
    private boolean is_mac;

    // 양방향 일대다 관계
    @OneToMany(mappedBy = "game")
    @JsonManagedReference
    private List<Gamegenre> gamegenres = new ArrayList<>();

}
