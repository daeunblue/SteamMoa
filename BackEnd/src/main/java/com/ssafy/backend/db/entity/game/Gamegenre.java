package com.ssafy.backend.db.entity.game;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter @Setter
@Table(name="gamegenre")
public class Gamegenre {
    @Id
    @Column(name="game_genre_id")
    private Long game_genre_id;

    // 양방향 다대일
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="game_id")
    private Game game;

    // 단방향 다대일
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="genre_id")
    private Ggenrestorage genre;
}
