package com.ssafy.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String userServiceId;
    private String userServicePw;
    private String name;
    private double userPoint;


    private String authToken; // 사용자 인증 정보 토큰
    private String refreshToken; // authToken 갱신용 토큰
}
