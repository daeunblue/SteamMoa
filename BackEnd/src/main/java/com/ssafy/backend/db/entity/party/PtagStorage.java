package com.ssafy.backend.db.entity.party;

import javax.persistence.*;

@Entity
public class PtagStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ptag_id;

    private String ptag_content;
}
