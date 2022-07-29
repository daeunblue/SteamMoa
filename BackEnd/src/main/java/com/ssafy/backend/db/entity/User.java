package com.ssafy.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    // 유저 식별자 PK
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "user_steam_id", nullable = false, unique = true)
    private String userSteamId;

    @Column(name = "user_service_id", nullable = false, unique = true)
    private String userServiceId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // 왜 쓰는지 -> https://eglowc.tistory.com/28
    @Column(name = "user_service_pw")
    private String password;

    @Column(name = "user_name", nullable = false)
    private String userName;

    // Enum 타입으로 바꿀지 고민중임.
    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin;

    @Column(name = "user_point", nullable = false)
    private Double userPoint;

    @OneToMany(mappedBy = "notice")
    private List<NoticeList> nLists = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserTag> uTagLists = new ArrayList<>();

    @OneToMany(mappedBy = "fromUser")
    private List<Follow> uFollowList = new ArrayList<>();

//    @OneToMany(mappedBy = "user_id")
//    private List<UserTag> uFollowingList = new ArrayList<>();


}
