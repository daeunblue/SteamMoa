package com.ssafy.backend.db.entity.game;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter @Setter
@Table(name="gcategorystorage")
public class Gcategorystorage {
    @Id
    @Column(name="category_id")
    private long category_id;

    @Column(name="category")
    private String category;
}
