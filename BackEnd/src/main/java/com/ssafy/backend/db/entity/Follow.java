package com.ssafy.backend.db.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="follow_id")
    private Long followId;

    // 하나의 사용자는 여러 구독 테이블을 가진다.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User fromUser;

    // 피 구독자의 아이디
    @Column(name = "following_id")
    private Long followingId;
}
