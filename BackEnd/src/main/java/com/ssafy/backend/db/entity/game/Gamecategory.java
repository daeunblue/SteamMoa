package com.ssafy.backend.db.entity.game;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter @Setter
@Table(name="gamecategory")
public class Gamecategory {
    @Id
    @Column(name="game_category_id")
    private Long gamecategoryId;

    // 양방향 다대일
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="game_id")
    private Game game;

    // 단방향 다대일
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Gcategorystorage category;
}
