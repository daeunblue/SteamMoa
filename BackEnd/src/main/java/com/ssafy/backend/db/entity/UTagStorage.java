package com.ssafy.backend.db.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class UTagStorage {

    @Id
    @Column(name = "utag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "userTag")
    private List<UserTag> uTagList = new ArrayList<>();
}
