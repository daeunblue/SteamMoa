package com.ssafy.steammoa.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
//@Setter
public class User extends BaseEntity{

    // 유저 식별자 PK
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long userId;
//
//    @Column(name="user_steam_id")
//    private String userSteamId;
//    @Column(name="user_service_id")
//    private String userServiceId;
//    @Column(name="user_service_pw")
//    private String userServicePw;
//    @Column(name="user_name")
//    private String userName;
//
////



    String position;
    String department;
    String name;
    String userId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
}
