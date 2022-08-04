package com.ssafy.backend.db.entity.follow;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "follow")
public class Follow {

    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    // 팔로잉 (상대방 아이디)
    @Column(name = "following_id", nullable = false)
    private Long followingId;

    // 팔로워 (나)
    @Column(name = "follower_id", nullable = false)
    private Long followerId;

}
