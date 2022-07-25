package com.ssafy.backend.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.apachecommons.CommonsLog;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="follow_user_id")
    private Long id;

    // 하나의 사용자는 여러 구독 테이블을 가진다
    @OneToMany(mappedBy ="user")
    private List<User> users = new ArrayList<>();


    @Column(name = "is_deleted")
    private boolean isDeleted;


}
